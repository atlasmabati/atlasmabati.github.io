import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'box-it4-profile',
    title: 'Box IT4 Profile',
    category: 'roofing-profiles',
    categoryLabel: 'Roofing Profiles',
    description: 'High-strength trapezoidal shape with superior water-carrying capacity, ideal for commercial, industrial, and residential applications.',
    extendedDescription: 'The Box IT4 Profile is engineered to provide maximum structural efficiency and weatherproofing. Featuring aggressive box-style ribs, it offers exceptional rigidity and acts as a superb load-bearing deck. Its deep valleys guarantee clean water dispersal, making it one of the most reliable solutions for Kenya’s heavy seasonal rainfall regions.',
    features: [
      'Industrial-grade structural rigidity and dent resistance',
      'Advanced anti-capillary side-lap grooves to block water ingress',
      'High water-carrying capacity perfect for large spans',
      'Minimal structural support required, reducing timber work costs',
      'Dual-action heat-treated pre-painted design'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '1015mm' },
      { label: 'Overall Width', value: '1070mm' },
      { label: 'Rib Height', value: '28mm' },
      { label: 'Available Gauges', value: 'G30, G28, G26' },
      { label: 'Standard Lengths', value: '2.0m, 2.5m, 3.0m (Custom cuts available up to 9.0m)' },
      { label: 'Material', value: 'Alu-Zinc Coated High Tensile Steel' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#1C3124' },
      { name: 'Royal Blue', hex: '#1A365D' }
    ],
    imagePath: '/images/products/box-it4.jpg',
    gaugeRange: 'G26 - G30',
    isPopular: true
  },
  {
    id: 'roman-tile-profile',
    title: 'Roman Tile Profile',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'Brings Mediterranean elegance to your home with the durability and lightweight properties of steel roof sheeting.',
    extendedDescription: 'Roman Tile Profile replicates the classic elegance and wave-profile of traditional clay tiles while adding the immense security and longevity of high-tensile steel roofing panels. It gives any estate or home a timeless, premium look with less than 10% of the weight of real tile, saving huge costs on roof trusses.',
    features: [
      'Prestigious Mediterranean scalloped aesthetic',
      'Lightweight sheets reduce stress and costs on timber frames',
      'Pre-formed tile lengths align perfectly for custom layout installs',
      'Interlocking system protects against high winds and storms',
      'Reflective thermal layer for cooler indoor temperatures'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '1100mm' },
      { label: 'Overall Width', value: '1160mm' },
      { label: 'Step Length', value: '300mm' },
      { label: 'Step Height', value: '20mm' },
      { label: 'Available Gauges', value: 'G30, G28' },
      { label: 'Standard Lengths', value: 'Made-to-order based on rafters' }
    ],
    colors: [
      { name: 'Glossy Charcoal', hex: '#1E293B' },
      { name: 'Classic Brick Red', hex: '#B83227' },
      { name: 'Chocolate Brown', hex: '#4E3629' },
      { name: 'Hunter Green', hex: '#14361C' }
    ],
    imagePath: '/images/products/roman-tile.jpg',
    gaugeRange: 'G28 - G30',
    isPopular: true
  },
  {
    id: 'corrugated-profile',
    title: 'Corrugated Profile',
    category: 'roofing-profiles',
    categoryLabel: 'Roofing Profiles',
    description: 'The timeless and budget-friendly classic waves. Perfect for all traditional designs, outbuildings, and residential roofs.',
    extendedDescription: 'The traditional Corrugated Profile is the cornerstone of architectural metal roofing. It has stood the test of time due to its simplicity, ease of installation, and superb strength-to-weight ratio. Modern continuous galvanizing and baked-on polymer coating technologies make our corrugated profile exceptionally long-lasting and rust-resistant.',
    features: [
      'Classic, highly-recognizable corrugated wave appearance',
      'Easiest layout handling and fastest site installation times',
      'Most cost-effective roofing cover solution in Kenya',
      'Symmetric curves ensure natural tension dissipation',
      'Eco-friendly design utilizing fully recyclable steel substrate'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '762mm' },
      { label: 'Overall Width', value: '850mm' },
      { label: 'Pitch', value: '76mm' },
      { label: 'Available Gauges', value: 'G30, G28' },
      { label: 'Standard Lengths', value: '2.0m, 2.5m, 3.0m' }
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#334155' },
      { name: 'Tile Red', hex: '#A82223' },
      { name: 'Forest Green', hex: '#224229' },
      { name: 'Royal Blue', hex: '#1E3A8A' }
    ],
    imagePath: '/images/products/corrugated.jpg',
    gaugeRange: 'G28 - G30'
  },
  {
    id: 'curved-tile-profile',
    title: 'Curved Tile Profile',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'A striking profile offering smooth, rolling crests and deep troughs for an exquisite architectural finish.',
    extendedDescription: 'Our Curved Tile Profile serves projects whose architects demand a unique wave profile that is softer and more organic than traditional ribbed profiles. Ideal for custom villas, beach bungalows, and statement commercial spaces, it provides high water run-off speeds and resists the accumulation of dirt or leaves.',
    features: [
      'Architecturally unique wave style that stands out with distinction',
      'High-profile peaks for extreme durability and water discharge',
      'Smooth edges and seamless joint overlap curves',
      'Superior thermal performance blocks solar radiation',
      'Multi-stage heat-lock paint curing prevents fading'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '1000mm' },
      { label: 'Overall Width', value: '1060mm' },
      { label: 'Wave Period', value: '250mm' },
      { label: 'Available Gauges', value: 'G28' },
      { label: 'Available Material', value: 'Premium Matte Finish Steel' }
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#1E293B' },
      { name: 'Tile Red', hex: '#B22222' },
      { name: 'Slate Brown', hex: '#5D4037' }
    ],
    imagePath: '/images/products/curved-tile.jpg',
    gaugeRange: 'G28'
  },
  {
    id: 'stone-coated-decra',
    title: 'Stone Coated Decra',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'Ultimate premium roofing panels embedded with real natural volcanic stone chips for luxurious style and acoustic comfort.',
    extendedDescription: 'The crown jewel of roofing. Our Stone Coated Decra tiles are made using heavy-duty alu-zinc steel backing, coated with advanced acrylic resins, and coated with fine volcanic basalt chips. This creates a highly resistant barrier against heat, storms, and UV rays, while dramatically dampening the sound of rain to a quiet whisper.',
    features: [
      'Zero rain noise — Natural stone chips absorb acoustic impact',
      'High-end luxury aesthetic resembling boutique interlocking slate',
      'Incredible lifespan, back-backed with a multi-decade integrity level',
      'Interconnected screw-fastening system makes it practically storm-proof',
      'Non-burning, fire-resistant class A material rating'
    ],
    specifications: [
      { label: 'Tile Panel Dimensions', value: '1340mm x 420mm' },
      { label: 'Effective Cover Size', value: '1270mm x 370mm' },
      { label: 'Tile Weight / sq meter', value: 'Only 6.2 kg (90% lighter than concrete/clay)', },
      { label: 'Core Base Metal Thickness', value: '0.42mm' },
      { label: 'Substrate', value: 'Premium Galvalume (Aluzinc)' }
    ],
    colors: [
      { name: 'Burgundy Red', hex: '#800020' },
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Coffee Brown', hex: '#3E2723' },
      { name: 'Forest Green', hex: '#0B3C1A' }
    ],
    imagePath: '/images/products/stone-coated.jpg',
    gaugeRange: 'Premium Thickness',
    isPopular: true
  },
  {
    id: 'ridge-cap-valley',
    title: 'Ridge Cap Valley',
    category: 'accessories',
    categoryLabel: 'Accessories',
    description: 'Precision folded metal valleys and standard ridge caps designed to secure junctions and divert rainfall vectors safely.',
    extendedDescription: 'A roof system is only as strong as its junctions. Our Ridge Cap Valleys are manufactured in Kenya using the exact same premium steel stock as our main profiles, ensuring matching paint consistency, thickness, and life expectancy. They route water away from structural wooden beams safely.',
    features: [
      'Engineered specifically to guide water in standard 15 to 45 degree pitches',
      'Exact paint matching matching primary roofing sheets',
      'Prevents any cross-winds from blowing rains under roofing panels',
      'Reinforced folded outer safety lips'
    ],
    specifications: [
      { label: 'Standard Flange Width', value: '200mm x 200mm' },
      { label: 'Total Length', value: '2.4 meters', },
      { label: 'Gauges', value: 'Matches project sheets (G30, G28, or G26)' },
      { label: 'Angle Span', value: '90° - 140° customizable' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#1C3124' },
      { name: 'Royal Blue', hex: '#1A365D' }
    ],
    imagePath: '/images/products/ridge-valley.jpg',
    gaugeRange: 'Matches base metal'
  },
  {
    id: 'round-ridge-cap',
    title: 'Round Ridge Cap',
    category: 'accessories',
    categoryLabel: 'Accessories',
    description: 'Beautiful round-profile cap to seamlessly close tile ridges and seal roof apices elegantly.',
    extendedDescription: 'Nothing says finished craftsmanship like our Round Ridge Cap. Engineered with architectural curvature, it perfectly bridges and overlaps Roman and Curved tile crests. This makes the roof weather-tight, prevents bird nesting, and forms a strong protective shield along the roof peaks.',
    features: [
      'Gives premium tiled roofs a uniform, finished master look',
      'Includes custom relief-cuts to easily interlock during installation',
      'Protects center timber runs from rot and storm humidity',
      'Reinforced rolled edges for structural durability during handling'
    ],
    specifications: [
      { label: 'Radius of Curvature', value: '110mm' },
      { label: 'Length', value: '2.4 meters' },
      { label: 'Overlaps', value: '2200mm net cover length' },
      { label: 'Gauges', value: 'G30, G28' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#1C3124' }
    ],
    imagePath: '/images/products/round-ridge.jpg',
    gaugeRange: 'G28 - G30'
  }
];
