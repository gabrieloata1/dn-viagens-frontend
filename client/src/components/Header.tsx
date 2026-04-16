import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'INÍCIO', href: '/' },
    { label: 'D&N VIAGENS', href: '/sobre' },
    { label: 'DESTINOS', href: '/destinos' },
    { label: 'PROGRAMAÇÃO', href: '/programacao' },
    { label: 'TÁBUA DE MARÉS', href: '/tabua-de-mares' },
    { label: 'TRANSFER', href: '/transfer' },
    { label: 'BLOG', href: '/blog' },
    { label: 'CONTATO', href: '/contato' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4 text-sm">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4">
            <a href="tel:+558241412230" className="hover:opacity-80 transition-opacity">
              📞 Televenda (82) 4141-2230
            </a>
            <span>Parcele em até 10x no cartão de crédito</span>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/5582999334244" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:opacity-80">
              💬
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:opacity-80">
              📷
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:opacity-80">
              👍
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:opacity-80">
              ▶️
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-2xl text-primary hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                DN
              </div>
              <span className="hidden sm:inline">D&N VIAGENS</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/5582999334244"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={24} className="text-primary" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border bg-muted">
            <div className="container py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <a
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
