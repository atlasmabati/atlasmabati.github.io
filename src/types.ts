export interface ProductSpecification {
  label: string;
  value: string;
}

export type ProductCategory = 
  | 'roofing-profiles' 
  | 'premium-tiles' 
  | 'stone-coated' 
  | 'pvc-gutters' 
  | 'rainwater-fittings' 
  | 'light-gauge-steel' 
  | 'asphalt-shingles' 
  | 'accessories';

export interface ProductCategoryMeta {
  id: ProductCategory;
  label: string;
  shortLabel: string;
  desc: string;
  isPrimaryRoofCover: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategoryMeta[] = [
  {
    id: 'roofing-profiles',
    label: 'Roofing Profiles',
    shortLabel: 'Profiles',
    desc: 'Continuous-rolled high-tensile alu-zinc sheets',
    isPrimaryRoofCover: true
  },
  {
    id: 'premium-tiles',
    label: 'Premium Steel Tiles',
    shortLabel: 'Steel Tiles',
    desc: 'Mediterranean scalloped wave and curved architectural profiles',
    isPrimaryRoofCover: true
  },
  {
    id: 'stone-coated',
    label: 'Stone Coated Tiles',
    shortLabel: 'Stone Coated',
    desc: 'Basalt volcanic stone chip armor with silent rain acoustics',
    isPrimaryRoofCover: true
  },
  {
    id: 'pvc-gutters',
    label: 'PVC Gutters',
    shortLabel: 'PVC Gutters',
    desc: 'UV-stabilized leak-proof drainage channels and fittings',
    isPrimaryRoofCover: false
  },
  {
    id: 'accessories',
    label: 'Roof Accessories',
    shortLabel: 'Accessories',
    desc: 'Light gauge steel trusses, ridge caps, valleys, foil & screws',
    isPrimaryRoofCover: false
  }
];

export const getCategoryLabel = (category: ProductCategory): string => {
  const found = PRODUCT_CATEGORIES.find(c => c.id === category);
  return found ? found.label : 'Roofing Profiles';
};

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  extendedDescription: string;
  features: string[];
  specifications: ProductSpecification[];
  colors: { name: string; hex: string }[];
  imagePath: string;
  images?: string[];
  gaugeRange: string;
  isPopular?: boolean;
}

export interface QuoteItem {
  id: string; // generated as product.id-gauge-color
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedGauge: string;
  quantity: number;
  length: string; // e.g. "3.0 meters" or "Custom"
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'factory' | 'products' | 'projects';
  imagePath: string;
  description: string;
}

// ==================== INTERACTIVE COLOUR STUDIO TYPES ====================
export interface MasterColorFinish {
  id: string;
  name: string;
  hex: string;
  accentHex: string;
  finishType: 'Matte Texturized' | 'High-Gloss Polymer' | 'Volcanic Stone Chip' | 'Natural Aluzinc';
  sriIndex: string; // Solar Reflectance Index
  heatReduction: string;
  bestForClimate: string;
  architecturalVibe: string;
  matchingKeywords: string[]; // matches product color names
}

// ==================== DATA ANALYST & CRM TELEMETRY TYPES ====================
export type LeadSource = 'calculator' | 'quote-basket' | 'contact-form' | 'product-direct' | 'wishlist';
export type LeadStatus = 'new' | 'contacted' | 'dispatched' | 'won';
export type LeadPropensity = 'hot-commercial' | 'high-intent-villa' | 'standard-residential';

export interface LeadRecord {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  location: string;
  source: LeadSource;
  profileTitle: string;
  gauge: string;
  colorName: string;
  estimatedAreaSqM: number;
  estimatedValueKes: number;
  status: LeadStatus;
  propensity: LeadPropensity;
  itemsSummary: string;
  notes?: string;
}

export interface AnalyticsMetrics {
  colorSwatchClicks: Record<string, number>;
  profileViews: Record<string, number>;
  gaugeSelections: Record<string, number>;
  calculatorRuns: number;
  customCutSelections: number;
  totalWastageSavedKes: number;
}
