import { Package } from '@/lib/mockData';
import { Link } from 'wouter';
import { MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: Package;
  onAddToCart: (pkg: Package) => void;
}

export default function PackageCard({ package: pkg, onAddToCart }: PackageCardProps) {
  const isFlight = pkg.category === 'flight';
  const whatsappNumber = "558291303370";
  const whatsappMessage = encodeURIComponent("Quero fazer orçamento de passagens aéreas");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-muted">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
          {isFlight ? "Clique aqui para orçamento*" : `R$ ${pkg.price.toFixed(2)}`}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-foreground mb-1">{pkg.name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin size={16} />
          <span>{pkg.destination}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {pkg.description}
        </p>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Clock size={16} />
          <span>{pkg.frequency}</span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex gap-2">
          {isFlight ? (
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
                <MessageCircle size={18} className="mr-2" />
                Solicitar Orçamento
              </Button>
            </a>
          ) : (
            <>
              <Link href={`/pacote/${pkg.id}`} className="flex-1">
                <a>
                  <Button variant="outline" className="w-full">
                    Detalhes
                  </Button>
                </a>
              </Link>
              <Button
                className="flex-1"
                onClick={() => onAddToCart(pkg)}
              >
                Adicionar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
