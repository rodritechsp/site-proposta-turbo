
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, ArrowLeft, Save, Building2, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCompanySettings } from '@/hooks/useCompanySettings';
import { toast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

const CompanySettings = () => {
  const { settings, loading, updateSettings, uploadLogo } = useCompanySettings();
  const [formData, setFormData] = useState({
    nome_empresa: '',
    endereco: '',
    telefone: '',
    email_empresa: '',
    cor_primaria: '#3B82F6',
    cor_secundaria: '#8B5CF6',
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (settings) {
      setFormData({
        nome_empresa: settings.nome_empresa || '',
        endereco: settings.endereco || '',
        telefone: settings.telefone || '',
        email_empresa: settings.email_empresa || '',
        cor_primaria: settings.cor_primaria || '#3B82F6',
        cor_secundaria: settings.cor_secundaria || '#8B5CF6',
      });
      setLogoPreview(settings.logo_url || '');
    }
  }, [settings]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let logoUrl = settings?.logo_url || '';

      // Upload logo if a new file was selected
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile);
      }

      // Update settings
      await updateSettings({
        ...formData,
        logo_url: logoUrl,
      });

      toast({
        title: "Configurações salvas!",
        description: "As configurações da empresa foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando configurações...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Configurações da Empresa</h1>
            <p className="text-gray-600 mt-2">Configure as informações da sua empresa e personalize suas propostas</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo da Empresa */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Logo da Empresa</h2>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <Label htmlFor="logo">Upload do Logo</Label>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center space-x-2"
                  >
                    <Upload size={16} />
                    <span>Escolher Arquivo</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Formatos aceitos: PNG, JPG, SVG (máx. 2MB)
                </p>
              </div>
              
              {logoPreview && (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={logoPreview}
                    alt="Preview do logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Informações da Empresa */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Informações da Empresa</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="nome_empresa">Nome da Empresa *</Label>
                <Input
                  id="nome_empresa"
                  value={formData.nome_empresa}
                  onChange={(e) => handleInputChange('nome_empresa', e.target.value)}
                  placeholder="Ex: Minha Empresa LTDA"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email_empresa">E-mail da Empresa</Label>
                <Input
                  id="email_empresa"
                  type="email"
                  value={formData.email_empresa}
                  onChange={(e) => handleInputChange('email_empresa', e.target.value)}
                  placeholder="contato@minhaempresa.com"
                />
              </div>
              
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  placeholder="(11) 9999-9999"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  placeholder="Rua, número, bairro, cidade - Estado"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Cores da Marca */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Palette className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Cores da Marca</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="cor_primaria">Cor Primária</Label>
                <div className="flex items-center space-x-3 mt-2">
                  <Input
                    id="cor_primaria"
                    type="color"
                    value={formData.cor_primaria}
                    onChange={(e) => handleInputChange('cor_primaria', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={formData.cor_primaria}
                    onChange={(e) => handleInputChange('cor_primaria', e.target.value)}
                    placeholder="#3B82F6"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="cor_secundaria">Cor Secundária</Label>
                <div className="flex items-center space-x-3 mt-2">
                  <Input
                    id="cor_secundaria"
                    type="color"
                    value={formData.cor_secundaria}
                    onChange={(e) => handleInputChange('cor_secundaria', e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={formData.cor_secundaria}
                    onChange={(e) => handleInputChange('cor_secundaria', e.target.value)}
                    placeholder="#8B5CF6"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            {/* Preview das cores */}
            <div className="mt-6 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-600 mb-3">Preview das cores:</p>
              <div className="flex space-x-4">
                <div 
                  className="w-20 h-12 rounded border shadow-sm flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: formData.cor_primaria }}
                >
                  Primária
                </div>
                <div 
                  className="w-20 h-12 rounded border shadow-sm flex items-center justify-center text-white text-xs font-medium"
                  style={{ backgroundColor: formData.cor_secundaria }}
                >
                  Secundária
                </div>
              </div>
            </div>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Salvar Configurações</span>
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CompanySettings;
