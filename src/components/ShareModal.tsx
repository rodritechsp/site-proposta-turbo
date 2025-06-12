
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Proposta } from '@/types';

interface ShareModalProps {
  proposta: Proposta | null;
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ proposta, isOpen, onClose }: ShareModalProps) => {
  if (!proposta) return null;

  const getProjectTypeLabel = (type: string) => {
    const types = {
      'landing': 'Landing Page',
      'institutional': 'Site Institucional',
      'ecommerce': 'E-commerce',
      'blog': 'Blog/Portal',
      'custom': 'Personalizado'
    };
    return types[type as keyof typeof types] || type;
  };

  const shareText = `Confira esta proposta de ${getProjectTypeLabel(proposta.tipo_site)} - ${proposta.titulo}`;
  const shareUrl = `${window.location.origin}/proposal/${proposta.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copiado!",
        description: "O link da proposta foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5" />
            <span>Compartilhar Proposta</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-1">{proposta.titulo}</h3>
            <p className="text-sm text-gray-600">{getProjectTypeLabel(proposta.tipo_site)}</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="w-full flex items-center space-x-2"
            >
              <Copy size={16} />
              <span>Copiar Link</span>
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleWhatsAppShare}
                variant="outline"
                className="flex items-center space-x-2 bg-green-50 hover:bg-green-100 border-green-200"
              >
                <MessageCircle size={16} className="text-green-600" />
                <span>WhatsApp</span>
              </Button>

              <Button
                onClick={handleFacebookShare}
                variant="outline"
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <Facebook size={16} className="text-blue-600" />
                <span>Facebook</span>
              </Button>

              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="flex items-center space-x-2 bg-sky-50 hover:bg-sky-100 border-sky-200"
              >
                <Twitter size={16} className="text-sky-600" />
                <span>Twitter</span>
              </Button>

              <Button
                onClick={handleLinkedInShare}
                variant="outline"
                className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 border-blue-200"
              >
                <Linkedin size={16} className="text-blue-700" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center mt-4">
            O link será válido por 30 dias após a criação da proposta
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
