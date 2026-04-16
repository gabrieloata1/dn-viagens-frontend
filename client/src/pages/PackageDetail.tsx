import { useState, useMemo } from 'react';
import { useParams, useLocation } from 'wouter';
import { mockPackages } from '@/lib/mockData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin, Clock, Users, CheckCircle, Calendar as CalendarIcon, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function PackageDetail() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const pkg = mockPackages.find((p) => p.id === id);
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const totalAmount = useMemo(() => {
    if (!pkg) return 0;
    // Preço base multiplicado por adultos (crianças de 0-5 geralmente não pagam ou têm valor diferenciado, 
    // mas conforme a solicitação do usuário "preço dobrar se escolher 2 pessoas", focaremos nos adultos)
    const basePrice = pkg.price * adults;
    
    // Opcionais
    const optionalPrice = selectedActivities.reduce((sum, actId) => {
      const activity = pkg.optionalActivities.find(a => a.id === actId);
      if (!activity) return sum;
      
      // Lógica especial para quadriciclo (até 2 pessoas)
      if (activity.name.toLowerCase().includes('quadriciclo')) {
        const unitsNeeded = Math.ceil(adults / 2);
        return sum + (activity.price * unitsNeeded);
      }
      
      // Outros opcionais são por pessoa
      return sum + (activity.price * adults);
    }, 0);

    return basePrice + optionalPrice;
  }, [pkg, adults, selectedActivities]);

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={0} onCartClick={() => {}} />
        <div className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Pacote não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar para Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReserve = () => {
    const selectedOps = selectedActivities.map(id => {
      const act = pkg.optionalActivities.find(a => a.id === id);
      return act ? act.name : '';
    }).filter(Boolean);

    const reservationData = {
      items: [
        {
          id: pkg.id,
          name: pkg.name,
          destination: pkg.destination,
          price: pkg.price,
          quantity: adults,
          optionals: selectedOps,
          date: selectedDate,
          children
        }
      ],
      totalAmount: totalAmount,
      customerName: "",
      customerPhone: ""
    };

    sessionStorage.setItem("dn_cart_checkout", JSON.stringify(reservationData));
    toast.success("Reserva preparada! Indo para o pagamento...");
    setTimeout(() => navigate(`/checkout/${pkg.id}`), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header cartCount={0} onCartClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white container">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{pkg.name}</h1>
            <p className="flex items-center gap-1 opacity-90">
              <MapPin size={18} /> {pkg.destination}
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Detalhes */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-4xl font-bold text-secondary mb-2">R$ {pkg.price.toFixed(2).replace('.', ',')}</p>
                <p className="text-muted-foreground">{pkg.frequency}</p>
                <p className="mt-4 text-lg leading-relaxed">{pkg.description}</p>
              </div>

              {/* Opcionais */}
              {pkg.optionalActivities.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Passeios e atrações opcionais</h3>
                  <div className="grid gap-3">
                    {pkg.optionalActivities.map((activity) => (
                      <div 
                        key={activity.id}
                        onClick={() => {
                          setSelectedActivities(prev => 
                            prev.includes(activity.id) 
                              ? prev.filter(id => id !== activity.id) 
                              : [...prev, activity.id]
                          );
                        }}
                        className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                          selectedActivities.includes(activity.id) 
                            ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                            selectedActivities.includes(activity.id) ? 'bg-primary border-primary text-white' : 'border-muted-foreground'
                          }`}>
                            {selectedActivities.includes(activity.id) && <CheckCircle size={14} />}
                          </div>
                          <div>
                            <p className="font-medium">R$ {activity.price.toFixed(2).replace('.', ',')} {activity.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* O que inclui */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">O que está incluído</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.includes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle size={18} className="text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reserva Card */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 shadow-lg border-t-4 border-t-primary">
                <h3 className="text-xl font-bold mb-6">Agendar Passeio</h3>
                
                <div className="space-y-6">
                  {/* Data */}
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Data</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Adultos */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Adulto</p>
                      <p className="text-xs text-muted-foreground">A partir de 6 anos</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-muted"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-4 text-center">{adults}</span>
                      <button 
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Crianças */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">Criança 0 a 5 anos</p>
                      <p className="text-xs text-muted-foreground">Grátis</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-muted"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-lg w-4 text-center">{children}</span>
                      <button 
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-6 border-t">
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-muted-foreground font-medium">Valor Total</span>
                      <span className="text-3xl font-bold text-secondary">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                    
                    <Button onClick={handleReserve} className="w-full py-6 text-lg font-bold shadow-md">
                      Adicionar
                    </Button>
                    
                    <a 
                      href={`https://wa.me/5582991303370?text=${encodeURIComponent(`Olá! Gostaria de informações sobre o passeio ${pkg.name} para ${adults} pessoas na data ${selectedDate}.`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-3 block"
                    >
                      <Button variant="outline" className="w-full py-6 border-green-500 text-green-600 hover:bg-green-50 font-bold">
                        <MessageCircle className="mr-2" /> WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border ${className}`}>
      {children}
    </div>
  );
}
