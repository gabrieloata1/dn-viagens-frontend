import { useState } from 'react';
import { mockPackages, mockDestinations, Package } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface CartItem extends Package {
  quantity: number;
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (pkg: Package) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === pkg.id);
      if (existing) {
        return prev.map((item) =>
          item.id === pkg.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...pkg, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/hero-beach-maceio-bNh8vzKaGEp69Wd4abQ3Jz.webp"
            alt="Praia de Maceió"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <p className="text-sm md:text-base mb-2 font-medium">Maceió - Alagoas</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Passeios Turísticos</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Reserve direto pelo WhatsApp e ganhe desconto
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90"
                onClick={() => setCartOpen(true)}
              >
                Explorar Pacotes
              </Button>
              <a href="https://wa.me/5582999334244" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/20"
                >
                  <MessageCircle size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="font-bold text-lg mb-2">Desconto WhatsApp</h3>
                <p className="text-muted-foreground">
                  Reserve direto pelo WhatsApp e ganhe desconto.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="font-bold text-lg mb-2">Parcele em até 10x</h3>
                <p className="text-muted-foreground">
                  Compre pelo site com cartão de crédito e parcele em até 10x.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚐</div>
                <h3 className="font-bold text-lg mb-2">Passeios</h3>
                <p className="text-muted-foreground">
                  Buscamos os passageiros hospedados na orla de Maceió.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Destinations */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4">3 Destinos Mais Visitados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Conheça os destinos mais procurados por nossos clientes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {mockDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="relative group overflow-hidden rounded-lg h-64 cursor-pointer"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                    <p className="text-secondary font-bold">R$ {dest.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setCartOpen(true)}
              >
                Ver Todos os Destinos
              </Button>
            </div>
          </div>
        </section>

        {/* All Packages */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="mb-4">Passeios em Maceió</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Realizamos excursões em Maceió com destinos às praias, rios, lagoas e piscinas naturais. Reserve passeios para suas férias no maravilhoso paraíso tropical do Brasil.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="mb-4">Pronto para sua próxima aventura?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Entre em contato conosco e reserve seu passeio hoje mesmo. Temos as melhores opções de destinos em Alagoas.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => setCartOpen(true)}
              >
                Ver Pacotes
              </Button>
              <a href="https://wa.me/5582999334244" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Contato WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
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
