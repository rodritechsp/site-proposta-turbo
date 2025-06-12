
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
  projectType: string;
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
