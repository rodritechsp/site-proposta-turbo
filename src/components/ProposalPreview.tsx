
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProposalData } from '@/types';
import { Download, Share2, Check, Calendar, DollarSign, Clock } from 'lucide-react';

interface ProposalPreviewProps {
  proposal: ProposalData;
  template: 'modern' | 'elegant';
  onSave: () => void;
  onExport: () => void;
  onShare: () => void;
}

const ProposalPreview = ({ proposal, template, onSave, onExport, onShare }: ProposalPreviewProps) => {
  const getProjectTypeLabel = (type: string) => {
    const types = {
      'landing': 'Landing Page',
      'institutional': 'Site Institucional',
      'ecommerce': 'E-commerce',
      'blog': 'Blog/Portal',
      'custom': 'Personalizado'
    };
    return types[type as keyof typeof types] || type;
  };

  const getBudgetRange = (budget: string) => {
    const ranges = {
      '1000-3000': 'R$ 2.500',
      '3000-6000': 'R$ 4.500',
      '6000-10000': 'R$ 8.000',
      '10000+': 'R$ 12.000'
    };
    return ranges[budget as keyof typeof ranges] || 'Sob consulta';
  };

  const ModernTemplate = () => (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Proposta Comercial</h1>
          <p className="text-blue-100 text-lg">Desenvolvimento de {getProjectTypeLabel(proposal.projectType)}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Investimento</p>
                <p className="font-semibold">{getBudgetRange(proposal.budget)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Prazo</p>
                <p className="font-semibold">{proposal.timeline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Páginas</p>
                <p className="font-semibold">{proposal.pages} página(s)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        {/* Cliente */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Informações do Cliente</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-lg font-semibold text-gray-800">{proposal.clientName}</p>
            <p className="text-gray-600">{proposal.clientEmail}</p>
          </div>
        </section>

        {/* Escopo */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Escopo do Projeto</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">{getProjectTypeLabel(proposal.projectType)}</h3>
            <p className="text-gray-700 mb-4">{proposal.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Número de Páginas</h4>
                <p className="text-gray-600">{proposal.pages} página(s)</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Prazo de Entrega</h4>
                <p className="text-gray-600">{proposal.timeline}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Funcionalidades */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Funcionalidades Incluídas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proposal.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Investimento */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Investimento</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800 mb-2">{getBudgetRange(proposal.budget)}</p>
              <p className="text-gray-600">Valor total do projeto</p>
              <p className="text-sm text-gray-500 mt-2">*Condições de pagamento a combinar</p>
            </div>
          </div>
        </section>

        {/* Próximos Passos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Próximos Passos</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
              <p className="text-gray-700">Aprovação da proposta pelo cliente</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
              <p className="text-gray-700">Assinatura do contrato e pagamento da entrada</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
              <p className="text-gray-700">Início do desenvolvimento conforme cronograma</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  const ElegantTemplate = () => (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="border-b-4 border-purple-600 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-light text-gray-800 mb-4">Proposta</h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">{getProjectTypeLabel(proposal.projectType)} para {proposal.clientName}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Resumo */}
        <section className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Investimento</h3>
              <p className="text-2xl font-bold text-purple-600">{getBudgetRange(proposal.budget)}</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Prazo</h3>
              <p className="text-2xl font-bold text-purple-600">{proposal.timeline}</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Páginas</h3>
              <p className="text-2xl font-bold text-purple-600">{proposal.pages}</p>
            </div>
          </div>
        </section>

        {/* Descrição */}
        <section>
          <h2 className="text-3xl font-light text-gray-800 mb-6 text-center">Sobre o Projeto</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed text-center">{proposal.description}</p>
          </div>
        </section>

        {/* Funcionalidades */}
        <section>
          <h2 className="text-3xl font-light text-gray-800 mb-6 text-center">O que está incluído</h2>
          <div className="space-y-4">
            {proposal.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border-l-4 border-purple-600 bg-purple-50">
                <Check className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-700 text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contato */}
        <section className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-light text-gray-800 mb-4">Pronto para começar?</h2>
          <p className="text-gray-600 mb-6">Entre em contato para aprovarmos esta proposta e iniciarmos seu projeto.</p>
          <div className="text-lg text-gray-700">
            <p className="font-semibold">{proposal.clientName}</p>
            <p>{proposal.clientEmail}</p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Action Bar */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Preview da Proposta - Template {template === 'modern' ? 'Moderno' : 'Elegante'}
          </h1>
          <div className="flex space-x-3">
            <Button onClick={onSave} variant="outline" className="flex items-center space-x-2">
              <span>Salvar</span>
            </Button>
            <Button onClick={onShare} variant="outline" className="flex items-center space-x-2">
              <Share2 size={16} />
              <span>Compartilhar</span>
            </Button>
            <Button onClick={onExport} className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
              <Download size={16} />
              <span>Exportar PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Proposal Content */}
      <div className="py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            {template === 'modern' ? <ModernTemplate /> : <ElegantTemplate />}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProposalPreview;
