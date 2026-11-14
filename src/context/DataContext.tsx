import React, { createContext, useContext, useEffect, useState } from 'react';
import { GalleryItem, LeadRecord, Product, QuoteItem } from '../types';
import { galleryItems as initialGallery } from '../data/gallery';
import { products as initialProducts } from '../data/products';

export type NewLeadInput = Omit<LeadRecord, 'id' | 'createdAt' | 'status' | 'propensity'>;

interface DataContextType {
  products: Product[];
  galleryItems: GalleryItem[];
  quoteCart: QuoteItem[];
  addToCart: (item: QuoteItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
  logLead: (input: NewLeadInput) => void;
  trackColorSwatch: (colorName: string) => void;
  trackProfileView: (productId: string, gauge?: string) => void;
  trackCalculatorRun: (wastageSavedKes: number, usedCustomCut: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const enrichProductsWithImages = (list: Product[]): Product[] => list.map((product) => ({
  ...product,
  images: product.images?.length ? product.images : [
    product.imagePath,
    `/images/products/${product.id}/installed.jpg`,
    `/images/products/${product.id}/detail.jpg`,
    `/images/products/${product.id}/alt.jpg`,
    `/images/products/${product.id}/project.jpg`,
  ],
}));

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteCart, setQuoteCart] = useState<QuoteItem[]>([]);
  const products = enrichProductsWithImages(initialProducts);
  const galleryItems = initialGallery;

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('atlas_cart');
      if (savedCart) setQuoteCart(JSON.parse(savedCart));

      // Remove data left by the retired browser-only portal, including old demo leads.
      ['atlas_products', 'atlas_gallery', 'atlas_leads', 'atlas_analytics'].forEach((key) => localStorage.removeItem(key));
    } catch {
      setQuoteCart([]);
    }
  }, []);

  const saveCart = (items: QuoteItem[]) => {
    setQuoteCart(items);
    localStorage.setItem('atlas_cart', JSON.stringify(items));
  };

  const addToCart = (newItem: QuoteItem) => {
    const existingItem = quoteCart.find((item) => item.id === newItem.id);
    const nextCart = existingItem
      ? quoteCart.map((item) => item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item)
      : [...quoteCart, newItem];
    saveCart(nextCart);
  };

  const removeFromCart = (id: string) => saveCart(quoteCart.filter((item) => item.id !== id));
  const updateCartQty = (id: string, quantity: number) => saveCart(
    quoteCart.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item),
  );
  const clearCart = () => saveCart([]);

  // Contact details are sent only through the visitor's WhatsApp flow; this static site does not retain them.
  const logLead = (_input: NewLeadInput) => undefined;
  const trackColorSwatch = (_colorName: string) => undefined;
  const trackProfileView = (_productId: string, _gauge?: string) => undefined;
  const trackCalculatorRun = (_wastageSavedKes: number, _usedCustomCut: boolean) => undefined;

  return (
    <DataContext.Provider value={{
      products,
      galleryItems,
      quoteCart,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      logLead,
      trackColorSwatch,
      trackProfileView,
      trackCalculatorRun,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
