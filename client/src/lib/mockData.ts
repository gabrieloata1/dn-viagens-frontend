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
  {
    id: '9',
    name: 'Praia de Paripueira',
    destination: 'Maceió',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
    description: 'Praia de Paripueira é conhecida por suas águas cristalinas e estrutura completa de barracas. Perfeita para um dia relaxante à beira-mar.',
    duration: '6 horas',
    includes: ['Translado (transporte rodoviário)', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'h1', name: 'Passeio de jangada', price: 50, description: '' },
    ],
    schedule: 'Saída do hotel entre 8h:00 a 9h:00',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '10',
    name: 'Delta do São Francisco',
    destination: 'Alagoas',
    price: 195,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    description: 'Passeio pelo Delta do São Francisco com barco, visitando ilhas e observando a fauna local. Experiência única em contato com a natureza.',
    duration: '10 horas',
    includes: ['Translado', 'Passeio de barco', 'Guia especializado', 'Almoço'],
    optionalActivities: [
      { id: 'i1', name: 'Passeio de caiaque', price: 80, description: '' },
    ],
    schedule: 'Saída do hotel entre 6h:00 a 7h:00',
    frequency: 'Quarta-feira e sábado',
    category: 'adventure',
  },
  {
    id: '11',
    name: 'Capitão Nikolas',
    destination: 'Maceió',
    price: 55,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
    description: 'Passeio de barco com parada para banho e mergulho em águas cristalinas. Ideal para quem quer relaxar e aproveitar o mar.',
    duration: '5 horas',
    includes: ['Translado', 'Passeio de barco', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'j1', name: 'Almoço a bordo', price: 70, description: '' },
    ],
    schedule: 'Saída do hotel entre 9h:00 a 10h:00',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '12',
    name: 'Piscinas Naturais da Pajuçara',
    destination: 'Maceió',
    price: 60,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
    description: 'Passeio de jangada para as piscinas naturais da Pajuçara. Ideal para snorkel e observação de peixes coloridos.',
    duration: '4 horas',
    includes: ['Translado', 'Passeio de jangada', 'Guia acompanhante'],
    optionalActivities: [
      { id: 'k1', name: 'Equipamento de snorkel', price: 30, description: '' },
    ],
    schedule: 'Saída do hotel entre 7h:00 a 8h:00',
    frequency: 'Todos os dias de acordo com a tábua da maré',
    category: 'beach',
  },
  {
    id: '13',
    name: 'Porto de Galinhas - PE',
    destination: 'Pernambuco',
    price: 175,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    description: 'Passeio para Porto de Galinhas, um dos destinos mais bonitos de Pernambuco. Piscinas naturais, recifes de coral e estrutura turística completa.',
    duration: '12 horas',
    includes: ['Translado', 'Guia acompanhante', 'Passeio de barco'],
    optionalActivities: [
      { id: 'l1', name: 'Almoço em restaurante local', price: 100, description: '' },
    ],
    schedule: 'Saída do hotel entre 6h:00 a 7h:00',
    frequency: 'Terças, quintas-feiras e sábados',
    category: 'beach',
  },
  {
    id: '14',
    name: 'Transfer Hotel-Aeroporto',
    destination: 'Maceió',
    price: 150,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/transfer-service-VusiAZkjB7BUAVGkckQFsz.png',
    description: 'Serviço de transfer do seu hotel até o Aeroporto Internacional de Maceió. Confortável e pontual.',
    duration: '30 minutos',
    includes: ['Transporte rodoviário', 'Motorista profissional', 'Veículo ar-condicionado'],
    optionalActivities: [],
    schedule: 'Sob demanda',
    frequency: 'Todos os dias',
    category: 'transfer',
  },
  {
    id: '15',
    name: 'Angra de Ipioca - Hibiscus Beach Club',
    destination: 'Maceió',
    price: 45,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    description: 'Passeio para Angra de Ipioca com acesso ao Hibiscus Beach Club. Infraestrutura completa com restaurante, bar e atividades aquáticas.',
    duration: '7 horas',
    includes: ['Translado', 'Guia acompanhante', 'Acesso ao beach club'],
    optionalActivities: [
      { id: 'm1', name: 'Almoço no beach club', price: 80, description: '' },
    ],
    schedule: 'Saída do hotel entre 8h:30 a 9h:30',
    frequency: 'Todos os dias',
    category: 'beach',
  },
  {
    id: '16',
    name: 'Passeio das 9 Ilhas',
    destination: 'Alagoas',
    price: 120,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
    description: 'Passeio de barco visitando 9 ilhas diferentes com paradas para banho e mergulho. Experiência completa do litoral alagoano.',
    duration: '8 horas',
    includes: ['Translado', 'Passeio de barco', 'Guia especializado', 'Almoço'],
    optionalActivities: [
      { id: 'n1', name: 'Bebidas durante o passeio', price: 40, description: '' },
    ],
    schedule: 'Saída do hotel entre 7h:00 a 8h:00',
    frequency: 'Todos os dias',
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

export const mockBlogPosts = [
  {
    id: '1',
    title: 'Lista de Hotéis e Pousadas em Maceió – Alagoas',
    excerpt: 'Preparamos uma lista que contém hotéis e pousadas em Maceió - Alagoas. Identificamos o nome do hotel ou pousada e o número de contato de todos.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-gunga-FDYZkssDmg8p68Tiv2obhW.webp',
    date: '2024-04-10',
  },
  {
    id: '2',
    title: 'Conheça 2 Resorts ALL Inclusive em Maragogi',
    excerpt: 'Os resorts all inclusive em Maragogi são uma excelente opção de hospedagem quando pensamos em momentos de lazer e conforto nesse paraíso conhecido como Caribe Brasileiro.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-maragogi-32Tk8FnhRdF3PzXznXFJ8t.webp',
    date: '2024-04-08',
  },
  {
    id: '3',
    title: 'Piscinas Naturais da Pajuçara fica em Maceió, você já visitou?',
    excerpt: 'As piscinas naturais da Pajuçara estão localizadas em Maceió, o embarque do passeio para as piscinas é no bairro da Pajuçara, e o passeio é um dos mais tradicionais da região.',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663323524421/bd6hACGgwGzZuEayhcrAki/destination-sao-miguel-joo6kCCqeNQnVHH7MnQ8Um.webp',
    date: '2024-04-05',
  },
];
