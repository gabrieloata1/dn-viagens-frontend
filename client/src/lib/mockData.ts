export interface Package {
  id: string;
  name: string;
  destination: string;
  price: number;
  image: string;
  description: string;
  duration: string;
  includes: string[];
  optionalActivities: Activity[];
  schedule: string;
  frequency: string;
  category: 'beach' | 'transfer' | 'adventure' | 'tour';
}

export interface Activity {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const mockPackages: Package[] = [
  {
    id: '1',
    name: 'Praia do Gunga',
    destination: 'Maceió - Alagoas',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
    description: 'Ótima opção para curtir em Alagoas é a Praia do Gunga, possui uma excelente estrutura com restaurantes e barracas para refeições, além de uma paisagem inesquecível onde é possível ver a beleza e o imenso coqueiral no Mirante do Gunga com vista para a praia.',
    duration: '8 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'a1', name: 'Passeio de buggy (por pessoa)', price: 75, description: '' },
      { id: 'a2', name: 'Passeio de quadriciclo (até 2 pessoas)', price: 200, description: '' },
      { id: 'a3', name: 'Passeio de lancha (por pessoa)', price: 75, description: '' },
      { id: 'a4', name: 'Voo de paramotor (por pessoa)', price: 300, description: '' },
      { id: 'a5', name: 'Banana boat (por pessoa)', price: 40, description: '' },
    ],
    schedule: 'Saída do hotel entre 7h:20 a 8h:20',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '2',
    name: 'Maragogi',
    destination: 'Alagoas',
    price: 100,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    description: 'Maragogi é um dos destinos mais procurados em Alagoas. Com piscinas naturais de água cristalina, recifes de coral e uma estrutura completa de barracas e restaurantes. Perfeito para quem busca relaxamento e beleza natural.',
    duration: '10 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante', 'Acesso às piscinas naturais'],
    optionalActivities: [
      { id: 'b1', name: 'Passeio de barco (por pessoa)', price: 80, description: '' },
      { id: 'b2', name: 'Mergulho com cilindro (por pessoa)', price: 150, description: '' },
      { id: 'b3', name: 'Almoço em restaurante local', price: 60, description: '' },
    ],
    schedule: 'Saída do hotel entre 7h:00 a 8h:00',
    frequency: 'Todos os dias de acordo com a tábua da maré',
    category: 'beach',
  },
  {
    id: '3',
    name: 'São Miguel dos Milagres',
    destination: 'Alagoas',
    price: 80,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
    description: 'São Miguel dos Milagres é um paraíso tropical com praias virgens, piscinas naturais e uma atmosfera tranquila. Ideal para casais e famílias que buscam um destino mais calmo e autêntico.',
    duration: '9 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'c1', name: 'Passeio de jangada (por pessoa)', price: 60, description: '' },
      { id: 'c2', name: 'Aula de surf (por pessoa)', price: 100, description: '' },
    ],
    schedule: 'Saída do hotel entre 7h:30 a 8h:30',
    frequency: 'Domingo, terça, quinta e sexta-feira',
    category: 'beach',
  },
  {
    id: '4',
    name: 'Transfer Aeroporto-Hotel',
    destination: 'Maceió',
    price: 150,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/transfer-service-VusiAZkjB7BUAVGkckQFsz.png',
    description: 'Serviço de transfer confortável e seguro do Aeroporto Internacional de Maceió até seu hotel na orla. Veículos modernos e motoristas experientes.',
    duration: '30 minutos',
    includes: ['Transporte rodoviário', 'Motorista profissional', 'Veículo ar-condicionado'],
    optionalActivities: [],
    schedule: 'Sob demanda',
    frequency: 'Todos os dias',
    category: 'transfer',
  },
  {
    id: '5',
    name: 'Praia do Francês',
    destination: 'Maceió',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
    description: 'Praia do Francês é uma das praias mais bonitas de Maceió, com águas calmas, areia branca e uma estrutura completa de barracas. Perfeita para famílias.',
    duration: '6 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'd1', name: 'Passeio de catamarã (por pessoa)', price: 90, description: '' },
    ],
    schedule: 'Saída do hotel entre 8h:00 a 9h:00',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '6',
    name: 'Angra de Ipioca - Vivari Beach Club',
    destination: 'Maceió',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    description: 'Angra de Ipioca é uma enseada natural com águas cristalinas perfeita para snorkel. O Vivari Beach Club oferece infraestrutura completa com restaurante e bar.',
    duration: '7 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante', 'Acesso ao beach club'],
    optionalActivities: [
      { id: 'e1', name: 'Snorkel (equipamento incluído)', price: 0, description: '' },
      { id: 'e2', name: 'Almoço no beach club', price: 70, description: '' },
    ],
    schedule: 'Saída do hotel entre 8h:30 a 9h:30',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '7',
    name: 'City Tour Maceió',
    destination: 'Maceió',
    price: 400,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/hero-beach-maceio-bNh8vzKaGEp69Wd4abQ3Jz.webp',
    description: 'Tour completo pela cidade de Maceió visitando os principais pontos turísticos, museus e monumentos históricos. Ideal para conhecer a cultura local.',
    duration: '8 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia especializado', 'Entrada em museus'],
    optionalActivities: [
      { id: 'f1', name: 'Almoço em restaurante típico', price: 80, description: '' },
    ],
    schedule: 'Saída do hotel entre 9h:00 a 10h:00',
    frequency: 'Segunda a sexta-feira',
    category: 'tour',
  },
  {
    id: '8',
    name: 'Dunas de Marapé',
    destination: 'Alagoas',
    price: 175,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
    description: 'Aventura nas dunas de Marapé com passeio de buggy, sandboard e vista panorâmica do litoral. Experiência inesquecível para os aventureiros.',
    duration: '8 horas',
    includes: ['Translado', 'Guia acompanhante', 'Equipamento de sandboard'],
    optionalActivities: [
      { id: 'g1', name: 'Passeio de quadriciclo', price: 150, description: '' },
      { id: 'g2', name: 'Almoço com vista das dunas', price: 60, description: '' },
    ],
    schedule: 'Saída do hotel entre 6h:30 a 7h:30',
    frequency: 'Terças, quintas-feiras e sábados',
    category: 'adventure',
  },
];

export const mockDestinations = [
  {
    id: '1',
    name: 'Praia do Gunga',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
  },
  {
    id: '2',
    name: 'Maragogi',
    price: 100,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
  },
  {
    id: '3',
    name: 'São Miguel dos Milagres',
    price: 80,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
  },
];
