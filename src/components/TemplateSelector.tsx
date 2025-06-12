
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: 'modern' | 'elegant';
  onTemplateSelect: (template: 'modern' | 'elegant') => void;
  onContinue: () => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onContinue }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'modern' as const,
      name: 'Moderno',
      description: 'Design limpo com gradientes e cards visuais',
      preview: 'bg-gradient-to-br from-blue-500 to-purple-600',
      features: ['Gradientes modernos', 'Layout em cards', 'Ícones visuais', 'Cores vibrantes']
    },
    {
      id: 'elegant' as const,
      name: 'Elegante',
      description: 'Design minimalista e sofisticado',
      preview: 'bg-gradient-to-br from-gray-100 to-purple-100',
      features: ['Design minimalista', 'Tipografia refinada', 'Espaçamento generoso', 'Elegância visual']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Escolha o Template</h1>
        <p className="text-gray-600 text-lg">
          Selecione o design que melhor representa seu estilo profissional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-600 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            {/* Preview */}
            <div className={`h-48 rounded-lg mb-6 ${template.preview} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 p-4 rounded-lg shadow-lg text-center">
                  <h3 className="font-bold text-gray-800 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">Preview do Template</p>
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2">
                  <Check size={20} />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Características:</p>
                <ul className="space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          disabled={!selectedTemplate}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        >
          Continuar com Template {selectedTemplate === 'modern' ? 'Moderno' : 'Elegante'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelector;
