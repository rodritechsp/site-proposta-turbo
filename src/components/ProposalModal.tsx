
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText } from 'lucide-react';
import { Proposta } from '@/types';

interface ProposalModalProps {
  proposta: Proposta | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProposalModal = ({ proposta, isOpen, onClose }: ProposalModalProps) => {
  if (!proposta) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{proposta.titulo}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status e Data */}
          <div className="flex items-center justify-between">
            {getStatusBadge(proposta.status)}
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Calendar size={14} />
              <span>{formatDate(proposta.criado_em)}</span>
            </div>
          </div>

          {/* Informações do Projeto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Tipo de Projeto</h3>
              <p className="text-gray-600">{getProjectTypeLabel(proposta.tipo_site)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Valor Total</h3>
              <p className="text-gray-600 font-medium">
                R$ {proposta.valor_total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Funcionalidades */}
          {proposta.funcionalidades && proposta.funcionalidades.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Funcionalidades Incluídas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {proposta.funcionalidades.map((func: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 text-sm">{func}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detalhes Adicionais */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Criado em:</span>
                <p className="text-gray-600">{formatDate(proposta.criado_em)}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Última atualização:</span>
                <p className="text-gray-600">{formatDate(proposta.atualizado_em)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalModal;
