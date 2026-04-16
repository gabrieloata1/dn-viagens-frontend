import { mockBlogPosts } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog D&N Viagens</h1>
          <p className="text-lg text-blue-100">
            Dicas, notícias e informações sobre turismo em Alagoas
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto py-12 px-4">
        {/* Featured Post */}
        {mockBlogPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Destaque</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="h-64 md:h-auto overflow-hidden">
                  <img
                    src={mockBlogPosts[0].image}
                    alt={mockBlogPosts[0].title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(mockBlogPosts[0].date).toLocaleDateString('pt-BR')}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {mockBlogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {mockBlogPosts[0].excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                  >
                    Ler mais <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Novidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBlogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('pt-BR')}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-sm"
                  >
                    Ler mais <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Quer conhecer mais sobre Alagoas?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Acompanhe nosso blog para dicas de viagem, informações sobre destinos e as melhores experiências turísticas em Alagoas.
          </p>
          <button
            onClick={() => window.open('https://wa.me/5582993342447', '_blank')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
}
