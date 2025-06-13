
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
  clientLogo?: string;
  customColors?: {
    primary: string;
    secondary: string;
  };
}

export interface BriefingFormData {
  clientName: string;
  clientEmail: string;
  projectType: 'landing' | 'institutional' | 'ecommerce' | 'blog' | 'custom' | '';
  pages: number;
  features: string[];
  budget: string;
  timeline: string;
  description: string;
  clientLogo?: string;
  customColors?: {
    primary: string;
    secondary: string;
  };
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
  plano: string;
  criado_em: string;
}

export interface Proposta {
  id: string;
  user_id: string;
  titulo: string;
  tipo_site: string;
  funcionalidades: string[];
  valor_total: number;
  status: string;
  pdf_url?: string;
  logo_cliente_url?: string;
  cores_personalizadas?: {
    primaria: string;
    secundaria: string;
  };
  criado_em: string;
  atualizado_em: string;
}

export interface CompanySettings {
  id?: string;
  user_id: string;
  nome_empresa?: string;
  logo_url?: string;
  cor_primaria?: string;
  cor_secundaria?: string;
  endereco?: string;
  telefone?: string;
  email_empresa?: string;
  created_at?: string;
  updated_at?: string;
}
