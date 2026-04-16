import { CheckCircle2, MapPin, Users, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: MapPin,
      title: 'Destinos Incríveis',
      description: 'Conheça os mais belos destinos de Alagoas com segurança e conforto.',
    },
    {
      icon: Users,
      title: 'Equipe Experiente',
      description: 'Guias especializados e motoristas profissionais a sua disposição 24 horas.',
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Serviços de excelência reconhecidos pelos nossos clientes há anos.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre D&N Viagens</h1>
          <p className="text-lg text-blue-100">
            Sua agência de turismo de confiança em Alagoas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto py-12 px-4">
        {/* Sobre a Empresa */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed mb-4">
              A D&N Viagens é uma agência de turismo especializada em passeios e experiências turísticas em Alagoas. Com anos de experiência no mercado, oferecemos serviços de qualidade com foco no atendimento ao cliente.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Realizamos passeios para os mais belos destinos de Alagoas, como Praia do Gunga, Maragogi, São Miguel dos Milagres, piscinas naturais e muito mais. Todos os nossos passeios incluem transporte confortável, guias especializados e atendimento 24 horas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nosso compromisso é proporcionar experiências inesquecíveis e seguras para todos os nossos clientes, fazendo de suas férias em Alagoas momentos memoráveis.
            </p>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Por que escolher a D&N Viagens?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Serviços */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Passeios Turísticos',
                description: 'Excursões para praias, piscinas naturais, rios e lagoas com guias especializados.',
              },
              {
                title: 'Transfer Aeroporto',
                description: 'Serviço de transporte do aeroporto até seu hotel com conforto e segurança.',
              },
              {
                title: 'Atendimento 24h',
                description: 'Suporte completo via telefone, WhatsApp e presencialmente na agência.',
              },
              {
                title: 'Parcelamento',
                description: 'Compre seus passeios e parcele em até 10x no cartão de crédito.',
              },
            ].map((service, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contato */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Estamos prontos para ajudar você a planejar a melhor viagem de suas férias em Alagoas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Telefone</h3>
              <p className="text-lg">(82) 9130-3370</p>
              <p className="text-sm text-blue-200">24 horas</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-lg">(82) 9130-3370</p>
              <p className="text-sm text-blue-200">Resposta rápida</p>
            </div>
            <div className="bg-blue-700 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Endereço</h3>
              <p className="text-sm">Pajuçara, Maceió - AL</p>
              <p className="text-sm text-blue-200">CEP: 57030-460</p>
            </div>
          </div>

          <button
            onClick={() => window.open('https://wa.me/558291303370', '_blank')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
}
