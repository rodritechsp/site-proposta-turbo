
-- Criar tabela de usuários complementar
CREATE TABLE public.users (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT,
  logo_url TEXT,
  plano TEXT DEFAULT 'free' CHECK (plano IN ('free', 'premium')),
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de propostas
CREATE TABLE public.propostas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo_site TEXT NOT NULL CHECK (tipo_site IN ('landing', 'institutional', 'ecommerce', 'blog', 'custom')),
  funcionalidades JSONB DEFAULT '[]'::jsonb,
  valor_total NUMERIC(10,2),
  status TEXT DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'enviado', 'aceito', 'rejeitado')),
  pdf_url TEXT,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ativar RLS nas tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.propostas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para users
CREATE POLICY "Usuários podem ver e editar seus próprios dados"
  ON public.users
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Políticas RLS para propostas
CREATE POLICY "Usuários podem ver suas próprias propostas"
  ON public.propostas
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias propostas"
  ON public.propostas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias propostas"
  ON public.propostas
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias propostas"
  ON public.propostas
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para criar perfil automaticamente após cadastro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'Usuário'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar campo atualizado_em
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_propostas_updated_at
  BEFORE UPDATE ON public.propostas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
