
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BriefingForm from '@/components/BriefingForm';
import TemplateSelector from '@/components/TemplateSelector';
import ProposalPreview from '@/components/ProposalPreview';
import Layout from '@/components/Layout';
import { BriefingFormData, ProposalData } from '@/types';
import { useProposals } from '@/hooks/useProposals';
import { toast } from '@/hooks/use-toast';

const EditProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { proposals, updateProposal } = useProposals();
  const [step, setStep] = useState<'briefing' | 'template' | 'preview'>('briefing');
  const [briefingData, setBriefingData] = useState<BriefingFormData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'elegant'>('modern');
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && proposals.length > 0) {
      const existingProposal = proposals.find(p => p.id === id);
      
      if (existingProposal) {
        // Convert database proposal to form data
        const formData: BriefingFormData = {
          clientName: existingProposal.titulo.replace('Proposta para ', ''),
          clientEmail: 'cliente@exemplo.com', // Placeholder
          projectType: existingProposal.tipo_site as 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom',
          pages: 5, // Placeholder
          features: existingProposal.funcionalidades || [],
          budget: 'R$ 5.000 - R$ 10.000', // Placeholder baseado no valor
          timeline: '30 dias', // Placeholder
          description: `Desenvolvimento de ${existingProposal.tipo_site} com as funcionalidades solicitadas.`,
        };
        
        setBriefingData(formData);
        setLoading(false);
      } else {
        toast({
          title: "Proposta não encontrada",
          description: "A proposta que você está tentando editar não foi encontrada.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    }
  }, [id, proposals, navigate]);

  const handleBriefingSubmit = (data: BriefingFormData) => {
    setBriefingData(data);
    setStep('template');
  };

  const handleTemplateSelect = (template: 'modern' | 'elegant') => {
    setSelectedTemplate(template);
  };

  const handleTemplateContinue = () => {
    if (briefingData && briefingData.projectType !== '') {
      const newProposal: ProposalData = {
        id: id || '',
        clientName: briefingData.clientName,
        clientEmail: briefingData.clientEmail,
        projectType: briefingData.projectType as 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom',
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
    if (!proposal || !briefingData || !id) return;

    const valorMap: { [key: string]: number } = {
      'R$ 1.000 - R$ 3.000': 2000,
      'R$ 3.000 - R$ 5.000': 4000,
      'R$ 5.000 - R$ 10.000': 7500,
      'R$ 10.000+': 12000
    };

    const updates = {
      titulo: `Proposta para ${briefingData.clientName}`,
      tipo_site: briefingData.projectType,
      funcionalidades: briefingData.features,
      valor_total: valorMap[briefingData.budget] || 5000,
    };

    const updatedProposal = await updateProposal(id, updates);
    
    if (updatedProposal) {
      toast({
        title: "Proposta atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando proposta...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (step === 'briefing') {
    return (
      <Layout>
        <BriefingForm onSubmit={handleBriefingSubmit} initialData={briefingData} />
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

export default EditProposal;
