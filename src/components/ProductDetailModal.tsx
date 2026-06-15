import React, { useEffect } from 'react';
import { X, Check, MessageSquare, Tag, FileText, BadgeInfo, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { AtlasImage } from './AtlasImage';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  // Bind escape key event to close modal elegantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const getFallbackType = (id: string): any => {
    switch (id) {
      case 'box-it4-profile': return 'box-it4';
      case 'roman-tile-profile': return 'roman-tile';
      case 'corrugated-profile': return 'corrugated';
      case 'curved-tile-profile': return 'curved-tile';
      case 'stone-coated-decra': return 'stone-coated';
      case 'ridge-cap-valley': return 'ridge-valley';
      case 'round-ridge-cap': return 'round-ridge';
      default: return 'box-it4';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 isolation">
          {/* Transparent Glassmorphism Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 font-sans flex flex-col md:flex-row"
            id={`product-modal-${product.id}`}
          >
            {/* Close trigger anchor */}
            <button
              id="close-modal-x-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-atlas-yellow text-white hover:text-slate-950 p-2.5 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Frame Section */}
            <div className="md:w-5/12 bg-slate-100 relative min-h-[300px] md:min-h-auto flex flex-col justify-between p-6">
              <div className="absolute inset-0">
                <AtlasImage
                  src={product.imagePath}
                  fallbackType={getFallbackType(product.id)}
                  alt={product.title}
                  overlayBlueprint={true}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Float info tag overlay */}
              <div className="relative z-10 self-start">
                <span className="bg-slate-950/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md backdrop-blur-md border border-slate-800">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Color list overlay description info */}
              <div className="relative z-10 bg-slate-900/90 p-4 rounded-xl border border-slate-800 backdrop-blur-md text-white mt-auto">
                <span className="text-[10px] uppercase font-bold text-atlas-yellow tracking-widest block mb-1">
                  Available Finishes
                </span>
                <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                  Supplied in premium texturized matte coating or gloss finishes with high UV weather stability.
                </p>
                <div className="flex items-center space-x-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.name}
                      title={color.name}
                      className="w-5 h-5 rounded-full border border-slate-600 shadow-sm relative group/innercolor cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-950 text-white text-[9px] rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 group-hover/innercolor:opacity-100 transition-opacity">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Specs & Feature Details Section */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block mb-1 flex items-center">
                  <BadgeInfo className="w-3.5 h-3.5 mr-1.5 text-atlas-blue" />
                  Premium Kenyan Roofing
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
                  {product.title}
                </h2>

                <p className="text-sm leading-relaxed text-slate-600 mb-6">
                  {product.extendedDescription}
                </p>

                {/* Technical specifications grid layout */}
                <div className="mb-8 bg-slate-50 border border-slate-200/50 rounded-xl p-4 sm:p-5">
                  <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-500 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-1.5 text-atlas-blue" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
                    {product.specifications.map((spec, idx) => (
                      <div key={idx} className="flex justify-between py-1.5 border-b border-slate-200/40">
                        <span className="font-semibold text-slate-500">{spec.label}:</span>
                        <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key product performance features checklist */}
                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-widest font-extrabold text-slate-500 mb-3 block">
                    Key Performance Benefits
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 bg-emerald-50 rounded-full p-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Quote Generation Control Panel */}
              <div className="pt-6 border-t border-slate-100">
                <div className="bg-amber-500/5 rounded-xl border border-atlas-yellow/20 p-4 mb-4">
                  <h5 className="text-xs font-bold text-slate-800 mb-1 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-ping"></span>
                    Instant Quotation Actions
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Which action fits your request? Select a button below to launch a customized, pre-filled WhatsApp message directly to our sales office.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <a
                    href={getWhatsAppUrl(product.title, 'quote')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-xs transition-colors text-xs text-center"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5 shrink-0" />
                    Request Quote
                  </a>
                  
                  <a
                    href={getWhatsAppUrl(product.title, 'pricing')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl transition-colors text-xs text-center border border-slate-200/50"
                  >
                    Get Pricing Sheet
                  </a>

                  <a
                    href={getWhatsAppUrl(product.title, 'ask')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-atlas-blue text-white hover:bg-atlas-blue-dark font-bold py-3 px-4 rounded-xl transition-colors text-xs text-center"
                  >
                    <HelpCircle className="w-4 h-4 mr-1.5 shrink-0" />
                    Ask Engineers
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
