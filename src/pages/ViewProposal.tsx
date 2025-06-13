
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Share2, Download, Edit, Calendar, DollarSign, Clock, Check } from 'lucide-react';
import { useProposals } from '@/hooks/useProposals';
import { usePDFExport } from '@/hooks/usePDFExport';
import { toast } from '@/hooks/use-toast';
import { Proposta, ProposalData } from '@/types';
import { Link } from 'react-router-dom';

const ViewProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proposals } = useProposals();
  const { generatePDF } = usePDFExport();
  const [proposal, setProposal] = useState<Proposta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && proposals.length > 0) {
      const foundProposal = proposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
      } else {
        toast({
          title: "Proposta não encontrada",
          description: "A proposta que você está procurando não foi encontrada.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
      setLoading(false);
    }
  }, [id, proposals, navigate]);

  const handleExportPDF = () => {
    if (!proposal) return;

    try {
      const proposalData: ProposalData = {
        id: proposal.id,
        clientName: proposal.titulo.replace('Proposta para ', ''),
        clientEmail: 'cliente@exemplo.com',
        projectType: proposal.tipo_site as 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom',
        pages: 5,
        features: proposal.funcionalidades || [],
        budget: 'R$ 5.000 - R$ 10.000',
        timeline: '30 dias',
        description: `Desenvolvimento de ${getProjectTypeLabel(proposal.tipo_site)} com as funcionalidades solicitadas.`,
        status: proposal.status as 'draft' | 'sent' | 'accepted' | 'rejected',
        createdAt: new Date(proposal.criado_em),
      };

      generatePDF(proposalData, 'modern');
      
      toast({
        title: "PDF exportado com sucesso!",
        description: "O arquivo PDF foi baixado para seu dispositivo.",
      });
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      toast({
        title: "Erro ao exportar PDF",
        description: "Não foi possível gerar o arquivo PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Em desenvolvimento",
      description: "A funcionalidade de compartilhamento será implementada em breve.",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      rascunho: { label: 'Rascunho', color: 'bg-gray-100 text-gray-800' },
      enviado: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
      aceito: { label: 'Aceito', color: 'bg-green-100 text-green-800' },
      rejeitado: { label: 'Rejeitado', color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.rascunho;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

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

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const getBudgetRange = (value: number) => {
    if (value <= 3000) return 'R$ 1.000 - R$ 3.000';
    if (value <= 5000) return 'R$ 3.000 - R$ 5.000';
    if (value <= 10000) return 'R$ 5.000 - R$ 10.000';
    return 'R$ 10.000+';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando proposta...</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Proposta não encontrada</h1>
          <p className="text-gray-600 mb-6">A proposta que você está procurando não existe.</p>
          <Link to="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ArrowLeft size={16} />
                <span>Voltar</span>
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{proposal.titulo}</h1>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(proposal.status)}
                <span className="text-sm text-gray-500">
                  Criado em {formatDate(proposal.criado_em)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link to={`/edit/${proposal.id}`}>
              <Button variant="outline" className="flex items-center space-x-2">
                <Edit size={16} />
                <span>Editar</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleShare}
              className="flex items-center space-x-2"
            >
              <Share2 size={16} />
              <span>Compartilhar</span>
            </Button>
            <Button 
              onClick={handleExportPDF}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Exportar PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-8">
        <Card className="overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <h1 className="text-4xl font-bold mb-2">Proposta Comercial</h1>
            <p className="text-blue-100 text-lg">
              Desenvolvimento de {getProjectTypeLabel(proposal.tipo_site)}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6" />
                <div>
                  <p className="text-sm text-blue-100">Investimento</p>
                  <p className="font-semibold">
                    R$ {proposal.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6" />
                <div>
                  <p className="text-sm text-blue-100">Prazo</p>
                  <p className="font-semibold">30 dias</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6" />
                <div>
                  <p className="text-sm text-blue-100">Tipo</p>
                  <p className="font-semibold">{getProjectTypeLabel(proposal.tipo_site)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Escopo do Projeto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Escopo do Projeto</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-3">
                  {getProjectTypeLabel(proposal.tipo_site)}
                </h3>
                <p className="text-gray-700 mb-4">
                  Desenvolvimento de {getProjectTypeLabel(proposal.tipo_site)} com as funcionalidades solicitadas, 
                  seguindo as melhores práticas de desenvolvimento web e design responsivo.
                </p>
              </div>
            </section>

            {/* Funcionalidades */}
            {proposal.funcionalidades && proposal.funcionalidades.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Funcionalidades Incluídas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {proposal.funcionalidades.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Investimento */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Investimento</h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-800 mb-2">
                    R$ {proposal.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-gray-600">Valor total do projeto</p>
                  <p className="text-sm text-gray-500 mt-2">*Condições de pagamento a combinar</p>
                </div>
              </div>
            </section>

            {/* Detalhes */}
            <section className="border-t pt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalhes da Proposta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Data de Criação</h3>
                  <p className="text-gray-600">{formatDate(proposal.criado_em)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Última Atualização</h3>
                  <p className="text-gray-600">{formatDate(proposal.atualizado_em)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                  {getStatusBadge(proposal.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">ID da Proposta</h3>
                  <p className="text-gray-600 font-mono text-sm">{proposal.id}</p>
                </div>
              </div>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ViewProposal;
