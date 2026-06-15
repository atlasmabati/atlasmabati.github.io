import React from 'react';
import { Share2, Tag, ArrowRight, MessageCircle, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { AtlasImage } from './AtlasImage';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
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
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      {/* Visual Product Thumbnail Block */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 shrink-0">
        <AtlasImage
          src={product.imagePath}
          fallbackType={getFallbackType(product.id)}
          alt={product.title}
          overlayBlueprint={true}
          className="w-full h-full"
        />

        {/* Dynamic Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
          <span className="bg-slate-900/90 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md backdrop-blur-xs shadow-sm inline-flex items-center">
            <Tag className="w-3 h-3 mr-1 text-atlas-yellow" />
            {product.categoryLabel}
          </span>
          
          {product.isPopular && (
            <span className="bg-gradient-to-r from-atlas-yellow to-amber-500 text-slate-950 text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
              ★ Best Seller
            </span>
          )}
        </div>

        {/* Gauge Layer Overlay Ribbon */}
        <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs font-mono font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm pointer-events-none">
          Gauge: {product.gaugeRange}
        </div>
      </div>

      {/* product Content Details */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-2">
          <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-atlas-blue transition-colors duration-200">
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Selected Color Swatches */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-2">
            Available Colors
          </span>
          <div className="flex items-center space-x-2">
            {product.colors.map((color) => (
              <div
                key={color.name}
                title={color.name}
                className="w-5.5 h-5.5 rounded-full border border-slate-300 shadow-xs cursor-help transition-transform hover:scale-125 hover:rotate-6 relative group/color"
                style={{ backgroundColor: color.hex }}
              >
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-white text-[10px] rounded px-1.5 py-0.5 whitespace-nowrap opacity-0 pointer-events-none group-hover/color:opacity-100 transition-opacity">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard CTA Actions Panel */}
        <div className="mt-auto space-y-2.5 pt-4 border-t border-slate-100">
          
          {/* Main WhatsApp Quotation Trigger */}
          <a
            href={getWhatsAppUrl(product.title, 'quote')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 transform active:scale-95 text-xs text-center group/btn"
          >
            <MessageCircle className="w-4.5 h-4.5 mr-2 group-hover/btn:rotate-6 transition-transform" />
            Request Instant Quote
          </a>

          {/* Subordinate contextual actions */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl(product.title, 'pricing')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2 px-2.5 rounded-lg border border-slate-200 transition-all text-[11px] hover:text-atlas-blue text-center"
            >
              Get Pricing List
            </a>
            
            <button
              onClick={() => onOpenDetails(product)}
              className="inline-flex items-center justify-center bg-atlas-blue text-white hover:bg-atlas-blue-dark font-semibold py-2 px-2.5 rounded-lg transition-all text-[11px] text-center cursor-pointer"
            >
              <Info className="w-3 h-3 mr-1" />
              Technical Specs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
