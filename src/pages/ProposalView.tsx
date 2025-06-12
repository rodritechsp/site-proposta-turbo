
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProposalSignature from '@/components/ProposalSignature';
import { ProposalData } from '@/types';
import { toast } from '@/hooks/use-toast';

const ProposalView = () => {
  const { id } = useParams();
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load proposal from localStorage
    const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const foundProposal = proposals.find((p: ProposalData) => p.id === id);
    
    if (foundProposal) {
      setProposal(foundProposal);
    }
    setLoading(false);
  }, [id]);

  const handleSign = (signerName: string) => {
    if (!proposal) return;

    const updatedProposal: ProposalData = {
      ...proposal,
      status: 'accepted',
      signedAt: new Date(),
      signerName
    };

    // Update localStorage
    const proposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const updatedProposals = proposals.map((p: ProposalData) => 
      p.id === proposal.id ? updatedProposal : p
    );
    localStorage.setItem('proposals', JSON.stringify(updatedProposals));

    setProposal(updatedProposal);

    toast({
      title: "Proposta aceita!",
      description: "Obrigado por aceitar nossa proposta. Entraremos em contato em breve!",
    });
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
          <p className="text-gray-600">A proposta que você está procurando não existe ou foi removida.</p>
        </div>
      </div>
    );
  }

  return <ProposalSignature proposal={proposal} onSign={handleSign} />;
};

export default ProposalView;
