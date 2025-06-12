
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Share2, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Users,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-blue-600" />,
      title: "Briefing Inteligente",
      description: "Formulário adaptável que coleta todas as informações necessárias para gerar propostas precisas e personalizadas."
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Geração Automática",
      description: "Crie propostas profissionais automaticamente com base nas respostas do briefing, incluindo valores e prazos."
    },
    {
      icon: <Download className="h-8 w-8 text-green-600" />,
      title: "Export em PDF",
      description: "Exporte suas propostas em PDF com design profissional para envio por email ou impressão."
    },
    {
      icon: <Share2 className="h-8 w-8 text-blue-600" />,
      title: "Compartilhamento",
      description: "Gere links únicos para compartilhar propostas online com assinatura digital integrada."
    },
    {
      icon: <Clock className="h-8 w-8 text-orange-600" />,
      title: "Histórico Completo",
      description: "Acompanhe todas as suas propostas com status detalhado: rascunho, enviado, aceito ou rejeitado."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Assinatura Digital",
      description: "Sistema simples de aceite com nome, data e hora registrados automaticamente."
    }
  ];

  const stats = [
    { icon: <Zap className="h-6 w-6" />, value: "90%", label: "Menos tempo criando propostas" },
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Freelancers usando" },
    { icon: <TrendingUp className="h-6 w-6" />, value: "2x", label: "Mais conversões" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Geração automática de propostas</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Crie propostas{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                incríveis
              </span>{' '}
              em minutos
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automatize a criação de propostas comerciais para sites com templates profissionais, 
              briefing inteligente e assinatura digital. Perfeito para freelancers e agências.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
                <span>Criar Primeira Proposta</span>
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200">
                Ver Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-gray-700">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Tudo que você precisa para{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                impressionar clientes
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Funcionalidades pensadas para economizar seu tempo e aumentar sua taxa de conversão
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para criar propostas que convertem?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de freelancers e agências que já usam o ProposalCraft 
              para criar propostas profissionais e fechar mais negócios.
            </p>
            <Link to="/create">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                Começar Agora - É Grátis
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
