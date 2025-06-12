
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ProposalData } from '@/types';
import { CheckCircle, FileText, Calendar } from 'lucide-react';

interface ProposalSignatureProps {
  proposal: ProposalData;
  onSign: (signerName: string) => void;
}

const ProposalSignature = ({ proposal, onSign }: ProposalSignatureProps) => {
  const [signerName, setSignerName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleSign = async () => {
    if (!signerName.trim() || !agreed) return;
    
    setIsSigning(true);
    // Simulate signing process
    setTimeout(() => {
      onSign(signerName);
      setIsSigning(false);
    }, 1500);
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

  const getBudgetRange = (budget: string) => {
    const ranges = {
      '1000-3000': 'R$ 2.500',
      '3000-6000': 'R$ 4.500',
      '6000-10000': 'R$ 8.000',
      '10000+': 'R$ 12.000'
    };
    return ranges[budget as keyof typeof ranges] || 'Sob consulta';
  };

  if (proposal.status === 'accepted' && proposal.signedAt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Proposta Aceita!</h1>
          <p className="text-gray-600 mb-6">
            Esta proposta foi aceita por <strong>{proposal.signerName}</strong> em{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }).format(new Date(proposal.signedAt))}
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-medium">
              Obrigado por aceitar nossa proposta! Entraremos em contato em breve para dar início ao projeto.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Proposal Summary */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Revisão da Proposta</h1>
            <p className="text-blue-100">Revise os detalhes antes de aceitar</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cliente</h3>
                <p className="text-gray-600">{proposal.clientName}</p>
                <p className="text-gray-500 text-sm">{proposal.clientEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Tipo de Projeto</h3>
                <p className="text-gray-600">{getProjectTypeLabel(proposal.projectType)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">Páginas</p>
                  <p className="font-semibold text-blue-800">{proposal.pages}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">Prazo</p>
                  <p className="font-semibold text-green-800">{proposal.timeline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-600 font-medium">Investimento</p>
                  <p className="font-semibold text-purple-800">{getBudgetRange(proposal.budget)}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Funcionalidades Incluídas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {proposal.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Descrição do Projeto</h3>
              <p className="text-gray-600">{proposal.description}</p>
            </div>
          </div>
        </Card>

        {/* Signature Section */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Aceite da Proposta</h2>
            <p className="text-gray-600">
              Para aceitar esta proposta, preencha os dados abaixo e confirme seu aceite
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <Label htmlFor="signerName">Nome Completo</Label>
              <Input
                id="signerName"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="agreement" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                  Eu, ao marcar esta opção, declaro que li, compreendi e aceito todos os termos e condições 
                  desta proposta comercial. Confirmo que as informações fornecidas são verdadeiras e autorizo 
                  o início dos trabalhos conforme especificado.
                </Label>
              </div>
            </div>

            <Button
              onClick={handleSign}
              disabled={!signerName.trim() || !agreed || isSigning}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:hover:shadow-none"
            >
              {isSigning ? 'Processando...' : 'Aceitar Proposta'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Ao aceitar, você concorda com os termos da proposta. 
              Data e hora do aceite serão registradas automaticamente.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProposalSignature;
