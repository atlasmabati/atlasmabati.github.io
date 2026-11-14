import { Product } from '../types';

export const products: Product[] = [
  // ==================== CATEGORY 1: ROOFING PROFILES (5 Products) ====================
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
      { label: 'Available Gauges', value: 'G30, G28' },
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
    imagePath: '/images/products/box-it4.webp',
    gaugeRange: 'G28 - G30',
    isPopular: true
  },
  {
    id: 'corrugated-profile',
    title: 'Corrugated Classic Profile',
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
    id: 'maxcover-it5-profile',
    title: 'Maxcover IT5 Profile',
    category: 'roofing-profiles',
    categoryLabel: 'Roofing Profiles',
    description: 'Advanced five-rib low profile cladding offering extremely wide coverage area to cut down overall panel counts.',
    extendedDescription: 'The Maxcover IT5 represents next-generation profiling efficiency. By spacing 5 high-strength crests evenly across a wider alu-zinc sheet, it yields superior structural strength while giving contractors an extra 10% overlap area, significantly reducing overall sheets purchased for large warehouses or homes.',
    features: [
      'Extra-wide profile span reduces sheet counts and join lines',
      'Five load-bearing ribs provide high pedestrian weight safety',
      'Excellent span capability for purlin spaces up to 1.4 meters',
      'Resistant to severe African tropical UV solar radiation'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '1060mm' },
      { label: 'Overall Width', value: '1120mm' },
      { label: 'Rib Height', value: '24mm' },
      { label: 'Available Gauges', value: 'G30, G28' }
    ],
    colors: [
      { name: 'Matte Charcoal', hex: '#334155' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#1C3124' }
    ],
    imagePath: '/images/products/maxcover.avif',
    gaugeRange: 'G28 - G30'
  },
  {
    id: 'industrial-rib-profile',
    title: 'Industrial Heavy Rib Profile',
    category: 'roofing-profiles',
    categoryLabel: 'Roofing Profiles',
    description: 'High-tensile G28 deep rib panel customized for warehouses, factories, and agricultural storage hubs.',
    extendedDescription: 'Engineered specifically for heavy industrial envelopes. Featuring deep valleys and G28 structural steel backing, the Industrial Heavy Rib stands up to direct physical impacts, corrosive factory dust, and severe tropical weather parameters.',
    features: [
      'Heavy duty G28 alu-zinc backing with high dent resistance',
      'Deep 35mm rib profile guarantees zero storm overflow',
      'Designed to handle chemical environments and high salt atmospheres'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '980mm' },
      { label: 'Overall Width', value: '1040mm' },
      { label: 'Rib Height', value: '35mm' },
      { label: 'Available Gauges', value: 'G28' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Tile Red', hex: '#9E2A2B' }
    ],
    imagePath: '/images/products/industrial.jpg',
    gaugeRange: 'G28 Only'
  },
  {
    id: 'standing-seam-profile',
    title: 'Standing Seam Premium Profile',
    category: 'roofing-profiles',
    categoryLabel: 'Roofing Profiles',
    description: 'Sleek, architectural concealed-fastener profile with zero external screws, providing a 100% leakproof envelope.',
    extendedDescription: 'The pinnacle of industrial-residential design. Standing Seam features interlocking raised seams that lock together without penetrating the metal substrate, completely eliminating screw leak vulnerabilities over decades.',
    features: [
      'Concealed fastening design with zero exposed screws',
      'Perfect architectural linear styling for contemporary luxury estates',
      '100% immune to joint expansion or storm water leakage points'
    ],
    specifications: [
      { label: 'Effective Width', value: '450mm' },
      { label: 'Seam Height', value: '38mm' },
      { label: 'Fasteners', value: 'Concealed sliding clips' },
      { label: 'Available Gauges', value: 'G28' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' }
    ],
    imagePath: '/images/products/standing.webp',
    gaugeRange: 'G28 Only',
    isPopular: true
  },

  // ==================== CATEGORY 2: PREMIUM TILES (5 Products) ====================
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
    imagePath: '/images/products/curved-tile.webp',
    gaugeRange: 'G28'
  },
  {
    id: 'milano-wave-tile',
    title: 'Milano Wave Premium Tile',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'Sophisticated Italian-style wave tile with micro-rib structures along the crests for maximum rigidity.',
    extendedDescription: 'Milano Wave tile introduces deep architectural valleys paired with micro-grooving on the peaks to add unmatched physical stiffness. Designed for luxurious high-end villas where visual prestige and weather barrier strength are required in equal measure.',
    features: [
      'Flawless premium Italian look matching concrete shingles',
      'Incredible strength-to-weight ratio from micro-rib structures',
      'Extra secure side overlap joints'
    ],
    specifications: [
      { label: 'Effective Cover Width', value: '1050mm' },
      { label: 'Step Length', value: '350mm' },
      { label: 'Gauge Option', value: 'G28' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Forest Green', hex: '#1C3124' }
    ],
    imagePath: '/images/products/milano.jpg',
    gaugeRange: 'G28 Only'
  },
  {
    id: 'versatile-tile-profile',
    title: 'Versatile Tile Profile',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'The standard choice for quick-install metal roofing tiles with deep, attractive step heights.',
    extendedDescription: 'Versatile tile provides the visual comfort of classic roof tile with the quick assembly of long-run sheets. Highly popular for Kenyan urban homes due to its affordable pricing structure and rapid dispatch times.',
    features: [
      'Affordable tile style with standard panel coverage',
      'Saves timber layout framing with standard tile dimensions',
      'Anti-capillary side loops prevent storm water creeping'
    ],
    specifications: [
      { label: 'Effective Width', value: '1000mm' },
      { label: 'Step Height', value: '15mm' },
      { label: 'Gauges', value: 'G28, G30' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' }
    ],
    imagePath: '/images/products/versatile.jpg',
    gaugeRange: 'G28 - G30'
  },
  {
    id: 'classic-scallop-tile',
    title: 'Classic Scallop Tile Profile',
    category: 'premium-tiles',
    categoryLabel: 'Premium Tiles',
    description: 'Beautifully rounded, curved scalloped edge design giving your roof a traditional hand-carved shingles aesthetic.',
    extendedDescription: 'Our Classic Scallop tile features rounded crests that present elegant shifting shadows under daylight. Perfect for cottages, boutique hotels, and highly styled architectural residences.',
    features: [
      'Premium rounded scalloped visual texture',
      'Seamless interlocking segments resist severe updraft wind gusts',
      'Teflon-coated raw materials resist dirt accumulation'
    ],
    specifications: [
      { label: 'Effective Width', value: '1020mm' },
      { label: 'Step Length', value: '300mm' },
      { label: 'Gauge', value: 'G28' }
    ],
    colors: [
      { name: 'Glossy Charcoal', hex: '#1E293B' },
      { name: 'Chocolate Brown', hex: '#4E3629' }
    ],
    imagePath: '/images/products/scallop.jpg',
    gaugeRange: 'G28 Only'
  },

  // ==================== CATEGORY 3: STONE-COATED TILES (5 Products) ====================
  {
    id: 'stone-coated-decra',
    title: 'Stone Coated Decra Shingles',
    category: 'stone-coated',
    categoryLabel: 'Stone Coated Tiles',
    description: 'Ultimate premium roofing panels embedded with real natural volcanic stone chips for luxurious style and acoustic comfort.',
    extendedDescription: 'The crown jewel of roofing. Our Stone Coated Decra tiles are made using heavy-duty alu-zinc steel backing, coated with advanced acrylic resins, and coated with fine volcanic basalt chips. This creates a highly resistant barrier against heat, storms, and UV rays, while dramatically dampening the sound of rain to a quiet whisper.',
    features: [
      'Zero rain noise — Natural stone chips absorb acoustic impact',
      'High-end luxury aesthetic resembling boutique interlocking slate',
      'Incredible lifespan, backed with a multi-decade integrity level',
      'Interconnected screw-fastening system makes it practically storm-proof',
      'Non-burning, fire-resistant class A material rating'
    ],
    specifications: [
      { label: 'Tile Panel Dimensions', value: '1340mm x 420mm' },
      { label: 'Effective Cover Size', value: '1270mm x 370mm' },
      { label: 'Tile Weight / sq meter', value: 'Only 6.2 kg (90% lighter than concrete/clay)' },
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
    id: 'stone-coated-bond',
    title: 'Bond Stone Coated Tile',
    category: 'stone-coated',
    categoryLabel: 'Stone Coated Tiles',
    description: 'Traditional tile shape featuring volcanic stone chip armor for maximum longevity and elegant shadow lines.',
    extendedDescription: 'Bond profile provides the beloved circular wave of Spanish tile reinforced with volcanic basalt granules. The stone texture breaks up direct sunlight, preventing solar thermal load and ensuring a cool interior.',
    features: [
      'Absorbs 95% of rain impact noise for deep acoustic peace',
      'Classic rounded curved tiles look with zero rust possibility',
      'Resistant to volcanic ash, acidic rain, and salt breezes'
    ],
    specifications: [
      { label: 'Panel Size', value: '1340mm x 420mm' },
      { label: 'Cover Width', value: '1270mm' },
      { label: 'Steel Thickness', value: '0.40mm' }
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Burgundy Red', hex: '#800020' },
      { name: 'Coffee Brown', hex: '#3E2723' }
    ],
    imagePath: '/images/products/bond-stone.jpg',
    gaugeRange: 'Premium Thickness'
  },
  {
    id: 'stone-coated-classic',
    title: 'Classic Stone Coated Panel',
    category: 'stone-coated',
    categoryLabel: 'Stone Coated Tiles',
    description: 'Sleek, angular step-profile tiles featuring natural stone coatings for crisp, defined rooflines.',
    extendedDescription: 'Classic profile delivers sharp, contemporary architectural lines with clean flat sections that look incredible on flat-roof villas or steep-sloped roofs.',
    features: [
      'Crisp angular shadow lines provide modern bento aesthetics',
      'Weather-resistant stone chip layer protects against extreme heat waves',
      'No fading or color peeling for decades'
    ],
    specifications: [
      { label: 'Panel Length', value: '1330mm' },
      { label: 'Panel Width', value: '410mm' },
      { label: 'Core Steel', value: 'Grade 300 Aluzinc' }
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Emerald Green', hex: '#065F46' }
    ],
    imagePath: '/images/products/classic-stone.webp',
    gaugeRange: 'Premium Thickness'
  },
  {
    id: 'stone-coated-tudor',
    title: 'Tudor Stone Coated Tile',
    category: 'stone-coated',
    categoryLabel: 'Stone Coated Tiles',
    description: 'Brings traditional English Tudor architecture to life with heavy structural ridges and stone textures.',
    extendedDescription: 'Tudor tiles mimic the hand-built, secure look of historic European slate and clay. They provide excellent security and deep overlapping steps that block heavy tropical storms.',
    features: [
      'Heavy-density structural steps for unique English styling',
      'Basalt granules provide fireproof heat barriers',
      'Interconnected horizontal nailing locks out high winds'
    ],
    specifications: [
      { label: 'Panel Dimensions', value: '1340mm x 400mm' },
      { label: 'Coverage', value: '2.1 panels per sqm' },
      { label: 'Base Thickness', value: '0.42mm' }
    ],
    colors: [
      { name: 'Coffee Brown', hex: '#3E2723' },
      { name: 'Slate Grey', hex: '#64748B' }
    ],
    imagePath: '/images/products/tudor.jpg',
    gaugeRange: 'Premium Thickness'
  },
  {
    id: 'stone-coated-shake',
    title: 'Shake Stone Coated Tile',
    category: 'stone-coated',
    categoryLabel: 'Stone Coated Tiles',
    description: 'Interlocking slate-look profile styled like natural wood shingles with zero wood-rot or fire hazards.',
    extendedDescription: 'Shake profile offers the cozy, rugged rustic aesthetic of hand-split timber shingles. Being made of high-tensile steel and volcanic chips, it will never rot, crack, burn, or attract termites.',
    features: [
      'Authentic rustic wood-shingle finish',
      'Volcanic stone basalt protection prevents thermal transfer',
      '100% fireproof rating'
    ],
    specifications: [
      { label: 'Panel Size', value: '1340mm x 430mm' },
      { label: 'Weight', value: '2.8 kg per panel' },
      { label: 'Coating', value: 'Basalt Chips + Acrylic Resin Glaze' }
    ],
    colors: [
      { name: 'Charcoal Grey', hex: '#374151' },
      { name: 'Teak Brown', hex: '#78350F' }
    ],
    imagePath: '/images/products/shake-stone.png',
    gaugeRange: 'Premium Thickness',
    isPopular: true
  },

  // ==================== CATEGORY 4: RAINWATER DRAINAGE (5 Products) ====================
  {
    id: 'premium-pvc-gutter',
    title: 'Premium PVC Gutter System',
    category: 'pvc-gutters',
    categoryLabel: 'PVC Gutters',
    description: 'High-impact, UV-stabilized PVC guttering with leak-proof rubber seal joints, perfect for collecting pure rainwater.',
    extendedDescription: 'Our high-performance PVC gutter system is designed to collect rainwater efficiently while resisting severe African solar degradation. Complete with continuous flow design and premium polymer stabilizers, it does not crack, fade, or rust.',
    features: [
      'UV-Stabilized polymer prevents sun-damage cracking',
      'Double-ridge rubber gaskets guarantee a 100% leak-proof seal',
      'Smooth inner core prevents organic leaf and soil buildup',
      'Sleek modern profiles that integrate with residential fascia boards'
    ],
    specifications: [
      { label: 'Standard Length', value: '3.0 meters or 4.0 meters' },
      { label: 'Gutter Width', value: '125mm (High volume water collection)' },
      { label: 'Available Colors', value: 'Classic Slate Grey, Charcoal Black, Forest Green' },
      { label: 'Joint Type', value: 'Push-fit with matching brackets' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Charcoal Black', hex: '#1E293B' },
      { name: 'Forest Green', hex: '#14532D' }
    ],
    imagePath: '/images/products/pvc-gutter.jpeg',
    gaugeRange: 'Heavy Duty UV Wall',
    isPopular: false
  },
  {
    id: 'rainwater-fittings-set',
    title: 'Rainwater Downpipe & Fittings',
    category: 'pvc-gutters',
    categoryLabel: 'PVC Gutters',
    description: 'A complete collection of custom downpipes, premium bends, running outlets, drop nozzles, and wall clips.',
    extendedDescription: 'Ensure high velocity storm discharge with our precision matching downpipe fittings. Manufactured to slide together smoothly for quick assembly and structural stability against external vibrations.',
    features: [
      'Engineered slide-lock connections eliminate glue failures',
      'Reinforced wall mounting brackets withstand heavy rain columns',
      'Wide collection funnels prevent structural wall splashing',
      'Highly flexible elbows fit around complex wall corners'
    ],
    specifications: [
      { label: 'Pipe Diameter', value: '80mm / 110mm standard size' },
      { label: 'Downpipe Length', value: '3.0 meters' },
      { label: 'Mounting clips spacing', value: 'Recommended every 1.5 meters' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Charcoal Black', hex: '#1E293B' }
    ],
    imagePath: '/images/products/rainwater-fittings.webp',
    gaugeRange: 'Professional Grade',
    isPopular: false
  },
  {
    id: 'gutter-corner-connector',
    title: 'Gutter Corner Connector 90°',
    category: 'pvc-gutters',
    categoryLabel: 'PVC Gutters',
    description: 'Heavy duty molded PVC 90-degree corner angles equipped with rubber seal channels for seamless turns around roof margins.',
    extendedDescription: 'Allows the gutter system to track building perimeters smoothly without leaking. Heavy rubber seal channels lock into straight gutter lengths securely.',
    features: [
      'Perfect 90-degree angle for hip and complex gable roofs',
      'Interlocking rubber gasket tracks ensure zero corner drips'
    ],
    specifications: [
      { label: 'Angle', value: '90 Degrees' },
      { label: 'Material', value: 'High-Impact UV-Stabilized Vinyl' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Charcoal Black', hex: '#1E293B' }
    ],
    imagePath: '/images/products/gutter-corner.jpeg',
    gaugeRange: 'Heavy Duty UV Wall'
  },
  {
    id: 'gutter-brackets-set',
    title: 'Heavy Duty Gutter Brackets',
    category: 'pvc-gutters',
    categoryLabel: 'PVC Gutters',
    description: 'Reinforced fascia mounting support brackets designed to keep heavy, water-loaded gutters level and secure.',
    extendedDescription: 'Our heavy-grade brackets mount directly to the wooden or steel fascia boards. Engineered to resist sagging and strong wind forces under load.',
    features: [
      'Triple-point screw holes for ultimate fascia stability',
      'Supports loads up to 25kg per bracket spacer'
    ],
    specifications: [
      { label: 'Spacing', value: 'Install every 60cm along gutter line' },
      { label: 'Material', value: 'Reinforced PVC / Steel core' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Charcoal Black', hex: '#1E293B' }
    ],
    imagePath: '/images/products/heavy-duty.jpeg',
    gaugeRange: 'Structural Grade'
  },
  {
    id: 'gutter-running-outlet',
    title: 'Rainwater Running Outlet',
    category: 'pvc-gutters',
    categoryLabel: 'PVC Gutters',
    description: 'Custom gutter running junction with central nozzle dropper to smoothly funnel collected water down to downpipes.',
    extendedDescription: 'An essential connector that hooks the horizontal gutter line directly to the vertical downpipe runs. Wide funnel design prevents debris blockage.',
    features: [
      'High-velocity funnel design eliminates back-splashes',
      'Dual gutter-connector slide channels'
    ],
    specifications: [
      { label: 'Nozzle Drop Size', value: '110mm standard round drop' },
      { label: 'Internal flow rate', value: 'Up to 4.5 liters per second' }
    ],
    colors: [
      { name: 'Slate Grey', hex: '#64748B' },
      { name: 'Charcoal Black', hex: '#1E293B' }
    ],
    imagePath: '/images/products/outlet.jpeg',
    gaugeRange: 'Heavy Duty UV Wall',
    isPopular: true
  },

  // ==================== CATEGORY 5: STRUCTURAL & ACCESSORIES (5 Products) ====================
  {
    id: 'light-gauge-steel-trusses',
    title: 'Light Gauge Steel Trusses (LGS)',
    category: 'accessories',
    categoryLabel: 'Roof Accessories',
    description: 'Ultimate structural steel roof trusses. Fireproof, termite-proof, rustproof, and prefabricated with zero timber wastage.',
    extendedDescription: 'Replace decaying timber structures with Atlas Light Gauge Steel. Pre-fabricated to exact blueprint dimensions using computerized precision roll-form lines. Extremely strong yet lightweight, reducing the building’s dead load and accelerating assembly times on-site.',
    features: [
      '100% Termite and Wood-Rot Proof',
      'Non-combustible Class A1 Fire Resilience',
      'Extremely high tensile strength alu-zinc coating blocks rust',
      'Pre-punched screw holes speed up installation on site'
    ],
    specifications: [
      { label: 'Profile Depth', value: '75mm / 89mm standard web depth' },
      { label: 'Steel Grade', value: 'G550 High Tensile Steel (550 MPa)' },
      { label: 'Coating Weight', value: 'AZ150 (150g/sqm double-sided)' },
      { label: 'Thickness', value: '0.8mm to 1.2mm structural profiles' }
    ],
    colors: [
      { name: 'Galvanized Silver', hex: '#CBD5E1' }
    ],
    imagePath: '/images/products/light-gauge-steel.jpeg',
    gaugeRange: '0.8mm - 1.2mm',
    isPopular: true
  },
  {
    id: 'ridge-cap-valley',
    title: 'Precision Ridge Cap Valley',
    category: 'accessories',
    categoryLabel: 'Roof Accessories',
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
      { label: 'Total Length', value: '2.4 meters' },
      { label: 'Gauges', value: 'Matches project sheets (G30 or G28)' },
      { label: 'Angle Span', value: '90° - 140° customizable' }
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#2C3E50' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Chocolate Brown', hex: '#5C3D2E' },
      { name: 'Forest Green', hex: '#1C3124' },
      { name: 'Royal Blue', hex: '#1A365D' }
    ],
    imagePath: '/images/products/ridge-valley.webp',
    gaugeRange: 'Matches base metal'
  },
  {
    id: 'round-ridge-cap',
    title: 'Beautiful Round Ridge Cap',
    category: 'accessories',
    categoryLabel: 'Roof Accessories',
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
    imagePath: '/images/products/round-ridge.png',
    gaugeRange: 'G28 - G30'
  },
  {
    id: 'underlayment-moisture-foil',
    title: 'Thermal Underlayment Foil Roll',
    category: 'accessories',
    categoryLabel: 'Roof Accessories',
    description: 'Double-sided aluminum radiant heat barrier and moisture-proof underlayment roll for cooler ceilings.',
    extendedDescription: 'Reflects up to 97% of radiant heat waves coming from steel roofs. Our double-sided foil includes fiberglass scrim core reinforcement to prevent tearing, while forming a 100% waterproof vapor block.',
    features: [
      'Reflects 97% of radiant solar heat for massive ceiling cooling',
      'Fiberglass thread mesh lining prevents tearing during trusses climb',
      'Prevents condensation droplets from dripping onto ceiling boards'
    ],
    specifications: [
      { label: 'Roll Size', value: '1.25m Width x 40m Length (50 sqm)' },
      { label: 'Material', value: 'Double-sided Pure Aluminum Foil + PET' },
      { label: 'Tensile Strength', value: 'Super Reinforced Grade' }
    ],
    colors: [
      { name: 'Radiant Silver', hex: '#E2E8F0' }
    ],
    imagePath: '/images/products/thermal.png',
    gaugeRange: 'Standard 50 sqm'
  },
  {
    id: 'self-tapping-screws',
    title: 'Waterproof Self-Tapping Screws',
    category: 'accessories',
    categoryLabel: 'Roof Accessories',
    description: 'High tensile self-drilling mabati screws with thick EPDM rubber washers for absolute leak-proof seals.',
    extendedDescription: 'EPDM rubber washers stay flexible under decades of hot sun, preventing screw hole leakage. Features self-drilling tips that pierce alu-zinc sheets and steel or timber frames seamlessly.',
    features: [
      'EPDM rubber seals stay soft and do not rot or crack',
      'Zinc galvanized coating prevents screw corrosion over decades'
    ],
    specifications: [
      { label: 'Size', value: '50mm length for wood / 25mm for steel trusses' },
      { label: 'Packet Count', value: '100 pieces per packet' }
    ],
    colors: [
      { name: 'Charcoal Gray', hex: '#475569' },
      { name: 'Tile Red', hex: '#9E2A2B' },
      { name: 'Forest Green', hex: '#1C3124' }
    ],
    imagePath: '/images/products/self-tapping.jpeg',
    gaugeRange: 'EPDM Sealed'
  }
];
