import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Copy, Check, Upload, ChevronLeft, Clock, User, Phone, Users } from "lucide-react";
import { toast } from "sonner";
import { generatePixPayload, generateTxid } from "@/lib/pix";
import Header from "@/components/Header";

// ============================================================================
// CONFIGURAÇÃO — DADOS DO CLIENTE DN VIAGENS
// ============================================================================
const PIX_CONFIG = {
  pixKey: "+5582991303370",       // ← chave PIX (trocar pelo real do cliente)
  merchantName: "DN VIAGENS",    // máx 25 chars sem acento
  merchantCity: "MACEIO",        // máx 15 chars sem acento
  ownerWhatsApp: "5582991303370", // número que recebe comprovantes (DDI+DDD+número)
};

const RESERVATION_TIMEOUT_MIN = 30;

// ============================================================================
// TIPOS
// ============================================================================
interface CartItem {
  id: string;
  name: string;
  destination: string;
  price: number;
  quantity: number; // Representa Adultos
  optionals?: string[];
  date?: string;
  children?: number;
}

interface ReservationData {
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
}

// ============================================================================
// HELPERS
// ============================================================================

async function renderQRCode(canvas: HTMLCanvasElement, payload: string) {
  const QRCode = await import("qrcode");
  await QRCode.toCanvas(canvas, payload, {
    width: 280,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function buildWhatsAppMessage(reservation: ReservationData, txid: string, customerName: string, customerPhone: string): string {
  const itemsList = reservation.items
    .map((i) => {
      let text = `  • ${i.name} (${i.quantity} adultos${i.children ? `, ${i.children} crianças` : ''})`;
      if (i.date) text += `\n    Data: ${i.date}`;
      if (i.optionals && i.optionals.length > 0) {
        text += `\n    Opcionais: ${i.optionals.join(', ')}`;
      }
      return text;
    })
    .join("\n\n");

  return [
    `🎫 *NOVA RESERVA — PAGAMENTO ENVIADO*`,
    ``,
    `*ID da transação:* ${txid}`,
    ``,
    `🗺️ *Passeios reservados:*`,
    itemsList,
    ``,
    `💰 *Total pago:* R$ ${reservation.totalAmount.toFixed(2).replace(".", ",")}`,
    ``,
    `👤 *Cliente:* ${customerName || "não informado"}`,
    `📱 *WhatsApp do Cliente:* ${customerPhone || "não informado"}`,
    ``,
    `_Verifique o comprovante anexo e confirme a reserva._`,
  ].join("\n");
}

// ============================================================================
// COMPONENTE
// ============================================================================
export default function PixCheckout() {
  const [, navigate] = useLocation();
  const params = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lê dados do carrinho passados via sessionStorage
  const [reservation] = useState<ReservationData>(() => {
    try {
      const stored = sessionStorage.getItem("dn_cart_checkout");
      if (stored) return JSON.parse(stored) as ReservationData;
    } catch {
      // fallback abaixo
    }
    return {
      items: [
        {
          id: params.id || "1",
          name: "Passeio Selecionado",
          destination: "Alagoas",
          price: 150,
          quantity: 1,
        },
      ],
      totalAmount: 150,
      customerName: "",
      customerPhone: "",
    };
  });

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [txid] = useState(() => generateTxid());
  const [pixPayload] = useState(() =>
    generatePixPayload({
      pixKey: PIX_CONFIG.pixKey,
      merchantName: PIX_CONFIG.merchantName,
      merchantCity: PIX_CONFIG.merchantCity,
      amount: reservation.totalAmount,
      txid,
      description: `DN Viagens ${txid}`,
    })
  );

  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_TIMEOUT_MIN * 60);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Renderiza o QR Code
  useEffect(() => {
    if (canvasRef.current) {
      renderQRCode(canvasRef.current, pixPayload).catch(() =>
        toast.error("Erro ao gerar QR Code")
      );
    }
  }, [pixPayload]);

  // Timer regressivo
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixPayload);
      setCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Selecione e copie o código manualmente");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Arquivo muito grande (máx 5MB)");
      return;
    }
    setProofFile(file);
    toast.success("Comprovante anexado ✓");
  };

  const handleConfirmPayment = async () => {
    if (!customerName.trim()) {
      toast.error("Por favor, informe seu nome");
      return;
    }
    if (!customerPhone.trim()) {
      toast.error("Por favor, informe seu WhatsApp");
      return;
    }
    if (!proofFile) {
      toast.error("Anexe o comprovante de pagamento primeiro");
      return;
    }
    
    setSubmitting(true);
    try {
      const message = buildWhatsAppMessage(reservation, txid, customerName, customerPhone);
      const url = `https://wa.me/${PIX_CONFIG.ownerWhatsApp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      sessionStorage.removeItem("dn_cart_checkout");
      toast.success("Pagamento enviado! Você será contatado em breve.");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      toast.error("Erro ao confirmar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const expired = secondsLeft <= 0;

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} onCartClick={() => {}} />

      <div className="container max-w-4xl py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/destinos")}
          className="gap-2 mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Button>

        <h1 className="text-3xl font-bold mb-2">Pagamento via PIX</h1>
        <p className="text-muted-foreground mb-8">
          Sua vaga está reservada. Conclua o pagamento em até {RESERVATION_TIMEOUT_MIN} minutos.
        </p>

        {expired ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-destructive">Tempo Expirado</h2>
            <p className="text-muted-foreground mb-6">
              A reserva foi liberada. Faça uma nova reserva para continuar.
            </p>
            <Button onClick={() => navigate("/destinos")}>Voltar aos destinos</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* QR Code */}
              <Card className="p-8">
                <div className="flex items-center justify-center gap-2 mb-6 text-secondary">
                  <Clock className="w-5 h-5" />
                  <span className="text-2xl font-mono font-bold">
                    {formatTime(secondsLeft)}
                  </span>
                </div>

                <div className="flex justify-center mb-6 bg-white p-4 rounded-lg border border-border">
                  <canvas ref={canvasRef} />
                </div>

                <p className="text-sm text-center text-muted-foreground mb-4">
                  Abra o app do seu banco e escaneie o QR Code
                </p>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold mb-2">Ou copie o código PIX:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixPayload}
                      className="flex-1 px-3 py-2 text-xs bg-muted rounded font-mono truncate border border-border"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button onClick={handleCopy} variant="outline" size="icon">
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Dados do Cliente */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Seus Dados</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Seu Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Seu WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ex: (82) 99999-9999"
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Resumo da Reserva */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Resumo da Reserva</h2>
                <div className="space-y-4">
                  {reservation.items.map((item) => (
                    <div key={item.id} className="space-y-3 pb-3 border-b border-border last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.destination}</p>
                        </div>
                        <span className="font-bold text-secondary">R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-medium">{item.quantity} Adultos</span>
                        </div>
                        {item.children !== undefined && item.children > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-medium">{item.children} Crianças</span>
                          </div>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-2 col-span-2 mt-1">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-medium">Data: {new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                          </div>
                        )}
                      </div>

                      {item.optionals && item.optionals.length > 0 && (
                        <div className="mt-2">
                          <p className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-1">Atrações Opcionais:</p>
                          <ul className="space-y-1">
                            {item.optionals.map((opt, idx) => (
                              <li key={idx} className="text-sm flex items-center gap-2">
                                <Check className="w-3 h-3 text-green-500" />
                                {opt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total a Pagar</span>
                    <span className="text-3xl font-bold text-secondary">
                      R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Comprovante */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-2">Comprovante de Pagamento</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Anexe o comprovante e clique em confirmar para finalizar sua reserva.
                </p>

                <label className="block mb-4 cursor-pointer">
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${proofFile ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"}`}>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-semibold">{proofFile ? `✓ ${proofFile.name}` : "Clique para anexar foto ou PDF"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Máximo 5MB</p>
                  </div>
                  <input type="file" accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
                </label>

                <Button onClick={handleConfirmPayment} disabled={!proofFile || submitting} className="w-full py-6 text-lg font-bold" size="lg">
                  {submitting ? <><Loader2 className="animate-spin mr-2" /> Enviando...</> : "Confirmar Pagamento"}
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border ${className}`}>
      {children}
    </div>
  );
}
