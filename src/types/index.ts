
export interface ProposalData {
  id: string;
  clientName: string;
  clientEmail: string;
  projectType: 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom';
  pages: number;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
  signedAt?: Date;
  signerName?: string;
}

export interface BriefingFormData {
  clientName: string;
  clientEmail: string;
  projectType: 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom';
  pages: number;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
}

export interface ProposalTemplate {
  id: 'modern' | 'elegant';
  name: string;
  description: string;
  preview: string;
}

export interface User {
  id: string;
  nome: string;
  email?: string;
  logo_url?: string;
  plano: 'free' | 'premium';
  criado_em: string;
}

export interface Proposta {
  id: string;
  user_id: string;
  titulo: string;
  tipo_site: 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom';
  funcionalidades: string[];
  valor_total: number;
  status: 'rascunho' | 'enviado' | 'aceito' | 'rejeitado';
  pdf_url?: string;
  criado_em: string;
  atualizado_em: string;
}
