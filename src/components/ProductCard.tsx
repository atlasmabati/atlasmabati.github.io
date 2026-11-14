import React, { useState } from 'react';
import {
  Tag,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { AtlasImage } from './AtlasImage';
import { useData } from '../context/DataContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product, preferredColorName?: string) => void;
  compact?: boolean;
}

const PRODUCT_GALLERY_IMAGES: Record<string, string[]> = {
  'box-it4-profile': [
    '/images/products/box-it4.webp',
    '/images/products/box-it4.webp',
    '/images/products/box-it4.webp'
  ],
  'roman-tile-profile': [
    '/images/products/roman-tile.jpg',
    '/images/products/roman-tile.jpg',
    '/images/products/roman-tile.jpg'
  ],
  'corrugated-profile': [
    '/images/products/corrugated.jpg',
    '/images/products/corrugated.jpg',
    '/images/products/corrugated.jpg'
  ],
  'curved-tile-profile': [
    '/images/products/curved-tile.webp',
    '/images/products/curved-tile.webp',
    '/images/products/curved-tile.webp'
  ],
  'stone-coated-decra': [
    '/images/products/stone-coated.jpg',
    '/images/products/stone-coated.jpg',
    '/images/products/stone-coated.jpg'
  ],
  'premium-pvc-gutter': [
    '/images/products/pvc-gutter.jpeg',
    '/images/products/pvc-gutter.jpeg',
    '/images/products/pvc-gutter.jpeg'
  ],
  'rainwater-fittings-set': [
    '/images/products/rainwater-fittings.webp',
    '/images/products/rainwater-fittings.webp',
    '/images/products/rainwater-fittings.webp'
  ],
  'light-gauge-steel-trusses': [
    '/images/products/light-gauge-steel.jpeg',
    '/images/products/light-gauge-steel.jpeg',
    '/images/products/light-gauge-steel.jpeg'
  ],
  'asphalt-shingles-premium': [
    '/images/products/thermal.png',
    '/images/products/thermal.png',
    '/images/products/thermal.png'
  ],
  'ridge-cap-valley': [
   '/images/products/ridge-valley.webp',
    '/images/products/ridge-valley.webp',
    '/images/products/ridge-valley.webp'
  ],
  'round-ridge-cap': [
    '/images/products/round-ridge.png',
    '/images/products/round-ridge.png',
    '/images/products/round-ridge.png'
  ]
};

const WARRANTY_NOTES: Record<string, string> = {
  'box-it4-profile': '15-Year Rust-Free Guarantee | KEBS Standard',
  'roman-tile-profile': '20-Year Color Fastness Warranty',
  'stone-coated-decra': '30-Year Lifetime Structural Warranty',
  'corrugated-profile': '10-Year Zinc Barrier Defense',
  'curved-tile-profile': '15-Year Fade Armor Protection',
  'premium-pvc-gutter': '10-Year Leakproof Durability Note',
  'rainwater-fittings-set': 'All-Weather High UV Resistance Cert',
  'light-gauge-steel-trusses': 'Termite-Proof Lifetime Engineering Guarantee',
  'asphalt-shingles-premium': '25-Year Storm & Wind Warranty',
  'ridge-cap-valley': 'Perfect Profile Color Match Warranty',
  'round-ridge-cap': 'Seamless Heavy Anti-Leakage Apex Seal'
};

const GALLERY_LABELS = ['Studio Profile', 'Installed Project', 'Close-up Detail'];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  compact = false
}) => {
  const { addToCart, trackColorSwatch } = useData();
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || { name: 'Slate Gray', hex: '#64748B' }
  );
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showSpecsDrawer, setShowSpecsDrawer] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const gallery = PRODUCT_GALLERY_IMAGES[product.id] || [
    product.imagePath,
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
  ];

  const warrantyNote = WARRANTY_NOTES[product.id] || '15-Year Structural Integrity Warranty';

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev + 1) % gallery.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx(prev => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultGauge = product.gaugeRange?.split(' - ')[0] || 'G28';
    addToCart({
      id: `${product.id}-${defaultGauge}-${selectedColor.name.replace(/\s+/g, '-')}`,
      product,
      selectedColor,
      selectedGauge: defaultGauge,
      quantity: 10,
      length: '3.0 meters'
    });
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1600);
  };

  const primarySpec = product.specifications?.[0];
  const benefits = product.features?.slice(0, 3) || [
    'High corrosion resistance',
    'Weatherproof protection',
    'Sleek modern aesthetics'
  ];

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
    >
      {/* Visual Product Swipe Gallery Block — Compact on mobile so cards don't overwhelm phone screens */}
      <div
        onClick={() => onOpenDetails(product, selectedColor.name)}
        className={`relative ${
          compact ? 'h-32 sm:h-40' : 'h-40 sm:h-48'
        } w-full overflow-hidden bg-slate-100 shrink-0 cursor-pointer`}
      >
        <AtlasImage
          src={gallery[activeImageIdx]}
          fallbackType="box-it4"
          alt={`${product.title} - ${GALLERY_LABELS[activeImageIdx]}`}
          overlayBlueprint={true}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Real-time color tint overlay */}
        {activeImageIdx === 0 && selectedColor && (
          <div
            className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-color opacity-40"
            style={{ backgroundColor: selectedColor.hex }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

        {/* Swipe Gallery Chevrons */}
        {!compact && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-900/65 text-white hover:bg-atlas-yellow hover:text-slate-950 transition-colors z-10 opacity-0 group-hover:opacity-100 duration-200 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-slate-900/65 text-white hover:bg-atlas-yellow hover:text-slate-950 transition-colors z-10 opacity-0 group-hover:opacity-100 duration-200 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Top Category & Popular Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none z-10 pr-9">
          <span className="bg-slate-900/90 text-white text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md backdrop-blur-xs inline-flex items-center">
            <Tag className="w-2.5 h-2.5 mr-1 text-atlas-yellow" />
            {product.categoryLabel}
          </span>
          {product.isPopular && (
            <span className="bg-atlas-yellow text-slate-950 text-[8px] sm:text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs">
              ★ Top Pick
            </span>
          )}
        </div>

        {/* Bottom Live Color + Gauge Strip */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
          <span className="bg-slate-950/85 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs inline-flex items-center space-x-1.5 truncate">
            <span
              className="w-2 h-2 rounded-full border border-white/60 shrink-0"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="truncate">{selectedColor.name}</span>
          </span>

          <span className="bg-slate-900/85 text-atlas-yellow text-[9px] font-mono font-bold px-2 py-0.5 rounded-md backdrop-blur-xs shrink-0">
            {product.gaugeRange || 'G28-G30'}
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className={`${compact ? 'p-3' : 'p-4'} flex flex-col grow justify-between space-y-3`}>
        <div className="space-y-2">
          <div>
            <h3
              onClick={() => onOpenDetails(product, selectedColor.name)}
              className={`${
                compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
              } font-display font-extrabold text-slate-900 group-hover:text-atlas-blue transition-colors duration-200 line-clamp-1 cursor-pointer`}
            >
              {product.title}
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug mt-0.5">
              {product.description}
            </p>
          </div>

          {/* Interactive Color Swatches Row */}
          <div className="pt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                Tap Colour ({product.colors.length})
              </span>
              {primarySpec && !compact && (
                <span className="text-[9px] font-mono font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {primarySpec.label.replace('Effective ', '')}: {primarySpec.value.split(' ')[0]}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.map(color => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setSelectedColor(color);
                      setActiveImageIdx(0);
                      trackColorSwatch(color.name);
                    }}
                    title={color.name}
                    className={`${
                      compact ? 'w-4 h-4' : 'w-5 h-5'
                    } rounded-full border transition-transform relative cursor-pointer ${
                      isSelected
                        ? 'border-atlas-blue scale-115 shadow-xs ring-2 ring-atlas-blue/25'
                        : 'border-slate-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full shadow-xs" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progressive Disclosure Accordion: Keeps all rich specs & benefits accessible without bloating mobile scroll! */}
          {!compact && (
            <div className="pt-1 border-t border-slate-100">
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setShowSpecsDrawer(!showSpecsDrawer);
                }}
                className="w-full flex items-center justify-between py-1 text-[10px] font-bold text-slate-500 hover:text-atlas-blue transition-colors cursor-pointer"
              >
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-atlas-blue shrink-0" />
                  <span className="truncate">{warrantyNote.split('|')[0]}</span>
                </span>
                <span className="inline-flex items-center text-atlas-blue shrink-0 ml-1">
                  <span>{showSpecsDrawer ? 'Hide' : 'Specs'}</span>
                  {showSpecsDrawer ? (
                    <ChevronUp className="w-3 h-3 ml-0.5" />
                  ) : (
                    <ChevronDown className="w-3 h-3 ml-0.5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {showSpecsDrawer && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-1 space-y-2 text-[10px] text-slate-600">
                      <ul className="space-y-1">
                        {benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-tight">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      {product.specifications.slice(0, 2).map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex justify-between bg-slate-50 px-2 py-1 rounded border border-slate-100"
                        >
                          <span className="text-slate-400 font-medium">{spec.label}:</span>
                          <span className="font-bold text-slate-700">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Streamlined Action Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onOpenDetails(product, selectedColor.name)}
            className="grow inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-extrabold py-2 px-2.5 rounded-xl shadow-2xs transition-colors text-[11px] text-center cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            <span>{compact ? 'Configure' : 'Configure & Quote'}</span>
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            title="Quick-add 10 sheets in selected color to Quote Basket"
            className={`shrink-0 inline-flex items-center justify-center py-2 px-2.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
              quickAdded
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-900 hover:bg-atlas-blue text-white border-slate-900'
            }`}
          >
            {quickAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
