/**
 * Gerador de BR Code PIX (padrão EMV do Banco Central)
 * Não depende de gateway nem API externa — gera o "copia-e-cola" e o payload pro QR Code.
 *
 * Spec oficial: https://www.bcb.gov.br/estabilidadefinanceira/pix
 */

export interface PixParams {
  /** Chave PIX do recebedor (CPF, CNPJ, e-mail, telefone com +55, ou EVP) */
  pixKey: string;
  /** Nome do recebedor (máx 25 chars, sem acentos) */
  merchantName: string;
  /** Cidade do recebedor (máx 15 chars, sem acentos) */
  merchantCity: string;
  /** Valor em reais (ex: 150.50) */
  amount: number;
  /** Identificador único da transação (txid) — máx 25 chars alfanuméricos */
  txid: string;
  /** Descrição opcional (máx 50 chars) */
  description?: string;
}

/** 
 * Calcula CRC16-CCITT-FALSE (exigido pela spec EMV do PIX)
 * Polinômio: 0x1021
 * Valor inicial: 0xFFFF
 */
function crc16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;

  for (let i = 0; i < payload.length; i++) {
    let b = payload.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      let bit = ((b >> (7 - j)) & 1) === 1;
      let c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 !== bit) {
        crc ^= polynomial;
      }
    }
  }
  
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
}

/** Formata um campo EMV: ID (2 dígitos) + length (2 dígitos) + value */
function field(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

/** Remove acentos e caracteres especiais (PIX só aceita ASCII básico em alguns campos) */
function sanitize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toUpperCase();
}

/**
 * Gera o BR Code PIX (string "copia-e-cola" que vira QR Code)
 */
export function generatePixPayload(params: PixParams): string {
  const { pixKey, merchantName, merchantCity, amount, txid } = params;

  // Merchant Account Information (ID 26) - PIX
  const gui = field("00", "br.gov.bcb.pix");
  // A chave PIX deve ser limpa de caracteres especiais (apenas números para tel/cpf/cnpj)
  const cleanKey = pixKey.replace(/[^a-zA-Z0-9@.-]/g, "");
  const key = field("01", cleanKey);
  const merchantAccountInfo = field("26", gui + key);

  // Additional Data Field (ID 62) - txid
  // O txid é obrigatório para QR Estático, mas pode ser "***"
  const txidSanitized = sanitize(txid).replace(/\s/g, "").slice(0, 25);
  const additionalData = field("62", field("05", txidSanitized || "***"));

  // Monta payload base
  const payloadBase =
    field("00", "01") + // Payload Format Indicator
    field("01", "12") + // Point of Initiation Method (12 = QR Estático)
    merchantAccountInfo +
    field("52", "0000") + // Merchant Category Code
    field("53", "986") + // Currency (986 = BRL)
    field("54", amount.toFixed(2)) + // Transaction Amount
    field("58", "BR") + // Country Code
    field("59", sanitize(merchantName).slice(0, 25)) + // Merchant Name
    field("60", sanitize(merchantCity).slice(0, 15)) + // Merchant City
    additionalData +
    "6304"; // CRC ID + length prefix

  return payloadBase + crc16(payloadBase);
}

/**
 * Gera um txid único curto baseado em timestamp + aleatório
 */
export function generateTxid(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-4);
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");
  return `DN${ts}${rand}`;
}
