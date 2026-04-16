# Design Concepts - D&N VIAGENS

## Conceito Escolhido: Tropical Modern

### Design Movement
**Tropical Modern** - Fusão entre modernismo limpo com elementos naturais e cores vibrantes do litoral nordestino. Inspirado em resorts de luxo e agências de turismo premium.

### Core Principles
1. **Elegância Acessível**: Design sofisticado mas não intimidador; fácil navegação
2. **Autenticidade Tropical**: Cores e elementos que remetem ao nordeste (turquesa, corais, areia)
3. **Hierarquia Clara**: Informações organizadas de forma intuitiva, com CTAs bem definidas
4. **Performance Visual**: Imagens de alta qualidade como protagonistas, não decoração

### Color Philosophy
- **Primary**: Turquesa vibrante (#0891B2) - representa o mar, confiança e energia
- **Secondary**: Coral/Laranja (#F97316) - caloroso, acessível, convida ação
- **Accent**: Ouro suave (#D97706) - luxo e sofisticação
- **Neutros**: Branco limpo, cinza claro para backgrounds, preto profundo para textos
- **Intenção**: Transmitir paraíso tropical, segurança, diversão e profissionalismo

### Layout Paradigm
- **Hero Section**: Imagem full-width com overlay gradiente, CTA destacado
- **Grid Assimétrico**: Pacotes em grid 3-colunas (desktop), com cards de diferentes tamanhos
- **Seções Alternadas**: Conteúdo + imagem alternando lado, criando ritmo visual
- **Sticky Header**: Navegação sempre acessível, com logo e carrinho flutuante
- **Divisores Orgânicos**: SVG waves entre seções para fluidez

### Signature Elements
1. **Wave Dividers**: Divisores ondulados entre seções (SVG)
2. **Destination Cards**: Cards com imagem, preço destacado em coral, badge de categoria
3. **Floating Action Button**: Carrinho e WhatsApp flutuantes no canto inferior direito
4. **Gradient Overlays**: Gradientes suaves sobre imagens para legibilidade

### Interaction Philosophy
- **Smooth Transitions**: Hover effects sutis em cards (elevação, escala leve)
- **Loading States**: Animações de carregamento com tema tropical
- **Feedback Imediato**: Toast notifications para ações (adicionar ao carrinho, etc)
- **Micro-interactions**: Botões respondem ao hover com cor e movimento

### Animation
- **Entrance**: Fade-in + slide-up suave para cards (300ms)
- **Hover**: Scale 1.02 + shadow elevation em cards
- **CTA Buttons**: Pulse sutil no hover, transição de cor suave
- **Page Transitions**: Fade entre rotas (200ms)
- **Scroll Reveals**: Elementos aparecem conforme scroll (fade-in)

### Typography System
- **Display**: Poppins Bold 700 (títulos principais, h1)
- **Heading**: Poppins SemiBold 600 (h2, h3, seções)
- **Body**: Inter Regular 400 (textos, descrições)
- **Accent**: Poppins Medium 500 (CTAs, labels)
- **Hierarchy**: 
  - H1: 48px (desktop), 32px (mobile)
  - H2: 36px (desktop), 24px (mobile)
  - Body: 16px (desktop), 14px (mobile)
  - Small: 14px (desktop), 12px (mobile)

---

## Implementação
Este design será implementado através de:
- Tailwind CSS com tema customizado (cores tropical)
- Componentes shadcn/ui adaptados ao tema
- Imagens de alta qualidade (geradas e stock)
- Animações com Framer Motion
- SVG dividers customizados
