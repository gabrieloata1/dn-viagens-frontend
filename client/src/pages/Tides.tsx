import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function Tides() {
  const naturalPools = [
    {
      name: 'Piscinas naturais de Maragogi (Galés de Maragogi)',
      description: 'As mais famosas piscinas naturais de Alagoas com águas cristalinas e recifes de coral.',
    },
    {
      name: 'Piscinas naturais de São Miguel dos Milagres',
      description: 'Piscinas tranquilas e paradisíacas em um dos destinos mais bonitos de Alagoas.',
    },
    {
      name: 'Piscinas naturais de Paripueira',
      description: 'Águas calmas e estrutura completa para aproveitar o melhor da natureza.',
    },
    {
      name: 'Piscinas naturais de Porto de Galinhas-PE',
      description: 'Destino imperdível em Pernambuco com piscinas naturais e recifes espetaculares.',
    },
    {
      name: 'Piscinas naturais da Pajuçara',
      description: 'Passeio tradicional de Maceió com jangadas e piscinas naturais.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tábua de Marés Baixa</h1>
          <p className="text-lg text-blue-100">Visite as Piscinas Naturais</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto py-12 px-4">
        {/* Explicação */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
          <p className="text-gray-700 leading-relaxed">
            Cada tábua de marés a seguir informa os dias em que a maré está com altura entre 0,0 a 0,6 no nível da maré nas piscinas naturais. Estes são os melhores dias para visitar as piscinas naturais de Alagoas e aproveitar ao máximo a experiência.
          </p>
        </div>

        {/* Lista de Piscinas Naturais */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Piscinas Naturais em Alagoas</h2>
          {naturalPools.map((pool, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pool.name}</h3>
              <p className="text-gray-600">{pool.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Conheça Alagoas</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Passeios saindo de Maceió. Conheça lindas praias, piscinas naturais, o imenso rio São Francisco, realizamos passeios todos os dias para diversos destinos em Alagoas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-blue-100">
              <span>✓</span>
              <span>Buscamos no hotel em Maceió</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <span>✓</span>
              <span>Guia bilíngue</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              onClick={() => window.open('https://wa.me/558291303370', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp 24h
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-blue-700 font-semibold"
              onClick={() => window.location.href = '/'}
            >
              Passeios
            </Button>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Melhor Horário</h3>
            <p className="text-gray-600">
              O melhor horário para visitar as piscinas naturais é quando a maré está baixa. Consulte a tábua de marés para saber os melhores dias.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Dúvidas?</h3>
            <p className="text-gray-600">
              Entre em contato com nosso atendimento 24 horas. Temos especialistas prontos para ajudar você a planejar seu passeio perfeito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
