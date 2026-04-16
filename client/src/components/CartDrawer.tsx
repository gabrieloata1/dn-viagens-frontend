import { Package } from '@/lib/mockData';
import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

interface CartItem extends Package {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const [, navigate] = useLocation();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;

    // Salva o carrinho no sessionStorage para o PixCheckout ler
    const checkoutData = {
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        destination: i.destination,
        price: i.price,
        quantity: i.quantity,
      })),
      totalAmount: total,
      customerName: "",
      customerPhone: "",
    };
    sessionStorage.setItem("dn_cart_checkout", JSON.stringify(checkoutData));

    onClose();
    // Usa o id do primeiro item na rota (cosmético — os dados vêm do sessionStorage)
    navigate(`/checkout/pix/${items[0].id}`);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="font-bold text-lg">Minha Reserva</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">
                Adicione passeios a sua reserva.
              </p>
              <p className="text-sm text-muted-foreground">
                Escolha seus destinos e monte seu pacote de passeios.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-border rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.destination}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 hover:bg-destructive/10 rounded transition-colors"
                      aria-label="Remover do carrinho"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                    </span>
                    <span className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-secondary">R$ {total.toFixed(2)}</span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full"
              size="lg"
            >
              Pagar via PIX
            </Button>

            <a
              href="https://wa.me/5582999334244"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full"
                size="lg"
              >
                Contatar via WhatsApp
              </Button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}
