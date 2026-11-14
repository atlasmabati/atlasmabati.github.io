import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  X,
  Trash2,
  MessageSquare,
  Plus,
  Minus,
  User,
  MapPin,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  PlusCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getStructuredBasketWhatsAppUrl } from '../utils/whatsapp';

export const QuoteCartWidget: React.FC = () => {
  const { products, quoteCart, addToCart, removeFromCart, updateCartQty, clearCart, logLead } =
    useData();
  const [isOpen, setIsOpen] = useState(false);

  // Checkout Info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalItems = quoteCart.reduce((sum, item) => sum + item.quantity, 0);

  // Smart Roof System Completeness Analysis (Recommends missing accessories automatically)
  const hasRoofSheets = quoteCart.some(
    i =>
      i.product.category === 'roofing-profiles' ||
      i.product.category === 'premium-tiles' ||
      i.product.category === 'stone-coated'
  );
  const totalRoofSheets = quoteCart
    .filter(
      i =>
        i.product.category === 'roofing-profiles' ||
        i.product.category === 'premium-tiles' ||
        i.product.category === 'stone-coated'
    )
    .reduce((s, i) => s + i.quantity, 0);

  const hasRidgeCap = quoteCart.some(i => i.product.id.includes('ridge'));
  const hasScrews = quoteCart.some(i => i.product.id.includes('screws'));
  const hasGutters = quoteCart.some(i => i.product.category === 'pvc-gutters');

  const primaryColor = quoteCart[0]?.selectedColor || { name: 'Charcoal Black', hex: '#2C3E50' };

  const handleQuickAddAccessory = (productId: string, suggestedQty: number, unitLength: string) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    addToCart({
      id: `${prod.id}-${primaryColor.name.replace(/\s+/g, '-')}-rec`,
      product: prod,
      selectedColor: primaryColor,
      selectedGauge: prod.gaugeRange.split(' - ')[0] || 'Standard',
      quantity: Math.max(1, suggestedQty),
      length: unitLength
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (quoteCart.length === 0) return;

    const whatsappUrl = getStructuredBasketWhatsAppUrl(quoteCart, {
      customerName: name,
      customerPhone: phone,
      deliveryLocation: location,
      notes
    });

    const estValue = quoteCart.reduce((sum, item) => {
      const rate =
        item.product.category === 'stone-coated'
          ? 1850
          : item.product.category === 'accessories' || item.product.category === 'pvc-gutters'
          ? 1100
          : 2850;
      return sum + item.quantity * rate;
    }, 0);

    logLead({
      customerName: name || 'Quote Basket Client',
      customerPhone: phone || 'Via WhatsApp',
      location: location || 'Kenya',
      source: 'quote-basket',
      profileTitle: quoteCart[0].product.title,
      gauge: quoteCart[0].selectedGauge,
      colorName: quoteCart[0].selectedColor.name,
      estimatedAreaSqM: Math.max(40, totalRoofSheets * 3),
      estimatedValueKes: estValue,
      itemsSummary: quoteCart
        .map(i => `${i.quantity}x ${i.product.title} (${i.selectedColor.name}, ${i.selectedGauge})`)
        .join(', '),
      notes
    });

    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
      clearCart();
      setIsOpen(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="floating-quote-cart-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative bg-atlas-blue hover:bg-atlas-blue-dark text-white p-4 rounded-full shadow-2xl border-2 border-atlas-yellow flex items-center justify-center cursor-pointer group"
          aria-label="Open Quote Cart"
        >
          <ShoppingBag className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />

          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-atlas-yellow text-slate-900 font-display font-black text-xs min-w-[22px] h-5 rounded-full px-1.5 flex items-center justify-center border-2 border-white shadow-md">
              {totalItems}
            </span>
          )}
        </motion.button>
      </div>

      {/* Cart Slider Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
              id="quote-cart-drawer-panel"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="w-5 h-5 text-atlas-yellow" />
                  <div>
                    <h3 className="font-display font-bold text-base leading-none">
                      Your Roof Quote Basket
                    </h3>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      All-In-One Factory Order Builder
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items Area */}
              <div className="flex-grow overflow-y-auto p-5 space-y-4">
                {quoteCart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                    <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                      <ShoppingBag className="w-12 h-12" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-800 text-sm">
                        Your Quote Basket is Empty
                      </h4>
                      <p className="text-xs text-slate-400 max-w-[18rem] mx-auto leading-relaxed">
                        Browse our roofing profiles, preview colours, or use the Roof Calculator to
                        load your complete BOQ here!
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {quoteCart.length} Product Lines ({totalItems} units)
                      </span>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-xs text-rose-500 hover:text-rose-700 font-bold flex items-center cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1" />
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {quoteCart.map(item => (
                        <div
                          key={item.id}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-start space-x-3 text-xs text-slate-600"
                        >
                          <div className="space-y-1 flex-grow">
                            <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                              {item.product.title}
                            </h4>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                              <span className="flex items-center">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-slate-300 mr-1 inline-block"
                                  style={{ backgroundColor: item.selectedColor.hex }}
                                />
                                {item.selectedColor.name}
                              </span>
                              <span>Gauge: {item.selectedGauge}</span>
                              {item.length && <span>Cut: {item.length}</span>}
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-rose-500 p-0.5 cursor-pointer"
                              title="Remove item"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-md p-1 scale-90">
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, item.quantity - 1)}
                                className="p-0.5 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-slate-800 text-xs px-1 min-w-[16px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateCartQty(item.id, item.quantity + 1)}
                                className="p-0.5 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Smart Roof System Completeness Recommender */}
                    {hasRoofSheets && (!hasRidgeCap || !hasScrews || !hasGutters) && (
                      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3.5 space-y-2.5">
                        <div className="flex items-center space-x-1.5 text-[11px] font-extrabold text-amber-950 uppercase tracking-wide">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Complete Your Roof System ({primaryColor.name})</span>
                        </div>
                        <p className="text-[11px] text-amber-800 leading-snug">
                          Based on your <strong>{totalRoofSheets} sheets</strong>, builders also
                          include these matching factory accessories:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {!hasRidgeCap && (
                            <button
                              type="button"
                              onClick={() =>
                                handleQuickAddAccessory(
                                  'ridge-cap-valley',
                                  Math.max(4, Math.ceil(totalRoofSheets / 6)),
                                  '2.4 meters'
                                )
                              }
                              className="inline-flex items-center space-x-1 bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-amber-300 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              <PlusCircle className="w-3 h-3 text-atlas-blue" />
                              <span>
                                + {Math.max(4, Math.ceil(totalRoofSheets / 6))} Ridge Caps
                              </span>
                            </button>
                          )}
                          {!hasScrews && (
                            <button
                              type="button"
                              onClick={() =>
                                handleQuickAddAccessory(
                                  'self-tapping-screws',
                                  Math.max(2, Math.ceil((totalRoofSheets * 18) / 100)),
                                  'Packet of 100 pcs'
                                )
                              }
                              className="inline-flex items-center space-x-1 bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-amber-300 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              <PlusCircle className="w-3 h-3 text-atlas-blue" />
                              <span>
                                + {Math.max(2, Math.ceil((totalRoofSheets * 18) / 100))} Pkts EPDM
                                Screws
                              </span>
                            </button>
                          )}
                          {!hasGutters && (
                            <button
                              type="button"
                              onClick={() =>
                                handleQuickAddAccessory(
                                  'premium-pvc-gutter',
                                  Math.max(6, Math.ceil(totalRoofSheets / 5)),
                                  '3.0 meters'
                                )
                              }
                              className="inline-flex items-center space-x-1 bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-amber-300 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
                            >
                              <PlusCircle className="w-3 h-3 text-atlas-blue" />
                              <span>
                                + {Math.max(6, Math.ceil(totalRoofSheets / 5))} PVC Gutters
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Customer Information Form */}
                    <form
                      onSubmit={handleCheckout}
                      className="border-t border-slate-100 pt-4 mt-4 space-y-3.5"
                    >
                      <h4 className="font-display font-bold text-slate-900 text-sm">
                        Site Delivery Details
                      </h4>

                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                              <User className="w-3 h-3 text-atlas-blue mr-1" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Stephen Kimaru"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-atlas-blue/30"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="e.g. 0712 345 678"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-atlas-blue/30"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                            <MapPin className="w-3 h-3 text-atlas-blue mr-1" />
                            Site Delivery Location
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ruiru, Machakos, Nakuru"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-atlas-blue/30"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center">
                            <FileText className="w-3 h-3 text-atlas-blue mr-1" />
                            Additional Instructions (Optional)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Custom rafter lengths, delivery timing..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-atlas-blue/30"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitted}
                        className={`w-full flex items-center justify-center text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-xs cursor-pointer ${
                          submitted
                            ? 'bg-emerald-600'
                            : 'bg-gradient-to-r from-atlas-blue to-slate-900 hover:from-sky-900 hover:to-slate-950 hover:scale-[1.01]'
                        }`}
                      >
                        {submitted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2 animate-bounce" />
                            Opening WhatsApp...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Dispatch Basket to WhatsApp
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
