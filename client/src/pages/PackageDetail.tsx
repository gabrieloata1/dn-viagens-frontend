import { useState } from 'react';
import { useParams } from 'wouter';
import { mockPackages, Package } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin, Clock, Users, CheckCircle } from 'lucide-react';

interface CartItem extends Package {
  quantity: number;
}

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = mockPackages.find((p) => p.id === id);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={0} onCartClick={() => setCartOpen(true)} />
        <div className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Pacote não encontrado</h1>
          <a href="/">
            <Button>Voltar para Home</Button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      ...pkg,
      quantity,
    };
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === pkg.id);
      if (existing) {
        return prev.map((item) =>
          item.id === pkg.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, newItem];
    });
    setCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container">
              <p className="text-sm mb-2">Passeios Turísticos / {pkg.destination}</p>
              <h1 className="text-4xl md:text-5xl font-bold">{pkg.name}</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Price and Info */}
              <div className="bg-muted p-6 rounded-lg mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-muted-foreground mb-2">Preço por pessoa</p>
                    <p className="text-4xl font-bold text-secondary">
                      R$ {pkg.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground mb-2">Frequência</p>
                    <p className="font-semibold">{pkg.frequency}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="mb-4">Sobre o Passeio</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {pkg.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">O que está incluído</h3>
                <ul className="space-y-3">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Horário do Passeio</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">{pkg.schedule}</p>
                </div>
              </div>

              {/* Optional Activities */}
              {pkg.optionalActivities.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-lg mb-4">Atrações Opcionais</h3>
                  <div className="space-y-3">
                    {pkg.optionalActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="border border-border rounded-lg p-4 hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedActivities((prev) =>
                            prev.includes(activity.id)
                              ? prev.filter((id) => id !== activity.id)
                              : [...prev, activity.id]
                          );
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedActivities.includes(activity.id)}
                            onChange={() => {}}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{activity.name}</h4>
                            {activity.description && (
                              <p className="text-sm text-muted-foreground">
                                {activity.description}
                              </p>
                            )}
                          </div>
                          <span className="font-bold text-secondary whitespace-nowrap">
                            {activity.price === 0 ? 'Incluído' : `R$ ${activity.price.toFixed(2)}`}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-6">Reservar Agora</h3>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Quantidade de Pessoas</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 text-center border border-border rounded-lg py-2"
                      min="1"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      R$ {(pkg.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-lg text-secondary">
                        R$ {(pkg.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <Button
                  onClick={handleAddToCart}
                  className="w-full mb-3"
                  size="lg"
                >
                  Adicionar ao Carrinho
                </Button>

                <a href="https://wa.me/5582999334244" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    WhatsApp
                  </Button>
                </a>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Duração</p>
                      <p className="text-muted-foreground">{pkg.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Destino</p>
                      <p className="text-muted-foreground">{pkg.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Frequência</p>
                      <p className="text-muted-foreground">{pkg.frequency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          alert('Redirecionando para checkout...');
          setCartOpen(false);
        }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5582999334244"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-30"
        aria-label="Contato WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
