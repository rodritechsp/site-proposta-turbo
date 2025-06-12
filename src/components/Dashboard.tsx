
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProposalData } from '@/types';
import { FileText, Plus, Eye, Share2, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [proposals, setProposals] = useState<ProposalData[]>([]);

  useEffect(() => {
    // Load proposals from localStorage
    const savedProposals = localStorage.getItem('proposals');
    if (savedProposals) {
      setProposals(JSON.parse(savedProposals));
    }
  }, []);

  const getStatusBadge = (status: ProposalData['status']) => {
    const statusConfig = {
      draft: { label: 'Rascunho', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' },
      sent: { label: 'Enviado', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'Aceito', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejeitado', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const stats = {
    total: proposals.length,
    draft: proposals.filter(p => p.status === 'draft').length,
    sent: proposals.filter(p => p.status === 'sent').length,
    accepted: proposals.filter(p => p.status === 'accepted').length,
    rejected: proposals.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Gerencie suas propostas comerciais</p>
        </div>
        <Link to="/create">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
            <Plus size={20} />
            <span>Nova Proposta</span>
          </Button>
        </Link>
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
              <p className="text-3xl font-bold text-gray-800">{stats.draft}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Enviados</p>
              <p className="text-3xl font-bold text-blue-800">{stats.sent}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Aceitos</p>
              <p className="text-3xl font-bold text-green-800">{stats.accepted}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Rejeitados</p>
              <p className="text-3xl font-bold text-red-800">{stats.rejected}</p>
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
            {proposals.map((proposal) => (
              <div key={proposal.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {proposal.clientName}
                      </h3>
                      {getStatusBadge(proposal.status)}
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>{getProjectTypeLabel(proposal.projectType)}</span>
                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(proposal.createdAt)}</span>
                      </span>
                      <span>{proposal.pages} página(s)</span>
                      <span>{proposal.budget}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {proposal.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-6">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Eye size={14} />
                      <span>Ver</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Share2 size={14} />
                      <span>Compartilhar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
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
    </div>
  );
};

export default Dashboard;
