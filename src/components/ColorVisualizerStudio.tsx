import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Sun,
  Sunset,
  Sparkles,
  Check,
  ThermometerSnowflake,
  ShieldCheck,
  Filter,
  ChevronDown,
  ChevronUp,
  Home,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MASTER_COLOR_PALETTE } from '../utils/config';
import { MasterColorFinish, Product } from '../types';
import { useData } from '../context/DataContext';

interface ColorVisualizerStudioProps {
  activeColorFilter: string | null;
  onSelectColorFilter: (colorId: string | null) => void;
  onInspectProductWithColor: (product: Product, colorName: string) => void;
}

const WALL_FINISHES = [
  { id: 'white', label: 'White Stucco', wallHex: '#F8FAFC', trimHex: '#E2E8F0' },
  { id: 'cream', label: 'Kenyan Cream', wallHex: '#FEF3C7', trimHex: '#FDE68A' },
  { id: 'stone', label: 'Quarry Stone', wallHex: '#CBD5E1', trimHex: '#94A3B8' },
  { id: 'clay', label: 'Warm Sandstone', wallHex: '#FFEDD5', trimHex: '#FDBA74' }
];

const ROOF_TEXTURES = [
  { id: 'box-it4', label: 'Box IT4 Ribbed', productId: 'box-it4-profile' },
  { id: 'roman-tile', label: 'Roman Wave Tile', productId: 'roman-tile-profile' },
  { id: 'stone-coated', label: 'Stone Coated Decra', productId: 'stone-coated-decra' },
  { id: 'corrugated', label: 'Classic Corrugated', productId: 'corrugated-profile' }
] as const;

export const ColorVisualizerStudio: React.FC<ColorVisualizerStudioProps> = ({
  activeColorFilter,
  onSelectColorFilter,
  onInspectProductWithColor
}) => {
  const { products, trackColorSwatch } = useData();
  const [selectedColor, setSelectedColor] = useState<MasterColorFinish>(MASTER_COLOR_PALETTE[0]);
  const [selectedWall, setSelectedWall] = useState(WALL_FINISHES[0]);
  const [selectedTexture, setSelectedTexture] = useState<(typeof ROOF_TEXTURES)[number]>(ROOF_TEXTURES[0]);
  const [lighting, setLighting] = useState<'day' | 'sunset'>('day');
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  const handleSelectColor = (col: MasterColorFinish) => {
    setSelectedColor(col);
    trackColorSwatch(col.name);
  };

  // Find products available in this color family
  const matchingProducts = products.filter(p =>
    p.colors.some(c =>
      selectedColor.matchingKeywords.some(kw => c.name.toLowerCase().includes(kw))
    )
  );

  const isFilteredByThisColor = activeColorFilter === selectedColor.id;

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Top Bar — Always Visible & Compact on Mobile */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 bg-atlas-yellow/15 border border-atlas-yellow/30 text-atlas-yellow px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
                <Palette className="w-3 h-3" />
                <span>Interactive Mabati Colour & Finish Studio</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-display font-black tracking-tight text-white">
                Preview All Factory Colours on Your Roof
              </h2>
            </div>

            {/* Mobile Expand/Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsExpandedMobile(!isExpandedMobile)}
              className="lg:hidden shrink-0 inline-flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-atlas-yellow border border-slate-700 px-3 py-2 rounded-xl text-[11px] font-bold cursor-pointer"
            >
              <span>{isExpandedMobile ? 'Hide 3D Roof' : 'Try 3D Roof'}</span>
              {isExpandedMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Horizontal Quick-Tap Swatch Strip (Always visible on mobile & desktop!) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {MASTER_COLOR_PALETTE.map(col => {
              const isSelected = selectedColor.id === col.id;
              const isFilterActive = activeColorFilter === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    handleSelectColor(col);
                    if (activeColorFilter) {
                      onSelectColorFilter(col.id);
                    }
                  }}
                  className={`group flex items-center space-x-2 px-3 py-2 rounded-xl border transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-slate-950 border-atlas-yellow shadow-md scale-[1.02]'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-inner relative flex items-center justify-center"
                    style={{ backgroundColor: col.hex }}
                  >
                    {isFilterActive && <Check className="w-2.5 h-2.5 text-white" />}
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] font-bold leading-none">{col.name}</span>
                    <span className={`block text-[9px] mt-0.5 leading-none ${isSelected ? 'text-slate-500' : 'text-slate-400'}`}>
                      {col.finishType.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Quick Action Strip when collapsed */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 lg:hidden">
          <div className="flex items-center space-x-2 text-[11px] text-slate-300">
            <span
              className="w-3 h-3 rounded-full inline-block border border-white/30"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <span className="font-bold text-white">{selectedColor.name}:</span>
            <span className="text-atlas-yellow font-semibold">{selectedColor.heatReduction}</span>
            <span className="text-slate-400">({matchingProducts.length} profiles)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectColorFilter(isFilteredByThisColor ? null : selectedColor.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                isFilteredByThisColor
                  ? 'bg-atlas-yellow text-slate-950'
                  : 'bg-slate-800 text-white border border-slate-700'
              }`}
            >
              <Filter className="w-3 h-3" />
              <span>{isFilteredByThisColor ? 'Showing This Colour (Reset)' : `Filter Catalog by ${selectedColor.name}`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Body (Always visible on Desktop, Expandable on Mobile) */}
      <div className={`${isExpandedMobile ? 'block' : 'hidden'} lg:block p-5 sm:p-8`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Interactive Kenyan Villa SVG Roof Visualizer */}
          <div className="lg:col-span-7 space-y-4">
            <div
              className={`relative rounded-2xl overflow-hidden border border-slate-700/80 p-4 sm:p-6 transition-colors duration-700 ${
                lighting === 'day'
                  ? 'bg-gradient-to-b from-sky-900/50 via-slate-900 to-slate-950'
                  : 'bg-gradient-to-b from-amber-900/40 via-rose-950/30 to-slate-950'
              }`}
            >
              {/* Top Controls Overlay */}
              <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center justify-between gap-2 mb-4 relative z-10">
                {/* Profile Texture Switcher */}
                <div className="flex flex-nowrap gap-1 overflow-x-auto overscroll-x-contain bg-slate-950/80 p-1 rounded-xl border border-slate-800 scrollbar-none">
                  {ROOF_TEXTURES.map(tex => (
                    <button
                      key={tex.id}
                      type="button"
                      onClick={() => setSelectedTexture(tex)}
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        selectedTexture.id === tex.id
                          ? 'bg-atlas-yellow text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tex.label}
                    </button>
                  ))}
                </div>

                {/* Day / Sunset Toggle */}
                <button
                  type="button"
                  onClick={() => setLighting(lighting === 'day' ? 'sunset' : 'day')}
                  className="inline-flex items-center space-x-1.5 bg-slate-950/80 hover:bg-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300 cursor-pointer"
                >
                  {lighting === 'day' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px]">Midday Sun</span>
                    </>
                  ) : (
                    <>
                      <Sunset className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-[10px]">Golden Hour</span>
                    </>
                  )}
                </button>
              </div>

              {/* Interactive Architectural Villa SVG */}
              <div className="relative w-full aspect-[15/7] min-h-[150px] flex items-center justify-center">
                <svg
                  viewBox="0 0 600 280"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-full h-auto max-h-64 drop-shadow-2xl select-none"
                  role="img"
                  aria-label={`Architectural Roof Preview in ${selectedColor.name}`}
                  shapeRendering="geometricPrecision"
                >
                  <defs>
                    {/* Primary Lit Slope Gradient */}
                    <linearGradient id="roofLitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor.hex} />
                      <stop offset="65%" stopColor={selectedColor.accentHex} />
                      <stop offset="100%" stopColor="#1e293b" />
                    </linearGradient>

                    {/* Secondary Shaded Slope Gradient (for 3D depth) */}
                    <linearGradient id="roofShadeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor.accentHex} />
                      <stop offset="60%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>

                    {/* Left Gable Slope Gradient */}
                    <linearGradient id="roofGableLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor.hex} />
                      <stop offset="100%" stopColor={selectedColor.accentHex} />
                    </linearGradient>

                    {/* Right Gable Slope Gradient */}
                    <linearGradient id="roofGableRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedColor.accentHex} />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>

                    {/* Dynamic Seamless Roof Profile Patterns (Padded inside cell boundaries to eliminate tile seams) */}
                    <pattern id="pattern-box-it4" width="20" height="20" patternUnits="userSpaceOnUse" overflow="visible">
                      <line x1="5" y1="0" x2="5" y2="20" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                      <line x1="12" y1="0" x2="12" y2="20" stroke="rgba(0,0,0,0.32)" strokeWidth="2.5" />
                    </pattern>

                    <pattern id="pattern-roman-tile" width="24" height="16" patternUnits="userSpaceOnUse" overflow="visible">
                      <path d="M 2 8 Q 12 2 22 8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                      <line x1="2" y1="14" x2="22" y2="14" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
                    </pattern>

                    <pattern id="pattern-stone-coated" width="20" height="14" patternUnits="userSpaceOnUse" overflow="visible">
                      <rect x="2" y="2" width="16" height="5" rx="1" fill="rgba(255,255,255,0.07)" />
                      <line x1="2" y1="12" x2="18" y2="12" stroke="rgba(0,0,0,0.36)" strokeWidth="1.5" />
                      <circle cx="6" cy="4" r="1" fill="rgba(255,255,255,0.22)" />
                      <circle cx="14" cy="8" r="1" fill="rgba(0,0,0,0.28)" />
                    </pattern>

                    <pattern id="pattern-corrugated" width="14" height="20" patternUnits="userSpaceOnUse" overflow="visible">
                      <line x1="4" y1="0" x2="4" y2="20" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                      <line x1="10" y1="0" x2="10" y2="20" stroke="rgba(0,0,0,0.28)" strokeWidth="2" />
                    </pattern>
                  </defs>

                  {/* Sun / Glow */}
                  <circle
                    cx={lighting === 'day' ? 490 : 520}
                    cy={lighting === 'day' ? 45 : 85}
                    r={lighting === 'day' ? 26 : 36}
                    fill={lighting === 'day' ? 'rgba(250, 204, 21, 0.22)' : 'rgba(251, 146, 60, 0.28)'}
                  />

                  {/* Ground / Lawn */}
                  <rect x="40" y="242" width="520" height="14" rx="7" fill="#064e3b" opacity="0.7" />
                  <rect x="20" y="250" width="560" height="8" rx="4" fill="#0f172a" />

                  {/* Main Villa Walls */}
                  <rect
                    x="95"
                    y="138"
                    width="410"
                    height="106"
                    fill={selectedWall.wallHex}
                    stroke={selectedWall.trimHex}
                    strokeWidth="2"
                  />
                  {/* Left Feature Gable Wing Wall (Keep apex beneath roof eaves to eliminate bleed lines) */}
                  <polygon
                    points="115,138 205,92 295,138"
                    fill={selectedWall.wallHex}
                    stroke={selectedWall.trimHex}
                    strokeWidth="1.5"
                  />
                  <rect
                    x="115"
                    y="138"
                    width="180"
                    height="106"
                    fill={selectedWall.wallHex}
                    stroke={selectedWall.trimHex}
                    strokeWidth="2"
                  />

                  {/* Windows & Architectural Details */}
                  <rect x="150" y="156" width="46" height="52" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="173" y1="156" x2="173" y2="208" stroke="#94a3b8" strokeWidth="2" />
                  <rect x="215" y="156" width="46" height="52" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="238" y1="156" x2="238" y2="208" stroke="#94a3b8" strokeWidth="2" />

                  {/* Entrance Door */}
                  <rect x="330" y="164" width="52" height="80" rx="3" fill="#451a03" stroke="#78350f" strokeWidth="3" />
                  <circle cx="372" cy="205" r="2.5" fill="#facc15" />

                  {/* Right Panoramic Window */}
                  <rect x="412" y="156" width="68" height="52" rx="4" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
                  <line x1="446" y1="156" x2="446" y2="208" stroke="#94a3b8" strokeWidth="2" />

                  {/* ================= 3D ROOF PLANES ================= */}
                  {/* 1. Left Hip Slope (Subtle side angle) */}
                  <polygon
                    points="65,140 165,54 165,140"
                    fill="url(#roofShadeGrad)"
                  />
                  <polygon
                    points="65,140 165,54 165,140"
                    fill={`url(#pattern-${selectedTexture.id})`}
                    opacity="0.85"
                    className="roof-texture"
                  />

                  {/* 2. Main Center-Right Roof Slope */}
                  <polygon
                    points="165,54 455,54 535,140 165,140"
                    fill="url(#roofLitGrad)"
                  />
                  <polygon
                    points="165,54 455,54 535,140 165,140"
                    fill={`url(#pattern-${selectedTexture.id})`}
                    className="roof-texture"
                  />

                  {/* 3. Right Hip Shading Wedge */}
                  <polygon
                    points="455,54 535,140 455,140"
                    fill="url(#roofShadeGrad)"
                    opacity="0.55"
                  />

                  {/* 4. Projecting Front Gable Wing (Two crisp 3D faces meeting at center ridge) */}
                  {/* Left Gable Pitch (Direct Sunlight) */}
                  <polygon
                    points="95,140 205,68 205,140"
                    fill="url(#roofGableLeftGrad)"
                  />
                  <polygon
                    points="95,140 205,68 205,140"
                    fill={`url(#pattern-${selectedTexture.id})`}
                    className="roof-texture"
                  />

                  {/* Right Gable Pitch (Subtle Shadow Side for Volume) */}
                  <polygon
                    points="205,68 315,140 205,140"
                    fill="url(#roofGableRightGrad)"
                  />
                  <polygon
                    points="205,68 315,140 205,140"
                    fill={`url(#pattern-${selectedTexture.id})`}
                    opacity="0.9"
                    className="roof-texture"
                  />

                  {/* ================= RIDGE CAPS & FASCIA BOARDS ================= */}
                  {/* Main Horizontal Ridge Cap */}
                  <line
                    x1="165"
                    y1="54"
                    x2="455"
                    y2="54"
                    stroke={selectedColor.hex}
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <line
                    x1="165"
                    y1="54"
                    x2="455"
                    y2="54"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Left & Right Hip Lines */}
                  <line
                    x1="165"
                    y1="54"
                    x2="65"
                    y2="140"
                    stroke={selectedColor.accentHex}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="455"
                    y1="54"
                    x2="535"
                    y2="140"
                    stroke={selectedColor.accentHex}
                    strokeWidth="5"
                    strokeLinecap="round"
                  />

                  {/* Front Gable Ridge Creaseline */}
                  <line
                    x1="205"
                    y1="68"
                    x2="205"
                    y2="140"
                    stroke={selectedColor.hex}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Front Gable Barge Boards (Left & Right) */}
                  <line
                    x1="205"
                    y1="68"
                    x2="95"
                    y2="140"
                    stroke={selectedColor.hex}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <line
                    x1="205"
                    y1="68"
                    x2="315"
                    y2="140"
                    stroke={selectedColor.hex}
                    strokeWidth="6"
                    strokeLinecap="round"
                  />

                  {/* Seamless Apex Cap (prevents any pixel gap at gable peak) */}
                  <circle
                    cx="205"
                    cy="68"
                    r="4"
                    fill={selectedColor.hex}
                  />

                  {/* PVC Gutter Line Across Eaves */}
                  <rect
                    x="62"
                    y="138"
                    width="476"
                    height="5"
                    rx="2.5"
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                </svg>

                {/* Live Active Spec Badge */}
                <div className="absolute bottom-2 left-2 bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl flex items-center space-x-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/40 shrink-0"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-[11px] font-bold text-white">
                    {selectedColor.name} • {selectedTexture.label}
                  </span>
                </div>
              </div>

              {/* Wall Color Pairing Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center">
                  <Home className="w-3.5 h-3.5 mr-1.5 text-atlas-yellow" />
                  Test Exterior House Wall Paint:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {WALL_FINISHES.map(wall => (
                    <button
                      key={wall.id}
                      type="button"
                      onClick={() => setSelectedWall(wall)}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition-all ${
                        selectedWall.id === wall.id
                          ? 'bg-white text-slate-950 border-white'
                          : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-400"
                        style={{ backgroundColor: wall.wallHex }}
                      />
                      <span>{wall.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Metallurgy, Thermal Performance & Instant Profile Jump */}
          <div className="lg:col-span-5 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-10 h-10 rounded-xl border-2 border-white/30 shadow-lg shrink-0"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-atlas-yellow block">
                        {selectedColor.finishType}
                      </span>
                      <h3 className="text-xl font-display font-black text-white leading-tight">
                        {selectedColor.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-slate-900 border border-slate-700 px-2.5 py-1 rounded-lg text-slate-300">
                    {selectedColor.hex}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedColor.architecturalVibe}
                </p>

                {/* Thermal & Climate Metrics */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center">
                      <ThermometerSnowflake className="w-3 h-3 mr-1 text-sky-400" />
                      Thermal Cooling
                    </span>
                    <span className="text-xs font-extrabold text-white mt-1 block">
                      {selectedColor.heatReduction}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{selectedColor.sriIndex}</span>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
                    <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center">
                      <ShieldCheck className="w-3 h-3 mr-1 text-emerald-400" />
                      Ideal Kenyan Zones
                    </span>
                    <span className="text-[11px] font-bold text-white mt-1 block line-clamp-2 leading-snug">
                      {selectedColor.bestForClimate}
                    </span>
                  </div>
                </div>

                {/* Profiles available in this colour */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Available in {matchingProducts.length} Certified Profiles (Tap to Configure):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                    {matchingProducts.slice(0, 6).map(prod => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => onInspectProductWithColor(prod, selectedColor.name)}
                        className="text-[10px] font-semibold bg-slate-900 hover:bg-atlas-blue text-slate-200 hover:text-white border border-slate-700/80 px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Layers className="w-2.5 h-2.5 text-atlas-yellow shrink-0" />
                        <span>{prod.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter Catalog Toggle Button */}
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectColorFilter(isFilteredByThisColor ? null : selectedColor.id)}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                      isFilteredByThisColor
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-atlas-yellow hover:bg-amber-400 text-slate-950 shadow-md'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>
                      {isFilteredByThisColor
                        ? `Filtered by ${selectedColor.name} (Click to Show All)`
                        : `Filter Catalog Below to ${selectedColor.name} (${matchingProducts.length})`}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
