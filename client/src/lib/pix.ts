/**
 * Gerador de BR Code PIX (padrão EMV do Banco Central)
 * Spec oficial: https://www.bcb.gov.br/estabilidadefinanceira/pix
 */

export interface PixParams {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txid: string;
}

/** 
 * Calcula CRC16-CCITT (Polinômio: 0x1021, Inicial: 0xFFFF)
 * Esta é a implementação padrão para o PIX do Banco Central.
 */
function crc16(payload: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < payload.length; i++) {
    crc ^= (payload.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

/** Formata um campo EMV: ID (2 dígitos) + length (2 dígitos) + value */
function field(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

/** Remove acentos e caracteres especiais para conformidade ASCII básica */
function sanitize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toUpperCase();
}

/**
 * Gera o BR Code PIX (string "copia-e-cola")
 */
export function generatePixPayload(params: PixParams): string {
  const { pixKey, merchantName, merchantCity, amount, txid } = params;

  // Merchant Account Information (ID 26)
  const gui = field("00", "br.gov.bcb.pix");
  const key = field("01", pixKey.replace(/\s/g, "")); // Chave sem espaços
  const merchantAccountInfo = field("26", gui + key);

  // Additional Data Field (ID 62)
  // No QR estático, o txid é opcional, mas se enviado deve ter ID 05.
  // Se não houver txid, usamos "***" conforme a recomendação do BC.
  const txidValue = sanitize(txid).replace(/\s/g, "").slice(0, 25) || "***";
  const additionalData = field("62", field("05", txidValue));

  // Montagem do Payload conforme a ordem da spec EMV
  const payloadParts = [
    field("00", "01"),               // Payload Format Indicator
    field("01", "12"),               // Point of Initiation Method (12 = Estático)
    merchantAccountInfo,             // Informações da conta
    field("52", "0000"),             // Merchant Category Code
    field("53", "986"),              // Transaction Currency (986 = BRL)
    field("54", amount.toFixed(2)),  // Transaction Amount
    field("58", "BR"),               // Country Code
    field("59", sanitize(merchantName).slice(0, 25)), // Merchant Name
    field("60", sanitize(merchantCity).slice(0, 15)), // Merchant City
    additionalData                   // Additional Data Field (txid)
  ];

  const payloadBase = payloadParts.join("") + "6304"; // ID 63 + Len 04 (CRC)

  return payloadBase + crc16(payloadBase);
}

export function generateTxid(): string {
  return "DN" + Math.random().toString(36).substring(2, 10).toUpperCase();
}
