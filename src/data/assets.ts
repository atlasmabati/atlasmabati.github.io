import { Product } from '../types';

/**
 * ATLAS MABATI V2 - Asset Infrastructure Configuration
 * 
 * This file decouples all image assets from the page layouts, enabling
 * seamless future backend integration (Firebase, PostgreSQL, S3, etc.).
 * 
 * If a local image doesn't exist yet, the `AtlasImage` component automatically
 * detects the failure and loads a high-quality, relevant fallback image.
 */

export interface HeroSlide {
  title: string;
  highlight: string;
  description: string;
  tag: string;
  bgImage: string;
  fallback: string;
}

export interface ShowcaseImage {
  src: string;
  alt: string;
  label: string;
}

export interface ManufacturingStage {
  title: string;
  desc: string;
  image: string;
  fallback: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'industrial' | 'government' | 'educational' | 'agricultural' | 'church' | 'warehouse';
  categoryLabel: string;
  location: string;
  profileUsed: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Management' | 'Sales' | 'Production' | 'Machine Operators' | 'Engineers' | 'Logistics' | 'Customer Support';
  image: string;
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  project: string;
  rating: number;
  projectLocation: string;
  customerPhoto: string;
  companyLogo?: string;
  projectImage?: string;
}

export interface ColorSystemAsset {
  id: string;
  name: string;
  hex: string;
  svgPath?: string;
}

// 1. HERO SHOWCASE SLIDES (8 Expanded Slides)
export const HERO_SLIDES: HeroSlide[] = [
  {
    tag: "Factory Headquarters",
    title: "Quality Steel Roofing Solutions",
    highlight: "Built For Kenya",
    description: "Manufacturing premium roofing profiles and accessories for homes, businesses, and construction projects. Engineered to withstand elements and deliver timeless beauty.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "hero"
  },
  {
    tag: "Premium Roofing Installation",
    title: "Roman Tile Residence",
    highlight: "Silent Rain Acoustics",
    description: "Experience absolute luxury with stone-coated Decra shingles that eliminate rain noise, offer fireproof protection, and last for generations.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "project-1"
  },
  {
    tag: "Box IT4 Industrial Building",
    title: "Factory-Direct Wholesale Pricing",
    highlight: "Save Up To 25%",
    description: "By buying directly from our rolling mill with zero middlemen markups, you enjoy the best wholesale rates in East Africa.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "project-2"
  },
  {
    tag: "Manufacturing Plant",
    title: "Custom Length Rolling Mills",
    highlight: "Precision to 9 Meters",
    description: "Order continuous-rolled panels custom-fit to your rafter layout. Minimize joints, reduce side-leaks, and cut construction waste.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "factory-1"
  },
  {
    tag: "Steel Coil Production",
    title: "Raw Alu-Zinc Steel Coils",
    highlight: "High-Tensile Strength",
    description: "Imported from certified steel mills, our coils feature optimal aluminum-zinc alloys ensuring superior heat reflectance and core rust protection.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "factory-2"
  },
  {
    tag: "Delivery Fleet",
    title: "24–48 Hour Delivery Guarantee",
    highlight: "Direct To Your Site",
    description: "With our specialized logistics fleet, we deliver custom-cut roofing sheets straight to your construction site anywhere in Kenya.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "project-3"
  },
  {
    tag: "Professional Team",
    title: "Expert Structural Guidance",
    highlight: "Architect-Level Calculations",
    description: "Our core engineering desk transforms your building sketches into precise structural profiles and material takeoffs.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "factory-3"
  },
  {
    tag: "Premium Roofing Installation",
    title: "Perfect Waterproof Interlocking",
    highlight: "Leak-Proof Performance",
    description: "Engineered capillary grooves and tight side overlays defend your home against Naivasha storms or coastal humidity.",
    bgImage: "/images/hero/hero-1.png",
    fallback: "project-1"
  }
];

// 2. HIGH QUALITY PRODUCTS GALLERY (5 Slider Images)
export const HIGH_QUALITY_SHOWCASE: ShowcaseImage[] = [
  {
    src: "/images/about/premium-steel-sheets.jpg",
    alt: "Premium Matte Coated Steel Sheets",
    label: "Premium Steel Sheets"
  },
  {
    src: "/images/about/factory-inspection.jpg",
    alt: "Atlas Quality Factory Inspection Desk",
    label: "Factory Inspection"
  },
  {
    src: "/images/about/delivery-truck.jpg",
    alt: "Atlas Specialized Logistics Delivery Truck",
    label: "Delivery Fleet"
  },
  {
    src: "/images/about/warehouse-inventory.jpg",
    alt: "Large Stock of Raw Steel Coils and Accessories",
    label: "Warehouse Inventory"
  },
  {
    src: "/images/about/professional-installation.jpg",
    alt: "Roofer Fitting Continuous Box Profile Sheets",
    label: "Professional Installation"
  }
];

// 3. MANUFACTURING PRODUCTION GALLERIES (10 Step-by-Step Production Stages)
export const MANUFACTURING_STAGES: ManufacturingStage[] = [
  {
    title: "1. Steel Coils",
    desc: "Sourcing premium high-tensile alu-zinc core steel coils with heat-repellent coatings.",
    image: "/images/manufacturing/steel-coils.webp",
    fallback: "factory-1"
  },
  {
    title: "2. Hydraulic Decoiler",
    desc: "Uncoiling heavy steel rolls uniformly into high-precision feeding guides.",
    image: "/images/manufacturing/hydraulic-decoiler.jpeg",
    fallback: "factory-2"
  },
  {
    title: "3. Roll Forming",
    desc: "Continuous automated roll-dies shaping beautiful, consistent high-shoulder rib profiles.",
    image: "/images/manufacturing/roll-forming.jpeg",
    fallback: "factory-3"
  },
  {
    title: "4. Die Pressing",
    desc: "High-pressure hydraulic stampers adding standard Mediterranean scalloped steps.",
    image: "/images/manufacturing/die-pressing.jpeg",
    fallback: "roman-tile"
  },
  {
    title: "5. Length Measurement",
    desc: "Electronic encoders monitoring sheet length down to single-millimeter tolerances.",
    image: "/images/manufacturing/length-measurement.jpg",
    fallback: "box-it4"
  },
  {
    title: "6. Hydraulic Cutting",
    desc: "High-speed shearing guillotines cutting profile boards cleanly with no frayed edges.",
    image: "/images/manufacturing/hydraulic-cutting.jpeg",
    fallback: "corrugated"
  },
  {
    title: "7. Quality Inspection",
    desc: "Inspecting surface thickness, protective film cover, and color finish durability.",
    image: "/images/manufacturing/quality-inspection.jpg",
    fallback: "factory-2"
  },
  {
    title: "8. Packaging",
    desc: "Waterproof wrapping and edge guards preventing damage during transit and loading.",
    image: "/images/manufacturing/packaging.jpg",
    fallback: "factory-1"
  },
  {
    title: "9. Loading",
    desc: "Heavy-duty forklifts loading packaged crates onto custom flatbed logistics trucks.",
    image: "/images/manufacturing/loading.jpg",
    fallback: "factory-3"
  },
  {
    title: "10. Dispatch",
    desc: "Fast-transit delivery vehicles leaving the factory floor for site locations across Kenya.",
    image: "/images/manufacturing/dispatch.jpg",
    fallback: "project-3"
  }
];

// 4. EXPANDED PORTFOLIO (Residential, Commercial, Industrial, Government, Educational, Agricultural, Church, Warehouse)
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-res-1',
    title: 'Luxury Residential Estate',
    category: 'residential',
    categoryLabel: 'Residential Projects',
    location: 'Runda, Nairobi',
    profileUsed: 'Roman Tile Profile (Charcoal Black)',
    description: 'A premium 5-bedroom home roofed with Roman Tile profiles, creating an elegant Mediterranean theme with completely silent rain acoustics.',
    coverImage: '/images/portfolio/residential-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/residential-1/cover.jpg',
      '/images/portfolio/residential-1/detail-1.jpg',
      '/images/portfolio/residential-1/detail-2.jpg'
    ]
  },
  {
    id: 'proj-com-1',
    title: 'Thika Road Commercial Square',
    category: 'commercial',
    categoryLabel: 'Commercial Projects',
    location: 'Thika Road, Nairobi',
    profileUsed: 'Maxcover IT5 Profile (Forest Green)',
    description: 'Modern shopping complex featuring a durable IT5 profile for high wind resistance and maximum effective width coverage to minimize leak opportunities.',
    coverImage: '/images/portfolio/commercial-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/commercial-1/cover.jpg',
      '/images/portfolio/commercial-1/detail-1.jpg'
    ]
  },
  {
    id: 'proj-ind-1',
    title: 'Mombasa Port Logistics Depot',
    category: 'industrial',
    categoryLabel: 'Industrial Projects',
    location: 'Shimanzi, Mombasa',
    profileUsed: 'Industrial Heavy Rib Profile G28 (Slate Blue)',
    description: 'Heavy industrial storage facility custom-rolled in G28 gauge to defend against high humidity and coastal chemical parameters.',
    coverImage: '/images/portfolio/industrial-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/industrial-1/cover.jpg',
      '/images/portfolio/industrial-1/detail-1.jpg',
      '/images/portfolio/industrial-1/detail-2.jpg'
    ]
  },
  {
    id: 'proj-gov-1',
    title: 'County Agricultural Office Block',
    category: 'government',
    categoryLabel: 'Government Projects',
    location: 'Nakuru City',
    profileUsed: 'Classic Corrugated Profile (Tile Red)',
    description: 'Modern county administrative office roofed using high-reflectance Tile Red corrugated sheets, keeping workspace interiors cool naturally.',
    coverImage: '/images/portfolio/government-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/government-1/cover.jpg'
    ]
  },
  {
    id: 'proj-edu-1',
    title: 'University Science Center Auditorium',
    category: 'educational',
    categoryLabel: 'Educational Projects',
    location: 'Eldoret, Uasin Gishu',
    profileUsed: 'Concealed Fix Joint system (Matte Grey)',
    description: 'State-of-the-art academic theater utilizing our advanced concealed joint profiles to prevent all water leakage over computer-controlled science labs.',
    coverImage: '/images/portfolio/educational-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/educational-1/cover.jpg',
      '/images/portfolio/educational-1/detail-1.jpg'
    ]
  },
  {
    id: 'proj-agr-1',
    title: 'Large-Scale Grain Storage Hangar',
    category: 'agricultural',
    categoryLabel: 'Agricultural Projects',
    location: 'Kitale, Trans Nzoia',
    profileUsed: 'Industrial Box IT4 Profile (Chocolate Brown)',
    description: 'Massive farm storage warehouse utilizing Box IT4 G28 profiles for cost-effective cover and durable defense against moisture build-ups.',
    coverImage: '/images/portfolio/agricultural-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/agricultural-1/cover.jpg'
    ]
  },
  {
    id: 'proj-chu-1',
    title: 'Community Cathedral Sanctuary',
    category: 'church',
    categoryLabel: 'Church Projects',
    location: 'Kikuyu, Kiambu',
    profileUsed: 'Premium Euro Tile Profile (Matte Terracotta)',
    description: 'Beautiful community temple built with premium Euro Tile profiles, giving a timeless architectural silhouette with extreme safety backing.',
    coverImage: '/images/portfolio/church-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/church-1/cover.jpg',
      '/images/portfolio/church-1/detail-1.jpg'
    ]
  },
  {
    id: 'proj-war-1',
    title: 'Regional Logistics Center',
    category: 'warehouse',
    categoryLabel: 'Warehouses',
    location: 'Syokimau, Machakos',
    profileUsed: 'Box IT4 G28 Matte (Charcoal Black)',
    description: 'Distribution hub featuring continuous rolled 9-meter profiles to minimize horizontal seams and maximize building envelope security.',
    coverImage: '/images/portfolio/warehouse-1/cover.jpg',
    galleryImages: [
      '/images/portfolio/warehouse-1/cover.jpg',
      '/images/portfolio/warehouse-1/detail-1.jpg'
    ]
  }
];

// 5. LOGISTICS INFRASTRUCTURE GALLERIES
export const LOGISTICS_GALLERY: ShowcaseImage[] = [
  {
    src: "/images/logistics/delivery-trucks.jpg",
    alt: "Atlas fleet of flatbed distribution trucks",
    label: "Delivery Trucks"
  },
  {
    src: "/images/logistics/warehouse.jpg",
    alt: "Atlas rolling mill material inventory",
    label: "Warehouse"
  },
  {
    src: "/images/logistics/loading-bay.jpg",
    alt: "Package bundles loaded inside staging zone",
    label: "Loading Bay"
  },
  {
    src: "/images/logistics/forklift-operations.jpg",
    alt: "Forklift shifting high-strength alu-zinc steel coils",
    label: "Forklift Operations"
  },
  {
    src: "/images/logistics/customer-deliveries.jpg",
    alt: "Offloading roofing sheets directly to a residential home",
    label: "Customer Deliveries"
  },
  {
    src: "/images/logistics/nationwide-distribution.jpg",
    alt: "Atlas logistics network covering hardware shops in Kenya",
    label: "Nationwide Distribution"
  }
];

// 6. REUSABLE TEAM / STAFF GALLERY
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Joseph Kariuki',
    role: 'Managing Director',
    department: 'Management',
    image: '/images/team/joseph-kariuki.jpg'
  },
  {
    id: 'team-2',
    name: 'Sarah Nafula',
    role: 'Head of Sales & Estimation',
    department: 'Sales',
    image: '/images/team/sarah-nafula.jpg'
  },
  {
    id: 'team-3',
    name: 'Eng. Patrick Mwiti',
    role: 'Chief Production Engineer',
    department: 'Engineers',
    image: '/images/team/patrick-mwiti.jpg'
  },
  {
    id: 'team-4',
    name: 'Dennis Kiprotich',
    role: 'Logistics Fleet Dispatcher',
    department: 'Logistics',
    image: '/images/team/dennis-kiprotich.jpg'
  },
  {
    id: 'team-5',
    name: 'Grace Wambui',
    role: 'Customer Support Lead',
    department: 'Customer Support',
    image: '/images/team/grace-wambui.jpg'
  }
];

// 7. ABOUT SECTION GALLERY
export const ABOUT_GALLERY: ShowcaseImage[] = [
  {
    src: "/images/about/factory-exterior.jpg",
    alt: "Atlas Rolling Mill facility exterior",
    label: "Factory Exterior"
  },
  {
    src: "/images/about/company-history.jpg",
    alt: "Our humble foundation and growth timeline",
    label: "Company History"
  },
  {
    src: "/images/about/steel-coils.jpg",
    alt: "Raw high-purity alu-zinc coils on factory floor",
    label: "Steel Coils"
  },
  {
    src: "/images/about/production-floor.jpg",
    alt: "Our high speed continuous automated roll forming lines",
    label: "Production Floor"
  },
  {
    src: "/images/about/office.jpg",
    alt: "Customer greeting and estimate office desk",
    label: "Office"
  },
  {
    src: "/images/about/meeting-room.jpg",
    alt: "Architectural blueprint and rafter design table",
    label: "Meeting Room"
  },
  {
    src: "/images/about/quality-inspection.jpg",
    alt: "Auditing product sheet gauge thickness consistency",
    label: "Quality Inspection"
  }
];

// 8. CONTACT SECTION GALLERY
export const CONTACT_GALLERY: ShowcaseImage[] = [
  {
    src: "/images/contact/factory-entrance.jpg",
    alt: "Atlas Rolling Mill main factory security entrance gates",
    label: "Factory Entrance"
  },
  {
    src: "/images/contact/reception.jpg",
    alt: "Greeting desk and product physical display board",
    label: "Reception"
  },
  {
    src: "/images/contact/sales-office.jpg",
    alt: "Sales representatives coordinating order drafts",
    label: "Sales Office"
  },
  {
    src: "/images/contact/loading-yard.jpg",
    alt: "Spacious loading bay zone for flatbed transit trucks",
    label: "Loading Yard"
  },
  {
    src: "/images/contact/warehouse.jpg",
    alt: "Finished profiles sorted and stacked for loading",
    label: "Warehouse"
  }
];

// 9. CALCULATOR RELEVANT IMAGERY
export const CALCULATOR_GALLERY: ShowcaseImage[] = [
  {
    src: "/images/calculator/blueprint.jpg",
    alt: "Architectural schematic with roof slope pitch details",
    label: "Architect Blueprint"
  },
  {
    src: "/images/calculator/measurements.jpg",
    alt: "Measuring tape and rafters checklist sheet",
    label: "Roof Measurements"
  },
  {
    src: "/images/calculator/planning.jpg",
    alt: "Contractor analyzing material estimations",
    label: "Construction Planning"
  },
  {
    src: "/images/calculator/estimator.jpg",
    alt: "Calculated roof panels overlay mockup",
    label: "Estimator"
  },
  {
    src: "/images/calculator/building-site.jpg",
    alt: "Active residential rafter layout ready for iron sheets",
    label: "Building Site"
  }
];

// 10. REUSABLE COLOR SYSTEM ASSETS
export const COLORS_SYSTEM: ColorSystemAsset[] = [
  { id: 'col-charcoal', name: 'Charcoal Black', hex: '#2C3E50' },
  { id: 'col-brick', name: 'Brick Red', hex: '#9E2A2B' },
  { id: 'col-chocolate', name: 'Chocolate Brown', hex: '#5C3D2E' },
  { id: 'col-green', name: 'Forest Green', hex: '#1C3124' },
  { id: 'col-blue', name: 'Royal Blue', hex: '#1A365D' },
  { id: 'col-grey', name: 'Matte Grey', hex: '#64748B' },
  { id: 'col-white', name: 'Alu-Zinc Silver', hex: '#CBD5E1' }
];

// 11. REUSABLE SUPPORTING GRAPHICS FOR QUOTE BASKET
export const QUOTE_BASKET_GRAPHICS: Record<string, string> = {
  roofSheet: '/images/quote/roof-sheet-icon.svg',
  calculator: '/images/quote/calculator-icon.svg',
  colourSamples: '/images/quote/colors-icon.svg',
  whatsApp: '/images/quote/whatsapp-icon.svg',
  measurementTools: '/images/quote/measure-icon.svg',
  constructionPlans: '/images/quote/plans-icon.svg'
};
