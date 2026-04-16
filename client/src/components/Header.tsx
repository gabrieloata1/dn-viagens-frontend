import { ShoppingCart, Menu, X, MessageCircle, Phone } from 'lucide-react';
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
      {/* Top Bar - Melhorada para mobile */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4 text-xs md:text-sm">
        <div className="container flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
            <a href="tel:+558291303370" className="hover:opacity-80 transition-opacity flex items-center gap-1">
              <Phone size={14} /> <span className="font-bold">Televenda (82) 9130-3370</span>
            </a>
            <span className="opacity-90">Parcele em até 10x no cartão</span>
          </div>
          <div className="flex gap-4 items-center">
            <a href="https://wa.me/558291303370" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="hover:scale-110 transition-transform">
              💬
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:scale-110 transition-transform">
              📷
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:scale-110 transition-transform">
              👍
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:scale-110 transition-transform">
              ▶️
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm w-full">
        <div className="container py-3 md:py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl md:text-2xl text-primary hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base">
                DN
              </div>
              <span className="whitespace-nowrap">D&N VIAGENS</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-5 xl:gap-6">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* WhatsApp Button - Desktop Only */}
            <a
              href="https://wa.me/558291303370"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
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
              <ShoppingCart size={22} md:size={24} className="text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border bg-white animate-in slide-in-from-top duration-300">
            <div className="container py-4 flex flex-col divide-y divide-border">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <a
                    className="text-base font-medium text-foreground hover:text-primary hover:bg-muted transition-all py-3 px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <a
                href="https://wa.me/558291303370"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 py-4 px-2 font-bold"
              >
                <MessageCircle size={20} />
                Falar no WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
