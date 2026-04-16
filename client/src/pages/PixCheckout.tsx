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
  pixKey: "82999827837",       // ← chave PIX
  merchantName: "DN VIAGENS",    // máx 25 chars sem acento
  merchantCity: "MACEIO",        // máx 15 chars sem acento
  ownerWhatsApp: "558291303370", // número que recebe comprovantes
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
  const width = window.innerWidth < 640 ? 240 : 280;
  await QRCode.toCanvas(canvas, payload, {
    width: width,
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

  const [reservation] = useState<ReservationData>(() => {
    try {
      const stored = sessionStorage.getItem("dn_cart_checkout");
      if (stored) return JSON.parse(stored) as ReservationData;
    } catch { }
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

  useEffect(() => {
    if (canvasRef.current) {
      renderQRCode(canvasRef.current, pixPayload).catch(() =>
        toast.error("Erro ao gerar QR Code")
      );
    }
  }, [pixPayload]);

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
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header cartCount={0} onCartClick={() => {}} />

      <div className="container py-8 md:py-12 w-full">
        <Button
          variant="ghost"
          onClick={() => navigate("/destinos")}
          className="gap-2 mb-6 hover:bg-muted"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">Pagamento via PIX</h1>
        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Sua vaga está reservada. Conclua o pagamento em até {RESERVATION_TIMEOUT_MIN} minutos.
        </p>

        {expired ? (
          <Card className="p-12 text-center shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-destructive">Tempo Expirado</h2>
            <p className="text-muted-foreground mb-6">
              A reserva foi liberada. Faça uma nova reserva para continuar.
            </p>
            <Button onClick={() => navigate("/destinos")} className="px-8">Voltar aos destinos</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6">
              {/* QR Code */}
              <Card className="p-4 sm:p-8 shadow-md border-t-4 border-t-primary">
                <div className="flex items-center justify-center gap-2 mb-6 text-secondary bg-secondary/10 py-2 rounded-full max-w-[200px] mx-auto">
                  <Clock className="w-5 h-5" />
                  <span className="text-xl font-mono font-bold">
                    {formatTime(secondsLeft)}
                  </span>
                </div>

                <div className="flex justify-center mb-6 bg-white p-2 sm:p-4 rounded-xl border border-border shadow-inner">
                  <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>

                <p className="text-xs sm:text-sm text-center text-muted-foreground mb-6 font-medium">
                  Abra o app do seu banco e escaneie o QR Code acima
                </p>

                <div className="border-t border-border pt-6">
                  <p className="text-sm font-bold mb-3">Ou copie o código PIX:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={pixPayload}
                      className="flex-1 px-3 py-3 text-[10px] sm:text-xs bg-muted rounded-lg font-mono truncate border border-border outline-none"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button onClick={handleCopy} variant="secondary" className="px-4 shadow-sm">
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Dados do Cliente */}
              <Card className="p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User className="text-primary" size={20} /> Seus Dados
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold mb-2 block text-muted-foreground">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ex: João Silva"
                        className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold mb-2 block text-muted-foreground">WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ex: (82) 99999-9999"
                        className="w-full pl-10 pr-4 py-3 bg-muted/30 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Resumo da Reserva */}
            <div className="space-y-6">
              <Card className="p-6 shadow-md border-t-4 border-t-secondary">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                   Resumo da Reserva
                </h2>
                <div className="space-y-6">
                  {reservation.items.map((item) => (
                    <div key={item.id} className="space-y-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-extrabold text-xl text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground font-medium">{item.destination}</p>
                        </div>
                        <span className="font-extrabold text-xl text-secondary">R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm bg-muted/40 p-4 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="font-bold">{item.quantity} Adultos</span>
                        </div>
                        {item.children !== undefined && item.children > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-bold">{item.children} Crianças</span>
                          </div>
                        )}
                        {item.date && (
                          <div className="flex items-center gap-2 sm:col-span-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span className="font-bold">Data: {new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                          </div>
                        )}
                      </div>

                      {item.optionals && item.optionals.length > 0 && (
                        <div className="mt-2">
                          <p className="font-extrabold text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Atrações Opcionais:</p>
                          <div className="flex flex-wrap gap-2">
                            {item.optionals.map((opt, idx) => (
                              <span key={idx} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                <Check size={12} /> {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-lg font-bold">Total a Pagar</span>
                    <span className="text-3xl font-extrabold text-secondary">
                      R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Comprovante */}
              <Card className="p-6 shadow-md">
                <h2 className="text-xl font-bold mb-3">Comprovante</h2>
                <p className="text-sm text-muted-foreground mb-6 font-medium">
                  Anexe a foto do comprovante para confirmar sua vaga.
                </p>

                <label className="block mb-6 cursor-pointer">
                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${proofFile ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-border hover:bg-muted/30"}`}>
                    <Upload className={`w-10 h-10 mx-auto mb-3 ${proofFile ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-sm font-bold">{proofFile ? `✓ ${proofFile.name}` : "Clique para anexar foto"}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">Máximo 5MB • JPG, PNG ou PDF</p>
                  </div>
                  <input type="file" accept="image/*,.pdf" onChange={handleFileSelect} className="hidden" />
                </label>

                <Button onClick={handleConfirmPayment} disabled={!proofFile || submitting} className="w-full py-8 text-xl font-extrabold rounded-xl shadow-lg transition-all hover:scale-[1.02]" size="lg">
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
    <div className={`bg-card rounded-2xl border border-border ${className}`}>
      {children}
    </div>
  );
}
