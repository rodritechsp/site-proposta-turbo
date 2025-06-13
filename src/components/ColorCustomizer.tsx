
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

interface ColorCustomizerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

const ColorCustomizer = ({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: ColorCustomizerProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="h-5 w-5 text-blue-600" />
        <Label className="text-base font-medium">Personalizar Cores da Proposta</Label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="primary-color">Cor Primária</Label>
          <div className="flex items-center space-x-3 mt-2">
            <Input
              id="primary-color"
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              placeholder="#3B82F6"
              className="flex-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="secondary-color">Cor Secundária</Label>
          <div className="flex items-center space-x-3 mt-2">
            <Input
              id="secondary-color"
              type="color"
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              value={secondaryColor}
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              placeholder="#8B5CF6"
              className="flex-1"
            />
          </div>
        </div>
      </div>
      
      {/* Preview das cores */}
      <div className="mt-4 p-4 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-sm text-gray-600 mb-3">Preview das cores:</p>
        <div className="flex space-x-4">
          <div 
            className="w-20 h-12 rounded border shadow-sm flex items-center justify-center text-white text-xs font-medium"
            style={{ backgroundColor: primaryColor }}
          >
            Primária
          </div>
          <div 
            className="w-20 h-12 rounded border shadow-sm flex items-center justify-center text-white text-xs font-medium"
            style={{ backgroundColor: secondaryColor }}
          >
            Secundária
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorCustomizer;
