import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white mt-16">
      {/* SVG Wave Divider */}
      <svg
        className="w-full h-12 -mt-1"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-foreground font-bold">
                DN
              </div>
              <span className="font-bold text-lg">D&N VIAGENS</span>
            </div>
            <p className="text-sm text-gray-300">
              Sua agência de confiança para os melhores passeios e destinos em Alagoas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Passeios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinos">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Praia do Gunga
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/destinos">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Maragogi
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/destinos">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    São Miguel dos Milagres
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Sobre
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/programacao">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Programação
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/tabua-de-mares">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Tábua de marés
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contato">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Contato
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-secondary transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Termos e Condições
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+558241412230"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  📞 (82) 4141-2230
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5582991303370"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  💬 WhatsApp 24h
                </a>
              </li>
              <li>
                <a href="mailto:contato@dnviagens.com" className="text-gray-300 hover:text-secondary transition-colors">
                  ✉️ contato@dnviagens.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <p className="text-sm text-gray-300 mb-4">Formas de Pagamento</p>
          <div className="flex gap-4 flex-wrap">
            <span className="text-xs bg-gray-700 px-3 py-1 rounded">Visa</span>
            <span className="text-xs bg-gray-700 px-3 py-1 rounded">Mastercard</span>
            <span className="text-xs bg-gray-700 px-3 py-1 rounded">Elo</span>
            <span className="text-xs bg-gray-700 px-3 py-1 rounded">PIX</span>
            <span className="text-xs bg-gray-700 px-3 py-1 rounded">Boleto</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center text-sm text-gray-300">
          <p>&copy; 2024 D&N VIAGENS. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              Facebook
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
