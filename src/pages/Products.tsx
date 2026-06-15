import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ShoppingCart, TableProperties, CircleEllipsis, Info, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';

type CategoryFilter = 'all' | 'roofing-profiles' | 'premium-tiles' | 'accessories';

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'roofing-profiles', label: 'Roofing Profiles' },
    { value: 'premium-tiles', label: 'Premium Tiles' },
    { value: 'accessories', label: 'Safety Accessories' }
  ];

  // Search & category filtration combined logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchQuery = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="products-view-container">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Main Products Header Intro */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs inline-block">
            Factory Catalogue
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Premium Steel Roofing Profiles
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Choose from trapezoidal box sheets, Mediterranean wave-tiles, and soundproof basalt-coated plates. All profiles are rolled from premium-gauge alu-zinc steel backing with UV-resistant paint barriers.
          </p>
        </div>

        {/* Search & Filtration Layout Dashboard */}
        <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-sm space-y-4" id="search-filter-controls">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input field */}
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </span>
              <input
                id="search-products-input"
                type="text"
                placeholder="Search profiles (e.g. Roman, Box IT4, Decra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-205 text-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all shadow-2xs"
              />
            </div>

            {/* Support context indicator */}
            <div className="hidden lg:flex items-center space-x-2.5 text-xs text-slate-400 font-medium">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span>Showing {filteredProducts.length} of {products.length} Products</span>
            </div>
          </div>

          {/* Filtration category tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as CategoryFilter)}
                className={`px-4.5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-atlas-blue text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products reactive results grid */}
        <div id="catalog-products-grid">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setActiveProduct(p)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/50 space-y-4">
              <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-display font-bold text-slate-800">No Matching Profiles found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No steel roofing profiles align with your search query "{searchQuery}". Try searching for generic gauges or colors.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="bg-atlas-blue text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* E-commerce & Dealer Portals Future Readiness Dashboard (As requested) */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-8 relative overflow-hidden mt-16 shadow-lg">
          <div className="absolute top-0 right-0 w-80 h-80 bg-atlas-yellow/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center space-x-1.5 bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-atlas-yellow uppercase">
                <ShoppingCart className="w-3.5 h-3.5 text-atlas-yellow" />
                <span>Version 2.0 Roadmap</span>
              </span>
              <h3 className="text-2xl font-display font-extrabold">Future E-commerce & Dealer Systems</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                This architecture is strictly configured to scale. Future versions of this website will integrate real-time inventory systems directly linked to our rolling line sensors, enabling automated checkout payments, dynamic price matrixes (based on copper-steel market rates), and dealer log channels.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-400 font-semibold font-mono">
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>Direct checkout API</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>Auto Inventory API</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  <span>Dealer Cart portal</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700 max-w-xs mx-auto text-center space-y-3 shrink-0">
              <CircleEllipsis className="w-10 h-10 text-atlas-yellow mx-auto" />
              <h4 className="font-display font-bold text-sm">Dealer & Contractor?</h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                Sign up for our catalog notifications or contact Stephen Kimaru to join the merchant beta line.
              </p>
              <a
                href="mailto:sales@atlasmabati.co.ke?subject=Merchant%20E-Commerce%20Beta%25Atlas"
                className="inline-flex w-full items-center justify-center bg-slate-700 hover:bg-slate-655 text-white font-bold py-2.5 rounded-lg text-xs"
              >
                Join Merchant Beta
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Specification inspection modal anchor */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={activeProduct !== null}
        onClose={() => setActiveProduct(null)}
      />
    </div>
  );
};
