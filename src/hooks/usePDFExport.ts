
import { jsPDF } from 'jspdf';
import { ProposalData } from '@/types';

export const usePDFExport = () => {
  const generatePDF = (proposal: ProposalData, template: 'modern' | 'elegant') => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let currentY = margin;

    // Função auxiliar para adicionar texto
    const addText = (text: string, x: number, y: number, fontSize = 12, style: 'normal' | 'bold' = 'normal') => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', style);
      doc.text(text, x, y);
    };

    // Função auxiliar para quebrar linha automaticamente
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Função para obter label do tipo de projeto
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

    // Função para obter faixa de orçamento
    const getBudgetRange = (budget: string) => {
      const ranges = {
        'R$ 1.000 - R$ 3.000': 'R$ 2.500',
        'R$ 3.000 - R$ 5.000': 'R$ 4.500',
        'R$ 5.000 - R$ 10.000': 'R$ 8.000',
        'R$ 10.000+': 'R$ 12.000'
      };
      return ranges[budget as keyof typeof ranges] || 'Sob consulta';
    };

    // Header
    if (template === 'modern') {
      // Cabeçalho moderno com gradiente simulado
      doc.setFillColor(59, 130, 246); // Blue-600
      doc.rect(0, 0, pageWidth, 60, 'F');
      
      addText('PROPOSTA COMERCIAL', margin, 25, 24, 'bold');
      doc.setTextColor(255, 255, 255);
      addText(`Desenvolvimento de ${getProjectTypeLabel(proposal.projectType)}`, margin, 40, 14);
      doc.setTextColor(0, 0, 0); // Reset to black
      
      currentY = 80;
    } else {
      // Cabeçalho elegante
      addText('PROPOSTA', pageWidth / 2, 30, 28, 'bold');
      doc.setLineWidth(2);
      doc.setDrawColor(147, 51, 234); // Purple-600
      doc.line(pageWidth / 2 - 20, 35, pageWidth / 2 + 20, 35);
      addText(`${getProjectTypeLabel(proposal.projectType)} para ${proposal.clientName}`, pageWidth / 2, 50, 16);
      
      currentY = 70;
    }

    // Informações do Cliente
    addText('INFORMAÇÕES DO CLIENTE', margin, currentY, 16, 'bold');
    currentY += 15;
    addText(`Nome: ${proposal.clientName}`, margin, currentY, 12);
    currentY += 10;
    addText(`E-mail: ${proposal.clientEmail}`, margin, currentY, 12);
    currentY += 20;

    // Resumo do Projeto
    addText('RESUMO DO PROJETO', margin, currentY, 16, 'bold');
    currentY += 15;
    addText(`Tipo: ${getProjectTypeLabel(proposal.projectType)}`, margin, currentY, 12);
    currentY += 10;
    addText(`Páginas: ${proposal.pages}`, margin, currentY, 12);
    currentY += 10;
    addText(`Prazo: ${proposal.timeline}`, margin, currentY, 12);
    currentY += 10;
    addText(`Investimento: ${getBudgetRange(proposal.budget)}`, margin, currentY, 12);
    currentY += 20;

    // Descrição
    addText('DESCRIÇÃO DO PROJETO', margin, currentY, 16, 'bold');
    currentY += 15;
    currentY = addWrappedText(proposal.description, margin, currentY, pageWidth - 2 * margin, 12);
    currentY += 15;

    // Funcionalidades
    addText('FUNCIONALIDADES INCLUÍDAS', margin, currentY, 16, 'bold');
    currentY += 15;

    proposal.features.forEach((feature, index) => {
      if (currentY > 250) { // Nova página se necessário
        doc.addPage();
        currentY = margin;
      }
      addText(`• ${feature}`, margin, currentY, 12);
      currentY += 8;
    });

    currentY += 10;

    // Investimento
    addText('INVESTIMENTO', margin, currentY, 16, 'bold');
    currentY += 15;
    addText(`Valor Total: ${getBudgetRange(proposal.budget)}`, margin, currentY, 14, 'bold');
    currentY += 10;
    addText('*Condições de pagamento a combinar', margin, currentY, 10);
    currentY += 20;

    // Próximos Passos
    addText('PRÓXIMOS PASSOS', margin, currentY, 16, 'bold');
    currentY += 15;
    
    const steps = [
      '1. Aprovação da proposta pelo cliente',
      '2. Assinatura do contrato e pagamento da entrada',
      '3. Início do desenvolvimento conforme cronograma'
    ];

    steps.forEach(step => {
      if (currentY > 270) {
        doc.addPage();
        currentY = margin;
      }
      addText(step, margin, currentY, 12);
      currentY += 10;
    });

    // Rodapé
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addText(`Página ${i} de ${pageCount}`, pageWidth - 40, doc.internal.pageSize.height - 10, 10);
      addText(`Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, doc.internal.pageSize.height - 10, 10);
    }

    // Salvar o PDF
    const fileName = `proposta-${proposal.clientName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`;
    doc.save(fileName);
  };

  return { generatePDF };
};
