import { useState } from 'react';
import { mockPackages, Package } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';
import CartDrawer from '@/components/CartDrawer';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface CartItem extends Package {
  quantity: number;
}

export default function Destinations() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'beach', label: 'Praias' },
    { id: 'transfer', label: 'Transfer' },
    { id: 'adventure', label: 'Aventura' },
    { id: 'tour', label: 'Tours' },
    { id: 'cruise', label: 'Cruzeiros' },
    { id: 'flight', label: 'Passagens' },
  ];

  const filteredPackages =
    selectedCategory === 'all'
      ? mockPackages
      : mockPackages.filter((pkg) => pkg.category === selectedCategory);

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
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="container text-center">
            <h1 className="mb-4">Nossos Destinos</h1>
            <p className="text-lg opacity-90">
              Explore os melhores destinos turísticos em Alagoas
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b border-border py-6">
          <div className="container">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-border'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-12">
          <div className="container">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Mostrando {filteredPackages.length} pacote(s)
              </p>
            </div>

            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    package={pkg}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum pacote encontrado nesta categoria.
                </p>
                <Button onClick={() => setSelectedCategory('all')}>
                  Ver Todos os Pacotes
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted py-12">
          <div className="container text-center">
            <h2 className="mb-4">Não encontrou o que procura?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Entre em contato conosco através do WhatsApp para conhecer outras opções de passeios e pacotes personalizados.
            </p>
            <a href="https://wa.me/558291303370" target="_blank" rel="noopener noreferrer">
              <Button size="lg">
                <MessageCircle size={20} className="mr-2" />
                Contato WhatsApp
              </Button>
            </a>
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
        href="https://wa.me/558291303370"
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
