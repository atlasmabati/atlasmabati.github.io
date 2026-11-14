import { MasterColorFinish } from '../types';

export interface RegionalBranch {
  id: string;
  name: string;
  regionLabel: string;
  address: string;
  phone: string;
  phoneRaw: string;
  embedUrl: string;
}

export const ATLAS_CONFIG = {
  businessName: 'Atlas Mabati',
  parentCompany: 'Atlas Rolling Mill',
  tagline: 'Kenya\'s Premier Premium Digital Roofing Supermarket',
  location: 'Ruiru Road, Ruiru, Kiambu County, Kenya',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.014298177579!2d36.958742!3d-1.150125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f9823467b79%3A0x7d6a50b731f28b4d!2sRuiru%20Town!5e0!3m2!1sen!2ske!4v1720580000000!5m2!1sen!2ske',
  phone1: '0743 444 418',
  phone2: '0743 444 419',
  phone1Raw: '+254743444418',
  phone2Raw: '+254743444419',
  whatsappRaw: '254743444418', // Primary WhatsApp contact
  whatsappRawSecondary: '254743444419',
  email1: 'atlasmabati@gmail.com',
  email2: 'rollingatlas@gmail.com',
  workingHours: 'Mon - Fri: 8:00 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM',
  
  socials: {
    facebook: 'https://facebook.com/atlasmabati',
    instagram: 'https://instagram.com/atlasmabati',
    x: 'https://x.com/atlasmabati',
    linkedin: 'https://linkedin.com/company/atlasmabati',
    tiktok: 'https://tiktok.com/@atlasmabati',
    youtube: 'https://youtube.com/@atlasmabati'
  },

  branches: [
    {
      id: 'ruiru',
      name: 'Ruiru Factory (HQ)',
      regionLabel: 'Nairobi & Kiambu Metro',
      address: 'Ruiru Road, Kiambu County',
      phone: '0743 444 418',
      phoneRaw: '+254743444418',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.12607832824!2d36.95353595!3d-1.13941455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f61b0c037bf%3A0xc622be8fa6cb7b0f!2sRuiru!5e0!3m2!1sen!2ske!4v1710189000000!5m2!1sen!2ske'
    },
    {
      id: 'mombasa',
      name: 'Mombasa Depot',
      regionLabel: 'Coast Region',
      address: 'Shimanzi Road, Mombasa Port',
      phone: '0743 444 419',
      phoneRaw: '+254743444419',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15923.639420087118!2d39.6548773!3d-4.0416954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012be7c3906ab%3A0xc6962e21b7145b23!2sMombasa!5e0!3m2!1sen!2ske!4v1710189100000!5m2!1sen!2ske'
    },
    {
      id: 'kisumu',
      name: 'Kisumu Hub',
      regionLabel: 'Lake Basin & Western',
      address: 'Obote Road, Kisumu',
      phone: '0743 444 418',
      phoneRaw: '+254743444418',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.08332145325!2d34.7578278!3d-0.1022137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182b1c062886c559%3A0x6b1cc8aa62b665df!2sKisumu!5e0!3m2!1sen!2ske!4v1710189200000!5m2!1sen!2ske'
    },
    {
      id: 'eldoret',
      name: 'Eldoret Point',
      regionLabel: 'North Rift Hub',
      address: 'Uganda Road, Eldoret',
      phone: '0743 444 419',
      phoneRaw: '+254743444419',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.512613567086!2d35.2699321!3d0.5142775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1780f6071477dfdb%3A0x47d10001ff2a5a54!2sEldoret!5e0!3m2!1sen!2ske!4v1710189300000!5m2!1sen!2ske'
    },
    {
      id: 'nakuru',
      name: 'Nakuru Outlet',
      regionLabel: 'Central Rift Valley',
      address: 'George Morara Avenue, Nakuru',
      phone: '0743 444 418',
      phoneRaw: '+254743444418',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.545815340656!2d36.066421!3d-0.2827155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1829f046ef31522d%3A0x8670bfb0fef95b6c!2sNakuru!5e0!3m2!1sen!2ske!4v1710189400000!5m2!1sen!2ske'
    },
    {
      id: 'nyeri',
      name: 'Nyeri Collection',
      regionLabel: 'Mt. Kenya Region',
      address: 'Kenyatta Avenue, Nyeri',
      phone: '0743 444 419',
      phoneRaw: '+254743444419',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.673859672013!2d36.950796!3d-0.421882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18285df6bdcb86e9%3A0x5ca9c68087d461be!2sNyeri!5e0!3m2!1sen!2ske!4v1710189500000!5m2!1sen!2ske'
    }
  ] as RegionalBranch[],

  // Creators / Portfolios / Project Partners
  partners: [
    {
      name: 'Stephen Kimaru',
      url: 'https://stephenkimaru.github.io'
    },
    {
      name: 'KTEN Investments',
      url: 'https://kteninvestments.co.ke'
    },
    {
      name: 'Ma Creatives Studio',
      url: 'https://macreativesstudio.github.io'
    }
  ]
};

export const MASTER_COLOR_PALETTE: MasterColorFinish[] = [
  {
    id: 'charcoal-black',
    name: 'Charcoal Black',
    hex: '#2C3E50',
    accentHex: '#1E293B',
    finishType: 'Matte Texturized',
    sriIndex: 'SRI 38 • UV Shielded',
    heatReduction: '-4.2°C Ceiling Temp',
    bestForClimate: 'Nairobi, Kiambu, Highland Villas & Contemporary Estates',
    architecturalVibe: 'Ultra-modern executive aesthetic; pairs effortlessly with white stucco, grey concrete, and natural stone cladding.',
    matchingKeywords: ['charcoal', 'black']
  },
  {
    id: 'tile-red',
    name: 'Tile Red',
    hex: '#9E2A2B',
    accentHex: '#B83227',
    finishType: 'High-Gloss Polymer',
    sriIndex: 'SRI 46 • Solar Reflective',
    heatReduction: '-5.5°C Ceiling Temp',
    bestForClimate: 'Rift Valley, Machakos, Coastal & Sunny Suburban Zones',
    architecturalVibe: 'Timeless Mediterranean & classic Kenyan family villa heritage with warm clay-inspired vibrancy.',
    matchingKeywords: ['tile red', 'brick red', 'red']
  },
  {
    id: 'chocolate-brown',
    name: 'Chocolate Brown',
    hex: '#5C3D2E',
    accentHex: '#4E3629',
    finishType: 'Matte Texturized',
    sriIndex: 'SRI 41 • Dust Camouflage',
    heatReduction: '-4.8°C Ceiling Temp',
    bestForClimate: 'Karen, Naivasha, Nanyuki & Dusty Peri-Urban Landscapes',
    architecturalVibe: 'Earthy organic warmth that conceals red-soil dust and harmonizes with cream, beige, and yellow-stone walls.',
    matchingKeywords: ['chocolate', 'brown', 'coffee', 'teak']
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    hex: '#1C3124',
    accentHex: '#14532D',
    finishType: 'High-Gloss Polymer',
    sriIndex: 'SRI 44 • Tropical UV Guard',
    heatReduction: '-5.0°C Ceiling Temp',
    bestForClimate: 'Mt. Kenya, Tea Zones, Eco-Lodges & Agricultural Estates',
    architecturalVibe: 'Lush botanical elegance designed to blend seamlessly into tree canopies, resorts, and highland gardens.',
    matchingKeywords: ['forest green', 'hunter green', 'emerald', 'green']
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    hex: '#1A365D',
    accentHex: '#1E3A8A',
    finishType: 'High-Gloss Polymer',
    sriIndex: 'SRI 49 • High Reflectance',
    heatReduction: '-5.8°C Ceiling Temp',
    bestForClimate: 'Kisumu, Mombasa, Commercial Depots & Schools',
    architecturalVibe: 'Bold institutional and coastal statement profile with superior salt-mist and UV color fastness.',
    matchingKeywords: ['royal blue', 'blue']
  },
  {
    id: 'slate-grey',
    name: 'Slate Grey',
    hex: '#64748B',
    accentHex: '#475569',
    finishType: 'Matte Texturized',
    sriIndex: 'SRI 54 • Cool Roof Rated',
    heatReduction: '-6.4°C Ceiling Temp',
    bestForClimate: 'Industrial Parks, Syokimau, Athi River & Minimalist Homes',
    architecturalVibe: 'Architectural steel-slate neutrality with high solar reflectance for cooler warehouse and home interiors.',
    matchingKeywords: ['slate', 'grey', 'gray', 'silver', 'radiant']
  },
  {
    id: 'burgundy-decra',
    name: 'Burgundy Stone',
    hex: '#800020',
    accentHex: '#5C0017',
    finishType: 'Volcanic Stone Chip',
    sriIndex: 'SRI 45 • Acoustic Basalt',
    heatReduction: '-6.0°C + Silent Rain',
    bestForClimate: 'Runda, Nyali, Diplomatic Residences & Luxury Villas',
    architecturalVibe: 'Natural crushed basalt stone granules bonded in acrylic glaze—zero rain noise and 30+ year color lock.',
    matchingKeywords: ['burgundy']
  }
];
