
-- Create storage bucket for logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true);

-- Create company settings table
CREATE TABLE public.configuracoes_empresa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  nome_empresa TEXT,
  logo_url TEXT,
  cor_primaria TEXT DEFAULT '#3B82F6',
  cor_secundaria TEXT DEFAULT '#8B5CF6',
  endereco TEXT,
  telefone TEXT,
  email_empresa TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for company settings
ALTER TABLE public.configuracoes_empresa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own company settings" 
  ON public.configuracoes_empresa 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own company settings" 
  ON public.configuracoes_empresa 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company settings" 
  ON public.configuracoes_empresa 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company settings" 
  ON public.configuracoes_empresa 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add logo_cliente column to propostas table
ALTER TABLE public.propostas ADD COLUMN logo_cliente_url TEXT;
ALTER TABLE public.propostas ADD COLUMN cores_personalizadas JSONB DEFAULT '{"primaria": "#3B82F6", "secundaria": "#8B5CF6"}'::jsonb;

-- Create storage policies for logos bucket
CREATE POLICY "Public can view logos" ON storage.objects 
FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Authenticated users can upload logos" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own logos" ON storage.objects 
FOR UPDATE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own logos" ON storage.objects 
FOR DELETE USING (bucket_id = 'logos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Update trigger for configuracoes_empresa
CREATE TRIGGER update_configuracoes_empresa_updated_at
  BEFORE UPDATE ON public.configuracoes_empresa
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
