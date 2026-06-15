import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ShieldAlert, Award, ChevronRight, MessageSquare, Flame, CheckCircle2, ArrowRight, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';
import { faqs } from '../data/faqs';
import { galleryItems } from '../data/gallery';
import { AtlasImage } from '../components/AtlasImage';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Get 3 popular products for preview
  const popularProducts = products.filter(p => p.isPopular).slice(0, 3);
  
  // Get first 4 gallery items for preview
  const previewGallery = galleryItems.slice(0, 4);

  // Get first 4 FAQs for preview
  const previewFaqs = faqs.slice(0, 4);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  const trustIndicators = [
    {
      icon: <Award className="w-8 h-8 text-atlas-yellow" />,
      title: 'High Quality Products',
      desc: 'Formed from alu-zinc steel backing with advanced texturized matte finishes.'
    },
    {
      icon: <Truck className="w-8 h-8 text-atlas-yellow" />,
      title: '24–48 Hour Delivery',
      desc: 'Rapid nationwide delivery dispatch direct to building sites or hardware networks.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-atlas-yellow" />,
      title: 'Affordable Pricing',
      desc: 'Enjoy competitive factory-direct wholesale pricing with no intermediary markups.'
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-atlas-yellow" />,
      title: 'Professional Service',
      desc: 'Expert support channels assisting you with rafter blueprints and sheet count estimates.'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden" id="home-view-container">
      
      {/* 1. Hero Showcase Section */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-32 overflow-hidden px-4 sm:px-6 lg:px-8">
        
        {/* Absolute Background Asset */}
        <div className="absolute inset-0 z-0">
          <AtlasImage
            src="/images/hero/hero-1.jpg"
            fallbackType="hero"
            alt="Atlas Mabati Roll Forming Factory"
            overlayBlueprint={true}
            className="w-full h-full"
          />
          {/* Solid deep blue overlay to marry brand colours */}
          <div className="absolute inset-0 bg-slate-950/80 md:bg-gradient-to-r md:from-slate-950 via-slate-900/85 md:to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-atlas-yellow/20 text-atlas-yellow border border-atlas-yellow/30 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Kenya’s Foremost Steel Roofing Rolling Mill</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight"
            >
              Quality Steel Roofing Solutions <br className="hidden sm:inline" />
              <span className="text-atlas-yellow">Built For Kenya</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Manufacturing premium roofing profiles and accessories for homes, businesses, and construction projects. Engineered to withstand elements and deliver timeless beauty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-colors group text-sm cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                Request Custom Quote
              </Link>
              <Link
                to="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-705 text-white border border-slate-700 font-semibold px-8 py-4 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
              >
                View Roofing Profiles
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators Grids */}
      <section className="py-12 bg-white relative z-20 border-b border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start space-x-4 p-4 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="p-3 bg-amber-500/10 rounded-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-950 text-base">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Company Short Preview */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative h-[25rem] w-full rounded-2xl overflow-hidden shadow-xl">
              <AtlasImage
                src="/images/gallery/project-1.jpg"
                fallbackType="project-1"
                alt="Finely roofed Kenyan estate"
                overlayBlueprint={true}
              />
            </div>
            {/* Overlay badge statistics */}
            <div className="absolute -bottom-6 -right-6 bg-atlas-blue text-white p-6 rounded-2xl shadow-lg border border-atlas-blue-dark max-w-[12rem] text-center hidden sm:block">
              <span className="block font-display text-3xl font-extrabold text-atlas-yellow">100%</span>
              <span className="block text-xs uppercase tracking-wider font-semibold text-slate-300 mt-1">Kenyan Owned & Operated</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block">
              Our Legacy of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Manufacturing High-Performance Roofs Dedicated to Kenya
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Atlas Mabati operates under Atlas Rolling Mill, manufacturing roofing profiles configured specifically to meet the climatic humidity and architectural criteria of Kenya’s coastal, volcanic rift valley, and lakeside regions.
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              By utilizing high-grade raw steel coated directly with alu-zinc composites, our sheets provide premium corrosion resistance, cooler indoor temperatures, and can easily be fabricated to customized sheet lengths matching your blueprints.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-bold text-atlas-blue hover:text-atlas-blue-dark transition-colors group bg-white border border-slate-200 shadow-xs px-5 py-2.5 rounded-lg hover:border-atlas-blue"
              >
                Learn Our Background Story
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Products Portfolio Preview Header */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest">
              Explore Our Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Popular Certified Roofing Profiles
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Dynamically rolled to precision millimeters. Standard profiles feature advanced heat-repelling outer paints with secure interlock loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-atlas-blue text-white font-bold px-7 py-3 rounded-lg shadow-md transition-all text-xs"
            >
              Examine Full Catalogue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Roll Forming Manufacturing Preview */}
      <section className="py-20 bg-slate-900 text-white relative px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-15">
          <AtlasImage
            src="/images/factory/machine-1.jpg"
            fallbackType="factory-1"
            alt="Seamless roller mills"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest block">
              Precision Engineering Live
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Our Precision Roll Forming Standards
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Wondering how raw alu-zinc steel transforms into Kenyas most sturdy roofs? Our advanced rolling lines run specialized automated roller dies, which shape, rib, profile, and cut mabati panels cleanly within fractions of millimeters.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              Each stage is transparently managed — from core mechanical decoiling to electronic length trimming and safety bubble-wrapping.
            </p>
            
            <div className="pt-2">
              <Link
                to="/process"
                className="inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-lg shadow-sm transition-colors text-xs"
              >
                Inspect Rolling Workflow Step-by-Step
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="h-44 rounded-xl overflow-hidden relative shadow-md">
              <AtlasImage src="/images/factory/machine-1.jpg" fallbackType="factory-1" alt="Standard decoiler line" />
            </div>
            <div className="h-44 rounded-xl overflow-hidden relative shadow-md mt-6">
              <AtlasImage src="/images/factory/machine-2.jpg" fallbackType="factory-2" alt="Die profile pressing rollers" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Responsive Preview */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block">
                Portfolio Showcase
              </span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                Our Plant, Profiles & Finished Projects
              </h2>
            </div>
            <div>
              <Link
                to="/gallery"
                className="inline-flex items-center text-sm font-bold text-atlas-blue hover:text-atlas-blue-dark transition-colors group"
              >
                Launch Fully Filtered Gallery
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Staggered visual gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {previewGallery.map((item, idx) => (
              <div
                key={item.id}
                className="relative h-64 rounded-xl overflow-hidden shadow-sm group border border-slate-100"
              >
                <AtlasImage
                  src={item.imagePath}
                  fallbackType={idx === 0 ? 'factory-1' : idx === 1 ? 'project-1' : idx === 2 ? 'factory-3' : 'project-3'}
                  alt={item.title}
                  className="w-full h-full"
                />
                
                {/* Information sliding overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 md:flex flex-col justify-end p-4 hidden">
                  <h4 className="font-display font-bold text-white text-xs leading-none">{item.title}</h4>
                  <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-tight">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Collapsible FAQ Interactive Segment */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest">
              Helping You Know Best
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Roofing Inquiries
            </h2>
            <p className="text-sm text-slate-500">
              Quick insights into alu-zinc sheet specifications, dispatch timelines, and our wholesale networks.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5" id="home-faq-accordion">
            {previewFaqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-2xs transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-slate-900 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-atlas-yellow select-none"
                  >
                    <span className="flex items-center space-x-3 text-sm sm:text-base">
                      <HelpCircle className="w-5 h-5 text-atlas-blue shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-atlas-yellow' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <Link
              to="/faq"
              className="inline-flex items-center text-sm font-bold text-atlas-blue hover:text-atlas-blue-dark transition-colors group"
            >
              Analyze More Detailed Questions
              <ChevronRight className="w-4 h-4 ml-1.2 group-hover:translate-x-1 duration-250" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Decisive strong Call To Action section */}
      <section className="py-20 bg-atlas-blue text-white relative px-4 sm:px-6 lg:px-8 overflow-hidden rounded-t-[2.5rem] shadow-2xl">
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Backdrop color blurs for visual punch */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-atlas-yellow/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-900/60 px-3.5 py-1.5 rounded-full border border-slate-800">
            Let’s Shape Your Ideal Roofing Project
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-tight tracking-tight">
            Ready to Protect Your Structure with <br className="hidden sm:inline" />
            Kenya’s Elite Roof Panels?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            Get connected instantly with an expert estimating manager. Provide your roof sizes, selected colors, and preference profiles to receive an official, budget-friendly wholesale quote.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Build Free Quote
            </Link>
            <a
              href={`tel:+254712345678`}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl border border-slate-800 shadow-md transition-all"
            >
              Call Factory Line
            </a>
          </div>
        </div>
      </section>

      {/* Dynamic technical specs pop-up display */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
