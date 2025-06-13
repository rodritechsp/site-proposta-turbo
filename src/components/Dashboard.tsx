import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProposals } from '@/hooks/useProposals';
import { useAuth } from '@/contexts/AuthContext';
import { usePDFExport } from '@/hooks/usePDFExport';
import { FileText, Plus, Eye, Share2, Download, Calendar, LogOut, Settings, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ProposalData, Proposta } from '@/types';
import ProposalModal from './ProposalModal';
import ShareModal from './ShareModal';

const Dashboard = () => {
  const { proposals, loading } = useProposals();
  const { signOut, userProfile } = useAuth();
  const { generatePDF } = usePDFExport();
  
  const [selectedProposal, setSelectedProposal] = useState<Proposta | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleViewProposal = (proposta: Proposta) => {
    setSelectedProposal(proposta);
    setIsViewModalOpen(true);
  };

  const handleShareProposal = (proposta: Proposta) => {
    setSelectedProposal(proposta);
    setIsShareModalOpen(true);
  };

  const handleExportPDF = (proposta: Proposta) => {
    try {
      // Converter dados do Supabase para o formato ProposalData
      const proposalData: ProposalData = {
        id: proposta.id,
        clientName: proposta.titulo.replace('Proposta para ', ''),
        clientEmail: 'cliente@exemplo.com', // Placeholder
        projectType: proposta.tipo_site as 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom',
        pages: 5, // Placeholder
        features: proposta.funcionalidades || [],
        budget: 'R$ 5.000 - R$ 10.000', // Placeholder baseado no valor
        timeline: '30 dias', // Placeholder
        description: `Desenvolvimento de ${getProjectTypeLabel(proposta.tipo_site)} com as funcionalidades solicitadas.`,
        status: proposta.status as 'draft' | 'sent' | 'accepted' | 'rejected',
        createdAt: new Date(proposta.criado_em),
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
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const stats = {
    total: proposals.length,
    rascunho: proposals.filter(p => p.status === 'rascunho').length,
    enviado: proposals.filter(p => p.status === 'enviado').length,
    aceito: proposals.filter(p => p.status === 'aceito').length,
    rejeitado: proposals.filter(p => p.status === 'rejeitado').length
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando suas propostas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Olá, {userProfile?.nome || 'Usuário'}! Gerencie suas propostas comerciais
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/configuracoes">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Settings size={16} />
              <span>Configurações</span>
            </Button>
          </Link>
          <Link to="/create">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
              <Plus size={20} />
              <span>Nova Proposta</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={signOut}
            className="flex items-center space-x-2"
          >
            <LogOut size={16} />
            <span>Sair</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-blue-800">{stats.total}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rascunhos</p>
              <p className="text-3xl font-bold text-gray-800">{stats.rascunho}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Enviados</p>
              <p className="text-3xl font-bold text-blue-800">{stats.enviado}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Aceitos</p>
              <p className="text-3xl font-bold text-green-800">{stats.aceito}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Rejeitados</p>
              <p className="text-3xl font-bold text-red-800">{stats.rejeitado}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Proposals List */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Suas Propostas</h2>
        </div>
        
        {proposals.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">Nenhuma proposta criada ainda</h3>
            <p className="text-gray-400 mb-6">Crie sua primeira proposta para começar a gerenciar seus projetos</p>
            <Link to="/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Criar Primeira Proposta
              </Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {proposals.map((proposta) => (
              <div key={proposta.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {proposta.titulo}
                      </h3>
                      {getStatusBadge(proposta.status)}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>{getProjectTypeLabel(proposta.tipo_site)}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(proposta.criado_em)}</span>
                      </span>
                      <span>R$ {proposta.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {(proposta.funcionalidades || []).slice(0, 3).map((func: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {func}
                        </Badge>
                      ))}
                      {(proposta.funcionalidades || []).length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{(proposta.funcionalidades || []).length - 3} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <Link to={`/edit/${proposta.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center space-x-1"
                      >
                        <Edit size={14} />
                        <span>Editar</span>
                      </Button>
                    </Link>
                    <Link to={`/view/${proposta.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center space-x-1"
                      >
                        <Eye size={14} />
                        <span>Visualizar</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-1"
                      onClick={() => handleShareProposal(proposta)}
                    >
                      <Share2 size={14} />
                      <span>Compartilhar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-1"
                      onClick={() => handleExportPDF(proposta)}
                    >
                      <Download size={14} />
                      <span>PDF</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modals */}
      <ProposalModal
        proposta={selectedProposal}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
      
      <ShareModal
        proposta={selectedProposal}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
