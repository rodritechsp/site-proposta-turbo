
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface ClientLogoUploadProps {
  onLogoChange: (file: File | null) => void;
  logoPreview?: string;
}

const ClientLogoUpload = ({ onLogoChange, logoPreview }: ClientLogoUploadProps) => {
  const [preview, setPreview] = useState<string>(logoPreview || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLogoChange(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setPreview('');
    onLogoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label>Logo do Cliente (Opcional)</Label>
      
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center space-x-2"
          >
            <Upload size={16} />
            <span>Escolher Logo do Cliente</span>
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            PNG, JPG, SVG (máx. 2MB)
          </p>
        </div>
        
        {preview && (
          <div className="relative">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={preview}
                alt="Preview do logo do cliente"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveLogo}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            >
              <X size={12} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientLogoUpload;
