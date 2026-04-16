import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Copy, Check, Upload, ChevronLeft, Clock, User, Phone, Calendar } from "lucide-react";
import { toast } from "sonner";
import { generatePixPayload, generateTxid } from "@/lib/pix";
import Header from "@/components/Header";

// ============================================================================
// CONFIGURAÇÃO — DADOS DO CLIENTE DN VIAGENS
// ============================================================================
const PIX_CONFIG = {
  pixKey: "+5582999827837",       // ← chave PIX (trocar pelo real do cliente)
  merchantName: "DN VIAGENS",    // máx 25 chars sem acento
  merchantCity: "MACEIO",        // máx 15 chars sem acento
  ownerWhatsApp: "558291303370", // número que recebe comprovantes (DDI+DDD+número)
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
  quantity: number;
}

interface ReservationData {
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  tripDate?: string;
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

function buildWhatsAppMessage(reservation: ReservationData, txid: string): string {
  const itemsList = reservation.items
    .map((i) => `  • ${i.name} (${i.quantity}x) — R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`)
    .join("\n");

  const formatDate = (dateString: string) => {
    if (!dateString) return "não informada";
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

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
    `📅 *Data da viagem:* ${formatDate(reservation.tripDate || "")}`,
    ``,
    `👤 *Cliente:* ${reservation.customerName || "não informado"}`,
    `📱 *Telefone:* ${reservation.customerPhone || "não informado"}`,
    ``,
    `_Verifique o comprovante e confirme a reserva._`,
  ].join("\n");
}

// ============================================================================
// COMPONENTE
// ============================================================================
export default function PixCheckout() {
  const [, navigate] = useLocation();
  const params = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lê dados do carrinho passados via sessionStorage (setado em Home/Destinations)
  const [reservation] = useState<ReservationData>(() => {
    try {
      const stored = sessionStorage.getItem("dn_cart_checkout");
      if (stored) return JSON.parse(stored) as ReservationData;
    } catch {
      // fallback abaixo
    }
    // Dados de demonstração se não vier nenhum carrinho
    return {
      items: [
        {
          id: params.id || "1",
          name: "Passeio Selecionado",
          destination: "Alagoas",
          price: 150,
          quantity: 2,
        },
      ],
      totalAmount: 300,
      customerName: "",
      customerPhone: "",
    };
  });

  const [txid] = useState(() => generateTxid());
  const [pixPayload] = useState(() =>
    generatePixPayload({
      pixKey: PIX_CONFIG.pixKey,
      merchantName: PIX_CONFIG.merchantName,
      merchantCity: PIX_CONFIG.merchantCity,
      amount: reservation.totalAmount,
      txid,
    })
  );

  const [secondsLeft, setSecondsLeft] = useState(RESERVATION_TIMEOUT_MIN * 60);
  const [copied, setCopied] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState(reservation.customerName || "");
  const [customerPhone, setCustomerPhone] = useState(reservation.customerPhone || "");
  const [tripDate, setTripDate] = useState(reservation.tripDate || "");

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
      toast.error("Por favor, informe seu número de WhatsApp");
      return;
    }
    if (!tripDate) {
      toast.error("Por favor, selecione a data da viagem");
      return;
    }
    if (!proofFile) {
      toast.error("Anexe o comprovante de pagamento primeiro");
      return;
    }
    setSubmitting(true);
    try {
      const updatedReservation = {
        ...reservation,
        customerName,
        customerPhone,
        tripDate,
      };
      const message = buildWhatsAppMessage(updatedReservation, txid);
      const url = `https://wa.me/${PIX_CONFIG.ownerWhatsApp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

      // Limpa o carrinho do sessionStorage
      sessionStorage.removeItem("dn_cart_checkout");

      toast.success("Pagamento confirmado! Você será contatado em breve.");
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
            {/* QR Code + copia-e-cola */}
            <Card className="p-8">
              {/* Timer */}
              <div className="flex items-center justify-center gap-2 mb-6 text-secondary">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-mono font-bold">
                  {formatTime(secondsLeft)}
                </span>
              </div>

              {/* Canvas QR */}
              <div className="flex justify-center mb-6 bg-white p-4 rounded-lg border border-border">
                <canvas ref={canvasRef} />
              </div>

              <p className="text-sm text-center text-muted-foreground mb-4">
                Abra o app do seu banco e escaneie o QR Code
              </p>

              {/* Copia-e-cola */}
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

            {/* Resumo + comprovante */}
            <div className="space-y-6">
              {/* Resumo da reserva */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Resumo da Reserva</h2>
                <div className="space-y-3">
                  {reservation.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {item.quantity} {item.quantity === 1 ? "adulto" : "adultos"} × R$ {item.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <span className="font-semibold">
                        R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-t border-border pt-3 mt-3">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-secondary">
                      R$ {reservation.totalAmount.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Dados do Cliente */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Seus Dados</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Ex: João Silva"
                        className="pl-10"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="Ex: (82) 99999-9999"
                        className="pl-10"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tripDate">Data da Viagem</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="tripDate"
                        type="date"
                        className="pl-10"
                        value={tripDate}
                        onChange={(e) => setTripDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Upload do comprovante */}
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-2">Comprovante de Pagamento</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Após pagar, anexe o comprovante e clique em confirmar. Entraremos em
                  contato pelo WhatsApp para finalizar sua reserva.
                </p>

                <label className="block mb-4 cursor-pointer">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      proofFile
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-semibold">
                      {proofFile ? `✓ ${proofFile.name}` : "Clique para anexar (foto ou PDF)"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Máx 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                <Button
                  onClick={handleConfirmPayment}
                  disabled={!proofFile || submitting}
                  className="w-full py-6 text-lg font-semibold"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 w-5 h-5" />
                      Enviando...
                    </>
                  ) : (
                    "Confirmar Pagamento"
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-3">
                  Ao confirmar, sua mensagem com o comprovante será enviada via WhatsApp
                  para nossa equipe.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
