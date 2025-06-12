
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BriefingForm from '@/components/BriefingForm';
import TemplateSelector from '@/components/TemplateSelector';
import ProposalPreview from '@/components/ProposalPreview';
import Layout from '@/components/Layout';
import { BriefingFormData, ProposalData } from '@/types';
import { toast } from '@/hooks/use-toast';

const CreateProposal = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'briefing' | 'template' | 'preview'>('briefing');
  const [briefingData, setBriefingData] = useState<BriefingFormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'elegant'>('modern');
  const [proposal, setProposal] = useState<ProposalData | null>(null);

  const handleBriefingSubmit = (data: BriefingFormData) => {
    setBriefingData(data);
    setStep('template');
  };

  const handleTemplateSelect = (template: 'modern' | 'elegant') => {
    setSelectedTemplate(template);
  };

  const handleTemplateContinue = () => {
    if (briefingData) {
      const newProposal: ProposalData = {
        id: Date.now().toString(),
        ...briefingData,
        status: 'draft',
        createdAt: new Date()
      };
      setProposal(newProposal);
      setStep('preview');
    }
  };

  const handleSaveProposal = () => {
    if (!proposal) return;

    // Save to localStorage
    const existingProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
    const updatedProposals = [...existingProposals, proposal];
    localStorage.setItem('proposals', JSON.stringify(updatedProposals));

    toast({
      title: "Proposta salva!",
      description: "Sua proposta foi salva no dashboard.",
    });

    navigate('/dashboard');
  };

  const handleExportPDF = () => {
    toast({
      title: "Exportando PDF...",
      description: "Sua proposta será baixada em instantes.",
    });
    // Here you would implement actual PDF export
  };

  const handleShareProposal = () => {
    const shareUrl = `${window.location.origin}/proposal/${proposal?.id}`;
    navigator.clipboard.writeText(shareUrl);
    
    toast({
      title: "Link copiado!",
      description: "O link da proposta foi copiado para a área de transferência.",
    });
  };

  if (step === 'briefing') {
    return (
      <Layout>
        <BriefingForm onSubmit={handleBriefingSubmit} />
      </Layout>
    );
  }

  if (step === 'template') {
    return (
      <Layout>
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
          onContinue={handleTemplateContinue}
        />
      </Layout>
    );
  }

  if (step === 'preview' && proposal) {
    return (
      <ProposalPreview
        proposal={proposal}
        template={selectedTemplate}
        onSave={handleSaveProposal}
        onExport={handleExportPDF}
        onShare={handleShareProposal}
      />
    );
  }

  return null;
};

export default CreateProposal;
