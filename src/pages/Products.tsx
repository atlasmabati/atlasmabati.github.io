import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  Search,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Bookmark,
  Award,
  X,
  LayoutGrid,
  Rows3,
  Calculator,
  Palette,
  Layers,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { ColorVisualizerStudio } from '../components/ColorVisualizerStudio';
import { Product, ProductCategory, PRODUCT_CATEGORIES } from '../types';
import { AtlasImage } from '../components/AtlasImage';
import { getWhatsAppUrl, getWishlistWhatsAppUrl } from '../utils/whatsapp';
import { MASTER_COLOR_PALETTE } from '../utils/config';

type CategoryFilter = 'all' | ProductCategory;
type ViewLayoutMode = 'rows' | 'compact-grid';

interface CategoryRowProps {
  cat: { id: string; label: string; desc: string };
  catProducts: Product[];
  likedProductIds: string[];
  handleToggleLike: (id: string, e: React.MouseEvent) => void;
  onOpenProduct: (p: Product, colorName?: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  cat,
  catProducts,
  likedProductIds,
  handleToggleLike,
  onOpenProduct
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (catProducts.length === 0) return null;

  return (
    <div className="space-y-3 relative group/row">
      <div className="flex justify-between items-end px-1 border-b border-slate-200/70 pb-2.5">
        <div>
          <h3 className="text-base sm:text-lg font-display font-black text-slate-900 flex items-center">
            <span className="w-2 h-2 bg-atlas-blue rounded-full mr-2" />
            {cat.label}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            {cat.desc} •{' '}
            <span className="text-atlas-blue font-bold">{catProducts.length} Profiles</span>
          </p>
        </div>

        {/* Swipe Helpers */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:text-atlas-blue transition-all text-slate-500 shadow-2xs cursor-pointer flex"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 hover:text-atlas-blue transition-all text-slate-500 shadow-2xs cursor-pointer flex"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Swipe Track on Mobile (70vw width so next card peeks in cleanly), 5-Col Grid on Desktop */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3.5 sm:gap-5 pb-3 pt-1 px-1 -mx-1 scrollbar-none snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-x-visible lg:pb-0"
        >
          {catProducts.map(product => {
            const isLiked = likedProductIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="w-[70vw] sm:w-[44vw] md:w-[30vw] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none relative"
              >
                <ProductCard
                  product={product}
                  onOpenDetails={(p, colName) => onOpenProduct(p, colName)}
                />

                <button
                  type="button"
                  onClick={e => handleToggleLike(product.id, e)}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full border shadow-sm backdrop-blur-md transition-all z-10 hover:scale-110 cursor-pointer ${
                    isLiked
                      ? 'bg-rose-50 text-rose-500 border-rose-200'
                      : 'bg-white/90 text-slate-400 hover:text-slate-900 border-slate-200'
                  }`}
                  title={isLiked ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const Products: React.FC = () => {
  const { products, logLead } = useData();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [activeColorFilter, setActiveColorFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewLayoutMode>('rows');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [preferredModalColor, setPreferredModalColor] = useState<string | undefined>(undefined);

  // Likes/Wishlist State
  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Read query params from URL for global header search synchronization
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const productIdParam = params.get('productId');

    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (productIdParam && products.length > 0) {
      const match = products.find(p => p.id === productIdParam);
      if (match) {
        setActiveProduct(match);
        navigate('/products', { replace: true });
      }
    }
  }, [location.search, products, navigate]);

  // Load Liked Products from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('atlas_liked_products');
    if (savedLikes) {
      try {
        setLikedProductIds(JSON.parse(savedLikes));
      } catch (e) {
        setLikedProductIds([]);
      }
    }
  }, []);

  const handleToggleLike = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = likedProductIds.includes(productId)
      ? likedProductIds.filter(id => id !== productId)
      : [...likedProductIds, productId];
    setLikedProductIds(updated);
    localStorage.setItem('atlas_liked_products', JSON.stringify(updated));
  };

  const handleOpenProduct = (product: Product, colorName?: string) => {
    setPreferredModalColor(colorName);
    setActiveProduct(product);
  };

  const activeMasterColor = activeColorFilter
    ? MASTER_COLOR_PALETTE.find(c => c.id === activeColorFilter)
    : null;

  // Filter products based on category, color filter, and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor =
      !activeMasterColor ||
      product.colors.some(c =>
        activeMasterColor.matchingKeywords.some(kw => c.name.toLowerCase().includes(kw))
      );
    return matchesCategory && matchesSearch && matchesColor;
  });

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
      default:
        return 'box-it4';
    }
  };

  const likedItems = products.filter(p => likedProductIds.includes(p.id));

  const handleWishlistDispatch = () => {
    if (likedItems.length === 0) return;
    logLead({
      customerName: 'Wishlist Builder Client',
      customerPhone: 'Via WhatsApp',
      location: 'Kenya',
      source: 'wishlist',
      profileTitle: likedItems[0].title,
      gauge: 'G28',
      colorName: likedItems[0].colors[0]?.name || 'Charcoal Black',
      estimatedAreaSqM: 150,
      estimatedValueKes: likedItems.length * 65000,
      itemsSummary: `Wishlist Inquiry (${likedItems.length} profiles): ${likedItems
        .map(i => i.title)
        .join(', ')}`
    });
  };

  const isFlatGridView =
    viewMode === 'compact-grid' ||
    Boolean(searchQuery.trim()) ||
    Boolean(activeColorFilter) ||
    selectedCategory !== 'all';

  return (
    <div className="bg-slate-50 min-h-screen pb-20 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* Compact All-In-One Roofing Hub Header */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-7 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-atlas-blue/10 border border-atlas-blue/20 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5 text-atlas-blue" />
                <span className="text-[10px] font-black tracking-widest text-atlas-blue uppercase">
                  One-Stop Factory Roofing Hub
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                Atlas Roofing Profiles,{' '}
                <span className="text-atlas-blue">Colours & Complete Systems</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Handle your entire roofing project in one place: test mabati colours on a 3D villa,
                compare sheets, trusses & PVC gutters, or calculate your exact custom-cut BOQ.
              </p>
            </div>

            {/* 3-Step Complete Roofing Workflow Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex gap-2.5 shrink-0">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block">
                    Step 1
                  </span>
                  <span className="text-xs font-bold text-slate-800 block leading-tight">
                    Preview Colours
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-atlas-blue/10 text-atlas-blue shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block">
                    Step 2
                  </span>
                  <span className="text-xs font-bold text-slate-800 block leading-tight">
                    Sheets + Trusses
                  </span>
                </div>
              </div>

              <Link
                to="/calculator"
                className="bg-slate-900 hover:bg-atlas-blue text-white rounded-2xl p-3 flex items-center justify-between space-x-2.5 transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-atlas-yellow text-slate-950 shrink-0">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-extrabold uppercase text-atlas-yellow block">
                      Step 3 • Estimator
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Full Roof Calculator
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Interactive Mabati Colour & Finish Visualizer Studio */}
        <ColorVisualizerStudio
          activeColorFilter={activeColorFilter}
          onSelectColorFilter={setActiveColorFilter}
          onInspectProductWithColor={(prod, colName) => handleOpenProduct(prod, colName)}
        />

        {/* Compact Sticky-Friendly Filter, Search & Mobile View Switcher Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative grow max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-input-field"
                type="text"
                placeholder="Search profiles, trusses, gutters (e.g. Box IT4, Roman)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl pl-10 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-atlas-blue/20 focus:bg-white transition-all font-semibold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Layout Switcher (Solves phone scrolling fatigue!) + Wishlist Trigger */}
            <div className="flex items-center justify-between sm:justify-end gap-2">
              {/* View Mode Switcher */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setViewMode('rows')}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'rows'
                      ? 'bg-white text-atlas-blue shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span>Showcase</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact-grid')}
                  className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'compact-grid'
                      ? 'bg-white text-atlas-blue shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Compact 2-Col</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowWishlistDrawer(true)}
                className="inline-flex items-center space-x-1.5 bg-slate-900 text-white hover:bg-atlas-blue px-3.5 py-2.5 rounded-xl shadow-2xs transition-colors text-xs font-bold cursor-pointer"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    likedProductIds.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
                <span>Saved ({likedProductIds.length})</span>
              </button>
            </div>
          </div>

          {/* Horizontal Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-atlas-blue text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              All Products ({products.length})
            </button>
            {PRODUCT_CATEGORIES.map(cat => {
              const count = products.filter(p => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-atlas-blue text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Active Filter Status Chips */}
          {(activeMasterColor || selectedCategory !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center space-x-1 bg-atlas-blue/10 text-atlas-blue font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    <span>
                      {PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-slate-950 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {activeMasterColor && (
                  <span className="inline-flex items-center space-x-1.5 bg-slate-900 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-white/40"
                      style={{ backgroundColor: activeMasterColor.hex }}
                    />
                    <span>Colour: {activeMasterColor.name}</span>
                    <button
                      type="button"
                      onClick={() => setActiveColorFilter(null)}
                      className="hover:text-atlas-yellow cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 bg-amber-500/15 text-amber-900 font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-slate-950 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setActiveColorFilter(null);
                  setSearchQuery('');
                }}
                className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Main Catalog Display Area */}
        <div className="space-y-8">
          {isFlatGridView ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h2 className="text-base sm:text-xl font-display font-black text-slate-900 flex items-center">
                  <span className="w-2 h-2 bg-atlas-yellow rounded-full mr-2" />
                  Showing {filteredProducts.length} Certified Products
                </h2>
              </div>

              {filteredProducts.length > 0 ? (
                /* 2-Column Compact Grid on Mobile when in Compact mode, or responsive grid */
                <div
                  className={
                    viewMode === 'compact-grid'
                      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5'
                      : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6'
                  }
                >
                  {filteredProducts.map(product => {
                    const isLiked = likedProductIds.includes(product.id);
                    return (
                      <div key={product.id} className="relative group">
                        <ProductCard
                          product={product}
                          compact={viewMode === 'compact-grid'}
                          onOpenDetails={(p, colName) => handleOpenProduct(p, colName)}
                        />

                        <button
                          type="button"
                          onClick={e => handleToggleLike(product.id, e)}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-full border shadow-sm backdrop-blur-md transition-all z-10 hover:scale-110 cursor-pointer ${
                            isLiked
                              ? 'bg-rose-50 text-rose-500 border-rose-200'
                              : 'bg-white/90 text-slate-400 hover:text-slate-900 border-slate-200'
                          }`}
                          title={isLiked ? 'Unlike profile' : 'Like profile'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
                  <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-display font-bold text-slate-800">
                    No Matching Profiles Found
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We couldn't find any products matching your current filter combination.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setActiveColorFilter(null);
                    }}
                    className="bg-atlas-blue text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer hover:bg-slate-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Categorized Showcase Rows */
            <div className="space-y-10">
              {PRODUCT_CATEGORIES.map(cat => {
                const catProducts = filteredProducts.filter(p => p.category === cat.id);
                return (
                  <CategoryRow
                    key={cat.id}
                    cat={cat}
                    catProducts={catProducts}
                    likedProductIds={likedProductIds}
                    handleToggleLike={handleToggleLike}
                    onOpenProduct={handleOpenProduct}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Complete Roofing System Banner (Helps owner & buyer handle all roofing needs in one place) */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-atlas-yellow block">
              Complete Roof Package Assurance
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-black">
              Need Sheets, Trusses, Gutters & Screws Calculated Together?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Use our upgraded Data-Driven Roofing Calculator to compute exact sheet counts based on
              each profile's real millimeter cover width, compare Custom Continuous Cuts vs. 3m
              sheets, and add your entire roof BOQ to your Quote Basket in one click.
            </p>
            <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-slate-300">
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                Exact Effective Cover Width Math
              </span>
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                Zero-Overlap Custom Cut Optimizer
              </span>
              <span className="inline-flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                Timber vs. Light Gauge Steel Trusses
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              to="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-black px-6 py-4 rounded-2xl shadow-lg text-xs uppercase tracking-wider transition-transform hover:scale-[1.02]"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Launch Roof Estimator
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide-out Wishlist Drawer */}
      <AnimatePresence>
        {showWishlistDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWishlistDrawer(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-display font-extrabold text-slate-900 flex items-center">
                    <Heart className="w-5 h-5 text-rose-500 fill-current mr-2" />
                    My Saved Roofing Profiles
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Compare your shortlisted sheets and request a unified quote.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWishlistDrawer(false)}
                  className="text-slate-400 hover:text-slate-900 text-xs font-bold border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-5 space-y-3">
                {likedItems.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <Bookmark className="w-10 h-10 text-slate-200 mx-auto" />
                    <p className="text-xs text-slate-400">Your wishlist is currently empty.</p>
                    <p className="text-[11px] text-slate-400">
                      Tap the heart icon on any profile to save it here for side-by-side comparison.
                    </p>
                  </div>
                ) : (
                  likedItems.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 p-3 bg-slate-50 border border-slate-200 rounded-xl relative group"
                    >
                      <div className="w-16 h-16 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                        <AtlasImage
                          src={item.imagePath}
                          fallbackType={getFallbackType(item.id)}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1 pr-6">
                        <span className="text-[9px] uppercase font-bold text-atlas-blue tracking-wider block">
                          {item.categoryLabel}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          Gauges: {item.gaugeRange}
                        </span>

                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setShowWishlistDrawer(false);
                              handleOpenProduct(item);
                            }}
                            className="text-[10px] font-bold text-slate-800 hover:text-atlas-blue underline cursor-pointer"
                          >
                            Configure
                          </button>
                          <a
                            href={getWhatsAppUrl(item.title, 'quote')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[10px] text-atlas-blue font-bold hover:underline"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            WhatsApp Quote
                          </a>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleLike(item.id)}
                        className="absolute top-2.5 right-2.5 text-slate-300 hover:text-rose-500 cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {likedItems.length > 0 && (
                <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-2.5">
                  <a
                    href={getWishlistWhatsAppUrl(likedItems)}
                    onClick={handleWishlistDispatch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-black py-3 px-4 rounded-xl shadow-md transition-all text-xs text-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Saved Wishlist to Atlas WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setLikedProductIds([]);
                      localStorage.setItem('atlas_liked_products', JSON.stringify([]));
                    }}
                    className="w-full text-slate-400 hover:text-rose-500 font-bold text-[11px] text-center cursor-pointer"
                  >
                    Clear All Saved Profiles
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Technical Specifications & Order Configuration Modal (Now properly receives isOpen!) */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={activeProduct !== null}
        initialColorName={preferredModalColor}
        onClose={() => {
          setActiveProduct(null);
          setPreferredModalColor(undefined);
        }}
      />
    </div>
  );
};
