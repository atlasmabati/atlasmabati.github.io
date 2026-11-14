import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  Layers,
  CheckCircle,
  MessageSquare,
  Compass,
  User,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  ShoppingBag,
  Scissors,
  TrendingDown,
  Hammer
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Product } from '../types';
import { getCalculatorEstimateWhatsAppUrl } from '../utils/whatsapp';

interface CostBreakdown {
  sheetsCost: number;
  timberCost: number;
  underlaymentCost: number;
  ridgeCapCost: number;
  valleyCost: number;
  screwsCost: number;
  gutterCost: number;
  laborCost: number;
  grandTotal: number;
}

/**
 * Extracts the real Effective Cover Width (in meters) from a product's specifications
 */
const parseEffectiveCoverWidthMeters = (product?: Product): number => {
  if (!product) return 1.015;
  for (const spec of product.specifications) {
    const label = spec.label.toLowerCase();
    if (label.includes('cover') || label.includes('effective') || label.includes('width')) {
      const match = spec.value.match(/(\d{3,4})\s*mm/i);
      if (match) {
        const mm = parseInt(match[1], 10);
        if (mm >= 300 && mm <= 1500) {
          return Number((mm / 1000).toFixed(3));
        }
      }
    }
  }
  if (product.category === 'stone-coated') return 1.27;
  if (product.id.includes('corrugated')) return 0.762;
  if (product.id.includes('it5')) return 1.06;
  return 1.015;
};

export const CalculatorPage: React.FC = () => {
  const { products, addToCart, logLead, trackCalculatorRun, trackColorSwatch } = useData();

  // Filter primary roof covering products (exclude gutters/screws from primary roof sheet selector)
  const roofCoveringProducts = useMemo(
    () =>
      products.filter(
        p =>
          p.category === 'roofing-profiles' ||
          p.category === 'premium-tiles' ||
          p.category === 'stone-coated'
      ),
    [products]
  );

  // Advanced Inputs
  const [calculationMode, setCalculationMode] = useState<'plinth' | 'directSqFt'>('plinth');
  const [directSqFt, setDirectSqFt] = useState<number>(2000);
  const [pitchType, setPitchType] = useState<'low' | 'standard' | 'steep' | 'extraSteep'>('standard');

  // Plinth standard inputs
  const [length, setLength] = useState<number>(14);
  const [width, setWidth] = useState<number>(10);
  const [roofType, setRoofType] = useState<'gable' | 'hip' | 'leanTo' | 'mono'>('hip');
  const [selectedProfileId, setSelectedProfileId] = useState<string>('box-it4-profile');
  const [selectedGauge, setSelectedGauge] = useState<string>('G28');
  const [selectedColor, setSelectedColor] = useState<string>('Charcoal Black');

  // Data Science Optimization toggles
  const [rollingStrategy, setRollingStrategy] = useState<'custom-cut' | 'standard-3m'>('custom-cut');
  const [framingType, setFramingType] = useState<'timber' | 'lgs-steel'>('timber');
  const [addedToBasketToast, setAddedToBasketToast] = useState(false);

  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerLocation, setCustomerLocation] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Material results & detailed cost breakdowns
  const [roofAreaSqM, setRoofAreaSqM] = useState<number>(0);
  const [effectiveCoverWidthM, setEffectiveCoverWidthM] = useState<number>(1.015);
  const [rafterCutLengthM, setRafterCutLengthM] = useState<number>(5.5);
  const [customCutSheetsCount, setCustomCutSheetsCount] = useState<number>(0);
  const [standard3mSheetsCount, setStandard3mSheetsCount] = useState<number>(0);
  const [wastagePct, setWastagePct] = useState<number>(0);
  const [wastageSavedKes, setWastageSavedKes] = useState<number>(0);

  const [ridgeCapMeters, setRidgeCapMeters] = useState<number>(0);
  const [valleyMeters, setValleyMeters] = useState<number>(0);
  const [screwsNeeded, setScrewsNeeded] = useState<number>(0);
  const [pvcGutterMeters, setPvcGutterMeters] = useState<number>(0);

  // Truss / Timber detail results
  const [rafterMeters, setRafterMeters] = useState<number>(0);
  const [purlinMeters, setPurlinMeters] = useState<number>(0);
  const [wallPlateMeters, setWallPlateMeters] = useState<number>(0);
  const [foilRolls, setFoilRolls] = useState<number>(0);

  const [costs, setCosts] = useState<CostBreakdown>({
    sheetsCost: 0,
    timberCost: 0,
    underlaymentCost: 0,
    ridgeCapCost: 0,
    valleyCost: 0,
    screwsCost: 0,
    gutterCost: 0,
    laborCost: 0,
    grandTotal: 0
  });

  const selectedProduct =
    roofCoveringProducts.find(p => p.id === selectedProfileId) ||
    roofCoveringProducts[0] ||
    products[0];

  // Ensure selectedColor stays valid when profile changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.colors.length > 0) {
      const exists = selectedProduct.colors.some(c => c.name === selectedColor);
      if (!exists) {
        setSelectedColor(selectedProduct.colors[0].name);
      }
    }
  }, [selectedProduct]);

  useEffect(() => {
    // 1. Flat Footprint Area & Estimated Dimensions
    const flatAreaSqM =
      calculationMode === 'plinth'
        ? length * width
        : Math.round((directSqFt / 10.764) * 10) / 10;

    // Aspect ratio 1.35:1 for directSqFt mode instead of unrealistic square
    const estimatedLength =
      calculationMode === 'plinth' ? length : Math.round(Math.sqrt(flatAreaSqM * 1.35) * 10) / 10;
    const estimatedWidth =
      calculationMode === 'plinth' ? width : Math.round(Math.sqrt(flatAreaSqM / 1.35) * 10) / 10;

    // 2. Slope Pitch Multiplier & Trigonometric Rafter Length
    // Low (12°): cos(12°) ≈ 0.978 -> 1.03x
    // Standard (22°): cos(22°) ≈ 0.927 -> 1.08x
    // Steep (32°): cos(32°) ≈ 0.848 -> 1.18x
    // Extra Steep (42°): cos(42°) ≈ 0.743 -> 1.35x
    const pitchMultiplier =
      pitchType === 'low'
        ? 1.03
        : pitchType === 'standard'
        ? 1.08
        : pitchType === 'steep'
        ? 1.18
        : 1.35;

    const hipComplexityFactor = roofType === 'hip' ? 1.04 : 1.0;
    const slopedArea = Math.round(flatAreaSqM * pitchMultiplier * hipComplexityFactor * 10) / 10;
    setRoofAreaSqM(slopedArea);

    // 3. True Rafter Slope Length (capped at 9.0m factory continuous rolling limit)
    const horizontalSpan =
      roofType === 'leanTo' || roofType === 'mono' ? estimatedWidth : estimatedWidth / 2;
    const rawRafterLength = (horizontalSpan + 0.35) * pitchMultiplier; // includes 350mm eave + soffit overhang
    const clampedRafterCut = Math.min(9.0, Math.max(2.0, Math.round(rawRafterLength * 10) / 10));
    setRafterCutLengthM(clampedRafterCut);

    // 4. Real Profile Effective Cover Width from Specifications
    const coverWidthM = parseEffectiveCoverWidthMeters(selectedProduct);
    setEffectiveCoverWidthM(coverWidthM);

    // 5. Compare Custom Continuous Roll-Cut vs Standard 3.0m Stock Sheets
    // Custom Continuous Cut: Each sheet is rolled to `clampedRafterCut` meters with zero end-laps
    const slopesCount = roofType === 'leanTo' || roofType === 'mono' ? 1 : 2;
    const columnsPerSlope = Math.ceil(estimatedLength / coverWidthM);
    const exactCustomSheets = Math.ceil(
      columnsPerSlope * slopesCount * (roofType === 'hip' ? 1.06 : 1.02)
    );
    setCustomCutSheetsCount(exactCustomSheets);

    // Standard 3.0m Stock Sheets: Requires 0.20m end-lap at every joint + off-cut waste
    const netEffective3mLength = 2.8; // 3.0m minus 200mm horizontal overlap
    const sheetsPerRafterRun = Math.ceil(clampedRafterCut / netEffective3mLength);
    const total3mSheets = Math.ceil(
      columnsPerSlope * slopesCount * sheetsPerRafterRun * (roofType === 'hip' ? 1.08 : 1.04)
    );
    setStandard3mSheetsCount(total3mSheets);

    // Total linear meters of steel required under both strategies
    const customLinearMeters = exactCustomSheets * clampedRafterCut;
    const standard3mLinearMeters = total3mSheets * 3.0;
    const extraLinearMetersWasted = Math.max(
      roundToOne(standard3mLinearMeters - customLinearMeters),
      roundToOne(customLinearMeters * 0.09)
    );
    const computedWastagePct = Math.round(
      (extraLinearMetersWasted / (customLinearMeters + extraLinearMetersWasted)) * 100
    );
    setWastagePct(computedWastagePct);

    // 6. Pricing per Linear Meter (Kenyan Shilling Wholesale Rates)
    let pricePerMeter = 950; // standard G28
    if (selectedGauge === 'G30') pricePerMeter = 750;
    if (selectedProduct?.category === 'premium-tiles') {
      pricePerMeter += 90;
    }
    if (selectedProduct?.category === 'stone-coated') {
      pricePerMeter = 1750;
    }

    const customCutCost = Math.round(customLinearMeters * pricePerMeter);
    const standard3mCost = Math.round((customLinearMeters + extraLinearMetersWasted) * pricePerMeter);
    const savedKes = Math.max(0, standard3mCost - customCutCost);
    setWastageSavedKes(savedKes);

    const activeSheetsCost = rollingStrategy === 'custom-cut' ? customCutCost : standard3mCost;

    // 7. Ridge Cap & Valley Meters
    const ridgeCapMultiplier =
      roofType === 'hip' ? 1.65 : roofType === 'leanTo' || roofType === 'mono' ? 0 : 1.0;
    const ridges = Math.round(estimatedLength * ridgeCapMultiplier * 10) / 10;
    setRidgeCapMeters(ridges);

    const valleys = roofType === 'hip' ? Math.round(estimatedWidth * 1.25) : 0;
    setValleyMeters(valleys);

    // 8. Rainwater PVC Gutters
    const gutters =
      Math.round(
        estimatedLength * (roofType === 'gable' ? 2 : roofType === 'hip' ? 2.6 : 1) * 10
      ) / 10;
    setPvcGutterMeters(gutters);

    // 9. Screws & Underlayment Foil
    const screws = Math.ceil(slopedArea * 6.5);
    setScrewsNeeded(screws);

    const rolls = Math.ceil(slopedArea / 50);
    setFoilRolls(rolls);

    // 10. Framing Structure: Treated Timber vs Light Gauge Steel (LGS)
    const rafters = Math.round(flatAreaSqM * 1.2);
    const purlins = Math.round(flatAreaSqM * 2.5);
    const wallPlates = Math.round(2 * (estimatedLength + estimatedWidth));
    setRafterMeters(rafters);
    setPurlinMeters(purlins);
    setWallPlateMeters(wallPlates);

    const timberFramingCost = rafters * 125 + purlins * 65 + wallPlates * 150;
    const lgsSteelFramingCost = Math.round(timberFramingCost * 1.28); // LGS is ~28% higher upfront, zero timber rot
    const activeFramingCost = framingType === 'lgs-steel' ? lgsSteelFramingCost : timberFramingCost;

    const underlaymentCost = rolls * 3500;
    const ridgeCapCost = Math.ceil(ridges / 2.4) * 850;
    const valleyCost = Math.ceil(valleys / 2.4) * 950;
    const screwPackets = Math.ceil(screws / 100);
    const screwsCost = screwPackets * 1200;
    const gutterCost = Math.ceil(gutters / 3.0) * 1350;

    const laborRate =
      pitchType === 'low' ? 250 : pitchType === 'standard' ? 300 : pitchType === 'steep' ? 350 : 450;
    const laborCost = Math.round(slopedArea * laborRate);

    const grandTotal =
      activeSheetsCost +
      activeFramingCost +
      underlaymentCost +
      ridgeCapCost +
      valleyCost +
      screwsCost +
      gutterCost +
      laborCost;

    setCosts({
      sheetsCost: activeSheetsCost,
      timberCost: activeFramingCost,
      underlaymentCost,
      ridgeCapCost,
      valleyCost,
      screwsCost,
      gutterCost,
      laborCost,
      grandTotal
    });
  }, [
    calculationMode,
    directSqFt,
    pitchType,
    length,
    width,
    roofType,
    selectedProfileId,
    selectedGauge,
    selectedProduct,
    rollingStrategy,
    framingType
  ]);

  const activeSheetsCount =
    rollingStrategy === 'custom-cut' ? customCutSheetsCount : standard3mSheetsCount;

  const handleLoadFullBoqToCart = () => {
    if (!selectedProduct) return;
    const colorObj =
      selectedProduct.colors.find(c => c.name === selectedColor) ||
      selectedProduct.colors[0] || { name: selectedColor, hex: '#2C3E50' };

    // 1. Add Main Roofing Sheets
    addToCart({
      id: `${selectedProduct.id}-${selectedGauge}-${colorObj.name.replace(/\s+/g, '-')}-calc`,
      product: selectedProduct,
      selectedColor: colorObj,
      selectedGauge,
      quantity: activeSheetsCount,
      length:
        rollingStrategy === 'custom-cut'
          ? `Custom ${rafterCutLengthM}m Cut`
          : '3.0 meters (Standard)'
    });

    // 2. Add Matching Ridge Caps if applicable
    const ridgeProduct = products.find(p => p.id === 'ridge-cap-valley' || p.id === 'round-ridge-cap');
    if (ridgeProduct && ridgeCapMeters > 0) {
      addToCart({
        id: `${ridgeProduct.id}-${selectedGauge}-${colorObj.name.replace(/\s+/g, '-')}-calc`,
        product: ridgeProduct,
        selectedColor: colorObj,
        selectedGauge,
        quantity: Math.ceil((ridgeCapMeters + valleyMeters) / 2.2),
        length: '2.4 meters'
      });
    }

    // 3. Add PVC Gutters
    const gutterProduct = products.find(p => p.id === 'premium-pvc-gutter');
    if (gutterProduct && pvcGutterMeters > 0) {
      addToCart({
        id: `${gutterProduct.id}-calc`,
        product: gutterProduct,
        selectedColor: gutterProduct.colors[0] || { name: 'Charcoal Black', hex: '#1E293B' },
        selectedGauge: 'Heavy Duty UV',
        quantity: Math.ceil(pvcGutterMeters / 3.0),
        length: '3.0 meters'
      });
    }

    // 4. Add Waterproof Screws
    const screwProduct = products.find(p => p.id === 'self-tapping-screws');
    if (screwProduct && screwsNeeded > 0) {
      addToCart({
        id: `${screwProduct.id}-calc`,
        product: screwProduct,
        selectedColor: colorObj,
        selectedGauge: 'EPDM Sealed',
        quantity: Math.ceil(screwsNeeded / 100),
        length: 'Packet of 100 pcs'
      });
    }

    trackCalculatorRun(wastageSavedKes, rollingStrategy === 'custom-cut');
    setAddedToBasketToast(true);
    setTimeout(() => setAddedToBasketToast(false), 2500);
  };

  const sendQuoteToWhatsApp = () => {
    const footprintText =
      calculationMode === 'plinth' ? `${length}m × ${width}m` : `${directSqFt} sq ft`;

    trackCalculatorRun(wastageSavedKes, rollingStrategy === 'custom-cut');
    logLead({
      customerName: customerName || 'Calculator Builder',
      customerPhone: 'Via WhatsApp',
      location: customerLocation || 'Kenya',
      source: 'calculator',
      profileTitle: selectedProduct?.title || 'Box IT4 Profile',
      gauge: selectedGauge,
      colorName: selectedColor,
      estimatedAreaSqM: roofAreaSqM,
      estimatedValueKes: costs.grandTotal,
      itemsSummary: `${activeSheetsCount} pcs ${
        rollingStrategy === 'custom-cut' ? `${rafterCutLengthM}m Custom` : '3.0m'
      } ${selectedProduct?.title} (${selectedGauge}, ${selectedColor}), ${ridgeCapMeters}m Ridges, ${pvcGutterMeters}m Gutters`,
      notes: specialNotes
    });

    const whatsappUrl = getCalculatorEstimateWhatsAppUrl({
      customerName,
      customerLocation,
      calculationMode,
      roofType,
      footprintText,
      pitchType,
      slopedAreaSqM: roofAreaSqM,
      profileTitle: selectedProduct?.title || 'Box IT4 Profile',
      effectiveCoverWidthM,
      selectedGauge,
      selectedColor,
      rollingStrategy,
      rafterCutLengthM,
      sheetsCount: activeSheetsCount,
      wastageSavedKes: rollingStrategy === 'custom-cut' ? wastageSavedKes : 0,
      ridgeCapMeters,
      valleyMeters,
      pvcGutterMeters,
      screwsNeeded,
      foilRolls,
      framingType,
      rafterMeters,
      purlinMeters,
      wallPlateMeters,
      costs,
      specialNotes
    });

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 bg-atlas-blue/10 text-atlas-blue px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-atlas-blue" />
            <span>Data-Driven Estimator & Cut Optimizer v2.5</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
            Precision Roofing Calculator{' '}
            <span className="text-atlas-blue font-black">& Wastage Optimizer</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Powered by each profile's exact millimeter cover width. Compare custom factory
            continuous cuts (up to 9.0m) against standard 3.0m stock sheets to eliminate joint
            overlaps and save thousands of shillings.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Col 1: Calculator Input Fields (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-5 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 pb-5">
                <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 flex items-center">
                  <Layers className="w-5 h-5 text-atlas-blue mr-2.5" />
                  1. Building Footprint & Geometry
                </h2>

                {/* Mode Switcher */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCalculationMode('plinth')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      calculationMode === 'plinth'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Plinth (Length × Width)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalculationMode('directSqFt')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      calculationMode === 'directSqFt'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Direct Area (Sq Ft)
                  </button>
                </div>
              </div>

              {calculationMode === 'plinth' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Building Length (Meters)
                    </label>
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        min="2"
                        max="150"
                        value={length}
                        onChange={e => setLength(Math.max(2, Number(e.target.value)))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-atlas-blue/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        m
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Total run along the ridge / fascia board
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Building Span / Width (Meters)
                    </label>
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        min="2"
                        max="100"
                        value={width}
                        onChange={e => setWidth(Math.max(2, Number(e.target.value)))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-atlas-blue/20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        m
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Total width across gable/truss span
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Roof Footprint Area (Square Feet)
                  </label>
                  <div className="relative rounded-lg">
                    <input
                      type="number"
                      min="100"
                      max="30000"
                      step="50"
                      value={directSqFt}
                      onChange={e => setDirectSqFt(Math.max(100, Number(e.target.value)))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-atlas-blue/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      sq ft
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Flat horizontal ground floor plinth area.
                  </p>
                </div>
              )}

              {/* Pitch Angle Multiplier Control */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Roof Pitch (Slope Steepness)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'low', label: 'Low (10°–15°)', desc: '1.03x slope factor' },
                    { id: 'standard', label: 'Standard (20°–25°)', desc: '1.08x slope factor' },
                    { id: 'steep', label: 'Steep (30°–35°)', desc: '1.18x slope factor' },
                    { id: 'extraSteep', label: 'High Gable (40°+)', desc: '1.35x slope factor' }
                  ].map(pitch => (
                    <button
                      key={pitch.id}
                      type="button"
                      onClick={() => setPitchType(pitch.id as any)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        pitchType === pitch.id
                          ? 'border-atlas-blue bg-atlas-blue/5 text-atlas-blue ring-2 ring-atlas-blue/10'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Compass
                        className={`w-4 h-4 mb-1 ${
                          pitchType === pitch.id ? 'text-atlas-blue' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-xs font-bold">{pitch.label}</span>
                      <span className="text-[9px] text-slate-400 leading-tight mt-0.5">
                        {pitch.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Roof Type Architecture Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Roof Architecture Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'gable', label: 'Gable Roof', desc: 'Dual slopes + 1 ridge' },
                    { id: 'hip', label: 'Hip Roof', desc: '4 slopes + valleys' },
                    { id: 'leanTo', label: 'Lean-To Slope', desc: 'Single slanted span' },
                    { id: 'mono', label: 'Mono-Pitch Flat', desc: 'Modern parapet deck' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setRoofType(type.id as any)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        roofType === type.id
                          ? 'border-atlas-blue bg-atlas-blue/5 text-atlas-blue ring-2 ring-atlas-blue/10'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <Layers
                        className={`w-4 h-4 mb-1 ${
                          roofType === type.id ? 'text-atlas-blue' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-xs font-bold">{type.label}</span>
                      <span className="text-[9px] text-slate-400 leading-tight mt-0.5">
                        {type.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 2: Profile, Rolling Strategy & Truss Structure */}
              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 flex items-center border-b border-slate-100 pb-4 pt-2">
                <ShieldCheck className="w-5 h-5 text-atlas-blue mr-2.5" />
                2. Profile, Cut Optimization & Truss System
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Primary Roofing Profile
                    </label>
                    <span className="text-[10px] font-mono font-bold text-atlas-blue bg-atlas-blue/10 px-2 py-0.5 rounded">
                      Effective Cover Width: {effectiveCoverWidthM}m ({Math.round(effectiveCoverWidthM * 1000)}mm)
                    </span>
                  </div>
                  <select
                    value={selectedProfileId}
                    onChange={e => setSelectedProfileId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-atlas-blue/15 focus:bg-white cursor-pointer"
                  >
                    {roofCoveringProducts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.title} — ({p.categoryLabel} • Cover: {parseEffectiveCoverWidthMeters(p)}m)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gauge Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Steel Thickness (Gauge)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['G30', 'G28'].map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSelectedGauge(g)}
                          className={`py-2 px-3 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                            selectedGauge === g
                              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {g}
                          <span className="block text-[8px] font-normal text-slate-400 mt-0.5">
                            {g === 'G30' ? 'Economy' : g === 'G28' ? 'Standard' : 'Industrial'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Finish Colour
                    </label>
                    <select
                      value={selectedColor}
                      onChange={e => {
                        setSelectedColor(e.target.value);
                        trackColorSwatch(e.target.value);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-atlas-blue/15 focus:bg-white cursor-pointer"
                    >
                      {selectedProduct?.colors.map(c => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DATA SCIENCE WASTAGE OPTIMIZER CARD */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider text-atlas-yellow">
                      <Scissors className="w-3.5 h-3.5" />
                      <span>Mill Cut-Length & Overlap Wastage Optimizer</span>
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                      Save KSh {wastageSavedKes.toLocaleString()} ({wastagePct}% less waste)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRollingStrategy('custom-cut')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        rollingStrategy === 'custom-cut'
                          ? 'bg-white text-slate-950 border-atlas-yellow ring-2 ring-atlas-yellow/40'
                          : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold">
                          ★ Custom Rafter Cut ({rafterCutLengthM}m)
                        </span>
                        <span className="text-[9px] font-bold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded">
                          Recommended
                        </span>
                      </div>
                      <p
                        className={`text-[10px] mt-1 leading-snug ${
                          rollingStrategy === 'custom-cut' ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        Rolled to exact {rafterCutLengthM}m rafter span (~{customCutSheetsCount}{' '}
                        sheets). Zero horizontal joints or overlap scrap.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRollingStrategy('standard-3m')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        rollingStrategy === 'standard-3m'
                          ? 'bg-white text-slate-950 border-atlas-yellow'
                          : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-extrabold">Standard 3.0m Stock Sheets</span>
                        <span className="text-[9px] font-mono opacity-75">
                          ~{standard3mSheetsCount} sheets
                        </span>
                      </div>
                      <p
                        className={`text-[10px] mt-1 leading-snug ${
                          rollingStrategy === 'standard-3m' ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        Includes 200mm horizontal end-laps per joint (+{wastagePct}% extra steel
                        cost).
                      </p>
                    </button>
                  </div>
                </div>

                {/* Truss Framing Selector (Timber vs Light Gauge Steel) */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center">
                    <Hammer className="w-3.5 h-3.5 mr-1.5 text-atlas-blue" />
                    Roof Truss Framing System
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setFramingType('timber')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        framingType === 'timber'
                          ? 'border-atlas-blue bg-atlas-blue/5 text-slate-900 ring-2 ring-atlas-blue/10'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold block">
                        Treated Timber Rafters & Purlins
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Standard 4×2 rafters & 2×2 purlins • Lower upfront cost
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFramingType('lgs-steel')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        framingType === 'lgs-steel'
                          ? 'border-atlas-blue bg-atlas-blue/5 text-slate-900 ring-2 ring-atlas-blue/10'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs font-bold block">
                        Atlas Light Gauge Steel (LGS) Trusses
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        100% Termite-proof, fireproof G550 steel • Zero timber rot
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 flex items-center border-b border-slate-100 pb-4 pt-2">
                <User className="w-5 h-5 text-atlas-blue mr-2.5" />
                3. Your Site Information (For Instant Quote Dispatch)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Stephen Kimaru"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-atlas-blue/15 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Site Delivery Location in Kenya
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ruiru, Machakos, Nakuru, Eldoret"
                    value={customerLocation}
                    onChange={e => setCustomerLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-atlas-blue/15 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Special Instructions or Custom Blueprints
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific truss spans, fascia details, or delivery timing..."
                  value={specialNotes}
                  onChange={e => setSpecialNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-atlas-blue/15 focus:bg-white resize-none"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Calculated Estimates Panel (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-slate-900 text-white rounded-3xl shadow-xl overflow-hidden border border-slate-800">
              {/* Header block */}
              <div className="bg-gradient-to-r from-atlas-blue to-sky-950 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-atlas-yellow tracking-widest block">
                      Atlas Engineering BOQ Engine
                    </span>
                    <h3 className="text-xl font-display font-black">
                      Complete Roof Bill of Quantities
                    </h3>
                  </div>
                  <Sparkles className="w-5 h-5 text-atlas-yellow animate-pulse" />
                </div>
              </div>

              {/* Data Rows */}
              <div className="p-6 space-y-4 text-xs">
                {/* Structural Area & Sheet Cut Metrics */}
                <div className="grid grid-cols-3 gap-2.5 pb-3 border-b border-slate-800/80">
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">
                      Sloped Area
                    </span>
                    <span className="font-display font-black text-white text-sm sm:text-base mt-0.5 block">
                      {roofAreaSqM} m²
                    </span>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">
                      {rollingStrategy === 'custom-cut'
                        ? `${rafterCutLengthM}m Custom Sheets`
                        : '3.0m Stock Sheets'}
                    </span>
                    <span className="font-display font-black text-atlas-yellow text-sm sm:text-base mt-0.5 block">
                      ~{activeSheetsCount} pcs
                    </span>
                  </div>
                  <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">
                      Cover Width
                    </span>
                    <span className="font-display font-black text-emerald-400 text-sm sm:text-base mt-0.5 block">
                      {effectiveCoverWidthM} m
                    </span>
                  </div>
                </div>

                {/* Costs list receipt */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                    <span className="flex items-center">
                      <FileText className="w-3.5 h-3.5 mr-1 text-atlas-yellow" />
                      Wholesale Itemized Cost Breakdown
                    </span>
                    <span>KSh</span>
                  </h4>

                  {/* Mabati cost */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 font-semibold block">
                        {selectedProduct?.title} ({selectedGauge})
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        {activeSheetsCount} sheets ×{' '}
                        {rollingStrategy === 'custom-cut' ? `${rafterCutLengthM}m custom cut` : '3.0m'}{' '}
                        • {selectedColor}
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {costs.sheetsCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Framing structure cost */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 font-semibold block">
                        {framingType === 'lgs-steel'
                          ? 'Light Gauge Steel (LGS) Trusses'
                          : 'Treated Timber Framing'}
                      </span>
                      <span className="text-[9px] text-slate-400 block">
                        ~{rafterMeters}m rafters, {purlinMeters}m purlins, {wallPlateMeters}m wall
                        plates
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {costs.timberCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Underlayment barrier foil rolls */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 block">Thermal Moisture Barrier Foil</span>
                      <span className="text-[9px] text-slate-400 block">
                        {foilRolls} rolls (50m² double-sided radiant shield)
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {costs.underlaymentCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Ridge & Valleys */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 block">Matching Ridge Caps & Valleys</span>
                      <span className="text-[9px] text-slate-400 block">
                        ~{ridgeCapMeters}m ridges / {valleyMeters}m valleys
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {(costs.ridgeCapCost + costs.valleyCost).toLocaleString()}
                    </span>
                  </div>

                  {/* Self tapping screws */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 block">EPDM Waterproof Roofing Screws</span>
                      <span className="text-[9px] text-slate-400 block">
                        {screwsNeeded} pcs ({Math.ceil(screwsNeeded / 100)} packets of 100)
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {costs.screwsCost.toLocaleString()}
                    </span>
                  </div>

                  {/* PVC drainage gutters */}
                  <div className="flex justify-between items-center py-0.5">
                    <div>
                      <span className="text-slate-200 block">UV-Stabilized PVC Gutter System</span>
                      <span className="text-[9px] text-slate-400 block">
                        ~{pvcGutterMeters}m fascia drainage run
                      </span>
                    </div>
                    <span className="font-bold text-white">
                      KSh {costs.gutterCost.toLocaleString()}
                    </span>
                  </div>

                  {/* Professional Rigger Labor */}
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-300">Estimated Installation Labor</span>
                    <span className="font-bold text-white">
                      KSh {costs.laborCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Custom Cut Savings Callout */}
                {rollingStrategy === 'custom-cut' && wastageSavedKes > 0 && (
                  <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-[11px]">
                    <span className="flex items-center text-emerald-300 font-bold">
                      <TrendingDown className="w-4 h-4 mr-1.5 text-emerald-400 shrink-0" />
                      Custom Continuous-Cut Savings Included:
                    </span>
                    <span className="font-extrabold text-emerald-400">
                      - KSh {wastageSavedKes.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Grand total highlight */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-center">
                  <span className="text-[9px] font-extrabold text-atlas-yellow uppercase tracking-widest block">
                    Estimated Complete Roof Budget
                  </span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-white block">
                    KSh {costs.grandTotal.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    *Includes sheets, trusses, ridges, gutters, foil, screws & labor estimate.
                  </span>
                </div>

                {/* Action Buttons: Load Full BOQ into Basket OR Dispatch to WhatsApp */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    onClick={sendQuoteToWhatsApp}
                    className="w-full flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-black py-3.5 px-5 rounded-2xl shadow-lg transition-transform hover:scale-[1.01] text-xs cursor-pointer uppercase tracking-wider"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 shrink-0" />
                    Dispatch Full BOQ to WhatsApp
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={handleLoadFullBoqToCart}
                    className={`w-full flex items-center justify-center font-bold py-3 px-4 rounded-2xl border text-xs transition-all cursor-pointer ${
                      addedToBasketToast
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                    }`}
                  >
                    {addedToBasketToast ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-white" />
                        Added Full Roof Package to Quote Basket!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 mr-2 text-atlas-yellow" />
                        Load All Calculated Items into Quote Basket
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick trust help guidelines card */}
            <div className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-3 text-sm">
              <h4 className="font-display font-bold text-slate-900 flex items-center text-xs sm:text-sm">
                <Info className="w-4 h-4 text-atlas-blue mr-2" />
                Why Custom Continuous Cuts Save You Money
              </h4>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex items-start">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    Standard 3.0m sheets require a 200mm overlap at every horizontal joint, wasting
                    8–14% of your steel budget.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    Atlas rolls continuous single-length sheets up to 9.0m matching your exact{' '}
                    <strong>{rafterCutLengthM}m</strong> rafter span—zero mid-roof joints and zero
                    leaks.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function roundToOne(num: number): number {
  return Math.round(num * 10) / 10;
}
