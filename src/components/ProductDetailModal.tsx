import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  MessageSquare,
  FileText,
  BadgeInfo,
  HelpCircle,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle,
  ClipboardCopy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, QuoteItem } from '../types';
import { AtlasImage } from './AtlasImage';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { useData } from '../context/DataContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen?: boolean;
  initialColorName?: string;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen = true,
  initialColorName,
  onClose
}) => {
  const { addToCart, trackProfileView, trackColorSwatch, logLead } = useData();

  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [selectedGauge, setSelectedGauge] = useState<string>('G28');
  const [length, setLength] = useState<string>('3.0 meters');
  const [quantity, setQuantity] = useState<number>(20);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [activeImgIdx, setActiveImgIdx] = useState<number>(0);

  const modalVisible = Boolean(product && isOpen);

  useEffect(() => {
    if (product && modalVisible) {
      if (product.colors && product.colors.length > 0) {
        const matched = initialColorName
          ? product.colors.find(c =>
              c.name.toLowerCase().includes(initialColorName.toLowerCase().split(' ')[0])
            )
          : undefined;
        setSelectedColor(matched || product.colors[0]);
      } else {
        setSelectedColor({ name: 'Standard Slate', hex: '#64748B' });
      }

      if (product.gaugeRange) {
        const gauges = product.gaugeRange.split(' - ');
        setSelectedGauge(gauges[0] || 'G28');
      } else {
        setSelectedGauge('G28');
      }

      setLength('3.0 meters');
      setQuantity(20);
      setAddedSuccess(false);
      setActiveImgIdx(0);
      trackProfileView(product.id);
    }
  }, [product, modalVisible, initialColorName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (modalVisible) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalVisible, onClose]);

  if (!product) return null;

  const getFallbackType = (id: string): any => {
    switch (id) {
      case 'box-it4-profile':
        return 'box-it4';
      case 'roman-tile-profile':
        return 'roman-tile';
      case 'corrugated-profile':
        return 'corrugated';
      case 'curved-tile-profile':
        return 'curved-tile';
      case 'stone-coated-decra':
        return 'stone-coated';
      case 'ridge-cap-valley':
        return 'ridge-valley';
      case 'round-ridge-cap':
        return 'round-ridge';
      default:
        return 'box-it4';
    }
  };

  const handleAddToCartClick = () => {
    if (!selectedColor) return;

    const newItem: QuoteItem = {
      id: `${product.id}-${selectedGauge}-${selectedColor.name.replace(/\s+/g, '-')}-${length}`,
      product,
      selectedColor,
      selectedGauge,
      quantity,
      length
    };

    addToCart(newItem);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  const handleDirectWhatsAppClick = () => {
    const lengthMeters = parseFloat(length) || 3.0;
    const estPrice = quantity * lengthMeters * (selectedGauge === 'G30' ? 750 : 950);
    logLead({
      customerName: 'Direct Catalog Inquiry',
      customerPhone: 'Via WhatsApp',
      location: 'Kenya',
      source: 'product-direct',
      profileTitle: product.title,
      gauge: selectedGauge,
      colorName: selectedColor?.name || 'Charcoal Black',
      estimatedAreaSqM: Math.round(quantity * lengthMeters),
      estimatedValueKes: Math.round(estPrice),
      itemsSummary: `${quantity} pcs ${product.title} (${selectedGauge}, ${selectedColor?.name || 'Default'}, ${length})`
    });
  };

  return (
    <AnimatePresence>
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 isolation">
          {/* Transparent Glassmorphism Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Panel container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-5xl max-h-[92vh] overflow-y-auto relative z-10 font-sans flex flex-col md:flex-row"
            id={`product-modal-${product.id}`}
          >
            {/* Close trigger anchor */}
            <button
              id="close-modal-x-btn"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 bg-slate-900/85 hover:bg-atlas-yellow text-white hover:text-slate-950 p-2 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual Frame Section */}
            <div className="md:w-5/12 bg-slate-100 relative min-h-[260px] sm:min-h-[320px] md:min-h-auto flex flex-col justify-between p-5">
              {(() => {
                const galleryImages =
                  product.images && product.images.length > 0 ? product.images : [product.imagePath];
                const finalGalleryImages =
                  galleryImages.length >= 5
                    ? galleryImages.slice(0, 5)
                    : galleryImages.length >= 3
                    ? galleryImages.slice(0, 3)
                    : galleryImages.slice(0, 1);

                const isSwipeable = finalGalleryImages.length > 1;
                const imageLabels = [
                  'Studio Product Profile',
                  'Installed Residence Example',
                  'Detail Structure Close-up',
                  'Alternative Profiling Angle',
                  'Customer Finished Project'
                ];

                return (
                  <div className="absolute inset-0 select-none group/gallery">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImgIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <AtlasImage
                          src={finalGalleryImages[activeImgIdx] || product.imagePath}
                          fallbackType={getFallbackType(product.id)}
                          alt={`${product.title} - View ${activeImgIdx + 1}`}
                          overlayBlueprint={true}
                          className="w-full h-full object-cover"
                        />
                        {activeImgIdx === 0 && selectedColor && (
                          <div
                            className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-color opacity-40"
                            style={{ backgroundColor: selectedColor.hex }}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {isSwipeable && (
                      <div className="absolute top-16 left-5 bg-slate-950/80 border border-white/10 text-atlas-yellow text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md z-10 select-none">
                        {imageLabels[activeImgIdx] || 'Profile View'}
                      </div>
                    )}

                    {isSwipeable && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImgIdx(
                              prev => (prev - 1 + finalGalleryImages.length) % finalGalleryImages.length
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-950/65 hover:bg-atlas-yellow hover:text-slate-950 text-white p-1.5 rounded-full shadow-md transition-all z-15 cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImgIdx(prev => (prev + 1) % finalGalleryImages.length)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-950/65 hover:bg-atlas-yellow hover:text-slate-950 text-white p-1.5 rounded-full shadow-md transition-all z-15 cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                );
              })()}

              {/* Float info tag overlay */}
              <div className="relative z-10 self-start">
                <span className="bg-slate-950/90 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-md backdrop-blur-md border border-slate-800">
                  {product.categoryLabel}
                </span>
              </div>

              {/* Color list overlay description info */}
              <div className="relative z-10 bg-slate-900/95 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md text-white mt-auto">
                <span className="text-[10px] uppercase font-bold text-atlas-yellow tracking-widest block mb-1">
                  Live Finish Colour Preview
                </span>
                <p className="text-xs text-slate-300 leading-normal mb-2.5">
                  Selected Finish: <strong className="text-white">{selectedColor?.name || 'Standard'}</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => {
                    const isColorSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(color);
                          setActiveImgIdx(0);
                          trackColorSwatch(color.name);
                        }}
                        title={color.name}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer relative ${
                          isColorSelected
                            ? 'border-atlas-yellow scale-110 shadow-md'
                            : 'border-slate-700 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {isColorSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            <Check className="w-4 h-4 font-extrabold" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Text Specs & Feature Details Section */}
            <div className="md:w-7/12 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest mb-1 flex items-center">
                  <BadgeInfo className="w-3.5 h-3.5 mr-1.5 text-atlas-blue" />
                  Certified Mill Specification
                </span>
                <h2 className="text-xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-2">
                  {product.title}
                </h2>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 mb-4">
                  {product.extendedDescription}
                </p>

                {/* Technical specifications grid layout */}
                <div className="mb-4 bg-slate-50 border border-slate-200/60 rounded-xl p-4">
                  <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-500 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-1.5 text-atlas-blue" />
                    Engineering Blueprint
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1.5 text-xs">
                    {product.specifications.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between py-1 border-b border-slate-200/40"
                      >
                        <span className="font-semibold text-slate-400">{spec.label}:</span>
                        <span className="font-bold text-slate-700 text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Configuration Section */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 mb-4 space-y-3">
                  <h3 className="text-xs uppercase tracking-widest font-extrabold text-slate-500 flex items-center">
                    <ClipboardCopy className="w-4 h-4 mr-1.5 text-atlas-blue" />
                    Configure Your Order
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Gauge Choice */}
                    <div className="space-y-1.5">
                      <span className="block text-slate-400 font-bold">Select Gauge</span>
                      <div className="flex gap-1.5">
                        {['G30', 'G28'].map(g => {
                          const isGSelected = selectedGauge === g;
                          return (
                            <button
                              key={g}
                              type="button"
                              onClick={() => {
                                setSelectedGauge(g);
                                trackProfileView(product.id, g);
                              }}
                              className={`flex-grow py-1.5 px-2 rounded font-black text-[11px] border transition-colors cursor-pointer ${
                                isGSelected
                                  ? 'bg-slate-900 border-slate-900 text-white'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {g}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sheet Length choice */}
                    <div className="space-y-1.5">
                      <span className="block text-slate-400 font-bold">Sheet Cut Length</span>
                      <select
                        value={length}
                        onChange={e => setLength(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded py-1.5 px-2 text-[11px] font-semibold text-slate-800"
                      >
                        <option value="2.0 meters">2.0 Meters</option>
                        <option value="2.5 meters">2.5 Meters</option>
                        <option value="3.0 meters">3.0 Meters (Standard)</option>
                        <option value="3.5 meters">3.5 Meters</option>
                        <option value="4.5 meters">4.5 Meters (Custom Roll)</option>
                        <option value="6.0 meters">6.0 Meters (Long Run)</option>
                        <option value="Custom rafter cut">Custom Rafter Cut (up to 9m)</option>
                      </select>
                    </div>

                    {/* Quantity Choice Counter */}
                    <div className="space-y-1.5">
                      <span className="block text-slate-400 font-bold">Quantity (Pcs)</span>
                      <div className="flex items-center justify-between border border-slate-200 rounded bg-white p-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 5))}
                          className="p-1 hover:bg-slate-100 text-slate-500 rounded cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                          className="w-14 text-center font-bold text-slate-800 text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 5)}
                          className="p-1 hover:bg-slate-100 text-slate-500 rounded cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Quote Generation Control Panel */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCartClick}
                  disabled={addedSuccess}
                  className={`flex-grow inline-flex items-center justify-center font-bold py-3.5 px-5 rounded-xl shadow-md transition-colors text-xs text-center cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-atlas-blue text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                      Added to Quote Basket!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Quote Basket ({quantity} pcs)
                    </>
                  )}
                </button>

                <a
                  href={getWhatsAppUrl(product.title, 'quote', {
                    color: selectedColor?.name,
                    gauge: selectedGauge,
                    length,
                    quantity
                  })}
                  onClick={handleDirectWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-5 rounded-xl shadow-sm transition-colors text-xs text-center"
                >
                  <MessageSquare className="w-4 h-4 mr-1.5 shrink-0" />
                  Instant WhatsApp Quote
                </a>

                <a
                  href={getWhatsAppUrl(product.title, 'ask', {
                    color: selectedColor?.name,
                    gauge: selectedGauge
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 px-4 rounded-xl transition-colors text-xs text-center border border-slate-200"
                  title="Ask engineering team about trusses"
                >
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
