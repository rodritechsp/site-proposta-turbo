
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BriefingForm from '@/components/BriefingForm';
import TemplateSelector from '@/components/TemplateSelector';
import ProposalPreview from '@/components/ProposalPreview';
import Layout from '@/components/Layout';
import { BriefingFormData, ProposalData } from '@/types';
import { useProposals } from '@/hooks/useProposals';
import { toast } from '@/hooks/use-toast';

const CreateProposal = () => {
  const navigate = useNavigate();
  const { createProposal } = useProposals();
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
        clientName: briefingData.clientName,
        clientEmail: briefingData.clientEmail,
        projectType: briefingData.projectType,
        pages: briefingData.pages,
        features: briefingData.features,
        budget: briefingData.budget,
        timeline: briefingData.timeline,
        description: briefingData.description,
        status: 'draft',
        createdAt: new Date()
      };
      setProposal(newProposal);
      setStep('preview');
    }
  };

  const handleSaveProposal = async () => {
    if (!proposal || !briefingData) return;

    // Calcular valor baseado no orçamento selecionado
    const valorMap: { [key: string]: number } = {
      'R$ 1.000 - R$ 3.000': 2000,
      'R$ 3.000 - R$ 5.000': 4000,
      'R$ 5.000 - R$ 10.000': 7500,
      'R$ 10.000+': 12000
    };

    const proposalData = {
      titulo: `Proposta para ${briefingData.clientName}`,
      tipo_site: briefingData.projectType,
      funcionalidades: briefingData.features,
      valor_total: valorMap[briefingData.budget] || 5000,
      status: 'rascunho' as const,
    };

    const savedProposal = await createProposal(proposalData);
    
    if (savedProposal) {
      navigate('/dashboard');
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Em desenvolvimento",
      description: "A funcionalidade de exportar PDF será implementada em breve.",
    });
  };

  const handleShareProposal = () => {
    toast({
      title: "Em desenvolvimento",
      description: "A funcionalidade de compartilhamento será implementada em breve.",
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
