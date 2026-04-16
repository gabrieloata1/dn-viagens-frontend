import { useState } from 'react';
import { mockPackages, mockDestinations, Package } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-background w-full overflow-x-hidden">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="flex-1 w-full">
        {/* Hero Section - Ajustada para preenchimento total */}
        <section className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full overflow-hidden">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/hero-beach-maceio-bNh8vzKaGEp69Wd4abQ3Jz.webp"
            alt="Praia de Maceió"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="container max-w-4xl">
              <p className="text-sm md:text-lg mb-2 font-semibold tracking-wider uppercase opacity-90">Maceió - Alagoas</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
                Passeios Turísticos
              </h1>
              <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto font-medium opacity-90">
                Reserve direto pelo WhatsApp e ganhe desconto exclusivo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold py-7 px-8 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
                  onClick={() => setCartOpen(true)}
                >
                  Explorar Pacotes
                </Button>
                <a href="https://wa.me/558291303370" target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-white border-2 border-white hover:bg-white/20 font-bold py-7 px-8 text-lg rounded-full transition-all"
                  >
                    <MessageCircle size={22} className="mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white border-b border-border">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center p-4 hover:bg-muted/30 rounded-xl transition-colors">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">💬</div>
                <h3 className="font-bold text-xl mb-2">Desconto WhatsApp</h3>
                <p className="text-muted-foreground">
                  Fale com nossos atendentes e consiga as melhores condições.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 hover:bg-muted/30 rounded-xl transition-colors">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">💳</div>
                <h3 className="font-bold text-xl mb-2">Parcele em até 10x</h3>
                <p className="text-muted-foreground">
                  Facilitamos seu pagamento no cartão de crédito em até 10 vezes.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 hover:bg-muted/30 rounded-xl transition-colors">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">🚐</div>
                <h3 className="font-bold text-xl mb-2">Pegamos você no Hotel</h3>
                <p className="text-muted-foreground">
                  Conforto total buscando você na orla de Maceió para os passeios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Destinations */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Destinos Mais Visitados</h2>
                <p className="text-muted-foreground max-w-xl">
                  As praias e atrações favoritas de quem visita Alagoas.
                </p>
              </div>
              <Button variant="ghost" className="text-primary font-bold hidden md:flex items-center gap-1 hover:bg-transparent hover:text-primary/80" onClick={() => setCartOpen(true)}>
                Ver todos os destinos <ChevronRight size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {mockDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="relative group overflow-hidden rounded-2xl h-[400px] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-bold text-2xl mb-1">{dest.name}</h3>
                    <p className="text-secondary font-extrabold text-xl mb-3">A partir de R$ {dest.price.toFixed(2).replace('.', ',')}</p>
                    <Button className="w-full bg-white text-black hover:bg-white/90 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center md:hidden">
              <Button
                size="lg"
                className="w-full py-6 font-bold"
                onClick={() => setCartOpen(true)}
              >
                Ver Todos os Destinos
              </Button>
            </div>
          </div>
        </section>

        {/* All Packages */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Passeios em Maceió</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Explore o paraíso tropical do Brasil com quem entende de Alagoas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockPackages.filter(pkg => pkg.category !== 'cruise').map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Cruises Section */}
        <section className="py-20 bg-muted/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Cruzeiros em Destaque</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                As melhores ofertas de cruzeiros nacionais, internacionais e temáticos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockPackages.filter(pkg => pkg.category === 'cruise').map((pkg) => (
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
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
             <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
          </div>
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Pronto para sua próxima aventura?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 font-medium">
              Estamos disponíveis 24h para ajudar você a planejar a viagem perfeita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Button
                size="lg"
                variant="secondary"
                className="font-bold py-7 px-10 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
                onClick={() => setCartOpen(true)}
              >
                Ver Pacotes
              </Button>
              <a href="https://wa.me/558291303370" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/20 font-bold py-7 px-10 text-lg rounded-full transition-all"
                >
                  <MessageCircle size={22} className="mr-2" />
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
          setCartOpen(false);
        }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/558291303370"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50 animate-bounce"
        style={{ animationDuration: '3s' }}
        aria-label="Contato WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
