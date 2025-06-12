
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Zap, Share2, Download, CheckCircle, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">ProposalGen</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">
                    Entrar
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Começar Grátis
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Gere propostas profissionais em{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            segundos
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Crie propostas comerciais impressionantes para criação de sites com templates personalizáveis, 
          assinatura digital e compartilhamento instantâneo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <Link to="/create">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Criar Nova Proposta
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
                <Zap className="mr-2 h-5 w-5" />
                Começar Agora - Grátis
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Tudo que você precisa para impressionar seus clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Geração Automática</h3>
            <p className="text-gray-600">
              Preencha um briefing simples e gere propostas profissionais automaticamente com preços e cronogramas.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Templates Elegantes</h3>
            <p className="text-gray-600">
              2 modelos visuais profissionais que você pode personalizar com sua marca e cores.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <Share2 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Compartilhamento Fácil</h3>
            <p className="text-gray-600">
              Envie por link ou baixe em PDF. Seus clientes podem assinar digitalmente com um clique.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Assinatura Digital</h3>
            <p className="text-gray-600">
              Sistema simples de aceite com nome, data e confirmação para validação das propostas.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
              <Download className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Dashboard Completo</h3>
            <p className="text-gray-600">
              Gerencie todas suas propostas em um só lugar com status de acompanhamento em tempo real.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ideal para Freelancers</h3>
            <p className="text-gray-600">
              Perfeito para freelancers e agências que querem economizar tempo e aumentar conversões.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para impressionar seus clientes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece a criar propostas profissionais hoje mesmo. É grátis para começar!
          </p>
          {user ? (
            <Link to="/create">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Criar Primeira Proposta
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Começar Agora - É Grátis
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ProposalGen</span>
          </div>
          <p className="text-gray-400">
            © 2024 ProposalGen. Feito para freelancers e agências que valorizam seu tempo.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
