
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { BriefingFormData } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface BriefingFormProps {
  onSubmit: (data: BriefingFormData) => void;
}

const BriefingForm = ({ onSubmit }: BriefingFormProps) => {
  const [formData, setFormData] = useState<BriefingFormData>({
    clientName: '',
    clientEmail: '',
    projectType: '',
    pages: 1,
    features: [],
    budget: '',
    timeline: '',
    description: ''
  });

  const projectTypes = [
    { value: 'landing', label: 'Landing Page', description: 'Página única para conversão' },
    { value: 'institutional', label: 'Site Institucional', description: 'Apresentação da empresa' },
    { value: 'ecommerce', label: 'E-commerce', description: 'Loja virtual completa' },
    { value: 'blog', label: 'Blog/Portal', description: 'Site de conteúdo' },
    { value: 'custom', label: 'Personalizado', description: 'Projeto sob medida' }
  ];

  const availableFeatures = [
    'Sistema de contato',
    'Galeria de imagens',
    'Blog integrado',
    'Sistema de login',
    'Carrinho de compras',
    'Sistema de pagamento',
    'Chat online',
    'Newsletter',
    'SEO otimizado',
    'Responsivo mobile'
  ];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Briefing Inteligente
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Responda algumas perguntas e gere sua proposta automaticamente
        </p>
      </div>

      <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações do Cliente */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações do Cliente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clientName">Nome do Cliente</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Digite o nome do cliente"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">E-mail do Cliente</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  placeholder="cliente@exemplo.com"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Tipo de Projeto */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Detalhes do Projeto
            </h2>
            <div className="space-y-2">
              <Label>Tipo de Site</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Selecione o tipo de site" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pages">Número de Páginas</Label>
                <Input
                  id="pages"
                  type="number"
                  min="1"
                  value={formData.pages}
                  onChange={(e) => setFormData(prev => ({ ...prev, pages: parseInt(e.target.value) || 1 }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label>Orçamento</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Faixa de investimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000-3000">R$ 1.000 - R$ 3.000</SelectItem>
                    <SelectItem value="3000-6000">R$ 3.000 - R$ 6.000</SelectItem>
                    <SelectItem value="6000-10000">R$ 6.000 - R$ 10.000</SelectItem>
                    <SelectItem value="10000+">Acima de R$ 10.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prazo</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Prazo desejado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15-dias">15 dias</SelectItem>
                    <SelectItem value="30-dias">30 dias</SelectItem>
                    <SelectItem value="45-dias">45 dias</SelectItem>
                    <SelectItem value="60-dias">60 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Funcionalidades */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Funcionalidades Desejadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                  <Checkbox
                    id={feature}
                    checked={formData.features.includes(feature)}
                    onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label htmlFor={feature} className="text-gray-700 cursor-pointer">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              Informações Adicionais
            </h2>
            <div className="space-y-2">
              <Label htmlFor="description">Descreva o projeto em detalhes</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Conte mais sobre o projeto, objetivos, público-alvo, referências..."
                rows={4}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Gerar Proposta Automaticamente</span>
            <ArrowRight size={20} />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BriefingForm;
