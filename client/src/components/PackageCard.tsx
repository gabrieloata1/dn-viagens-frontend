import { Package } from '@/lib/mockData';
import { Link } from 'wouter';
import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  package: Package;
  onAddToCart: (pkg: Package) => void;
}

export default function PackageCard({ package: pkg, onAddToCart }: PackageCardProps) {
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
          R$ {pkg.price.toFixed(2)}
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
        </div>
      </div>
    </div>
  );
}
