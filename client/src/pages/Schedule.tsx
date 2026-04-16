import { mockPackages } from '@/lib/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function Schedule() {
  // Agrupar pacotes por frequência para melhor visualização
  const groupedPackages = mockPackages.reduce((acc, pkg) => {
    const freq = pkg.frequency;
    if (!acc[freq]) {
      acc[freq] = [];
    }
    acc[freq].push(pkg);
    return acc;
  }, {} as Record<string, typeof mockPackages>);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Programação de Passeios</h1>
          <p className="text-lg text-blue-100">
            Programação e valores de passeios turísticos em Maceió
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="mb-12 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <p className="text-gray-700 mb-4">
            Realizamos passeios todos os dias, confira a tabela de preços dos passeios realizados pela D&N Viagens. Todos os destinos têm saída em Maceió. Alguns passeios possuem taxa de Day Use, confira os detalhes na descrição de cada passeio.
          </p>
          <p className="text-gray-700">
            Quer visitar as piscinas naturais? Antes de agendar o seu passeio, consulte a <a href="/tides" className="text-blue-600 font-semibold hover:underline">tábua das marés</a> e saiba os melhores dias de maré baixa para se divertir nas piscinas naturais. Ou entre em contato com nosso atendimento 24 horas.
          </p>
        </div>

        {/* Grid de Passeios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold">Preço:</span> R$ {pkg.price.toFixed(2).replace('.', ',')}
                    </p>
                    <p>
                      <span className="font-semibold">Frequência:</span> {pkg.frequency}
                    </p>
                    {pkg.schedule && (
                      <p>
                        <span className="font-semibold">Horário:</span> {pkg.schedule}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção de Compra */}
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comprar passeios pelo site</h2>
          <p className="text-gray-700 mb-6">
            Para comprar no site da D&N Viagens, clique em "Detalhes" ou "Adicionar ao Carrinho" em qualquer passeio, confira os detalhes de cada passeio, preço, informe a quantidade de pessoas, a data dos passeios e finalize sua compra escolhendo uma das opções de pagamento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Reservas 24 horas por telefone</h3>
              <p className="text-gray-600 text-sm mb-3">
                Nosso número <span className="font-semibold">(82) 9130-3370</span> está disponível 24 horas para reservas de passeios turísticos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Reserve pelo WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-3">
                O WhatsApp da D&N Viagens é <span className="font-semibold">(82) 9130-3370</span> com horário de atendimento 24 horas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Parcele em até 10x</h3>
              <p className="text-gray-600 text-sm mb-3">
                Compre pelo site com cartão de crédito e parcele em até 10x sem juros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
