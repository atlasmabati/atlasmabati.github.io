export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: 'roofing-profiles' | 'premium-tiles' | 'accessories';
  categoryLabel: string;
  description: string;
  extendedDescription: string;
  features: string[];
  specifications: ProductSpecification[];
  colors: { name: string; hex: string }[];
  imagePath: string;
  gaugeRange: string;
  isPopular?: boolean;
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
