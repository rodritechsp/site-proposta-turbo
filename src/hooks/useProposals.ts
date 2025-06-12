
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Proposta } from '@/types';
import { toast } from '@/hooks/use-toast';

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposta[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProposals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('propostas')
        .select('*')
        .eq('user_id', user.id)
        .order('criado_em', { ascending: false });

      if (error) throw error;
      setProposals(data || []);
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as propostas.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createProposal = async (proposalData: Omit<Proposta, 'id' | 'user_id' | 'criado_em' | 'atualizado_em'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('propostas')
        .insert({
          ...proposalData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setProposals(prev => [data, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Proposta criada com sucesso.",
      });

      return data;
    } catch (error) {
      console.error('Erro ao criar proposta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a proposta.",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposta>) => {
    try {
      const { data, error } = await supabase
        .from('propostas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setProposals(prev => prev.map(p => p.id === id ? data : p));
      
      toast({
        title: "Sucesso!",
        description: "Proposta atualizada com sucesso.",
      });

      return data;
    } catch (error) {
      console.error('Erro ao atualizar proposta:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a proposta.",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [user]);

  return {
    proposals,
    loading,
    createProposal,
    updateProposal,
    fetchProposals,
  };
};
