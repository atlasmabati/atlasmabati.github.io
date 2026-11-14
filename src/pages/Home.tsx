import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ShieldAlert, Award, ChevronRight, MessageSquare, Flame, CheckCircle2, ArrowRight, HelpCircle, ChevronDown, Sparkles, ChevronLeft, Star, Quote, Calendar, Clock, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../context/DataContext';
import { faqs } from '../data/faqs';
import { ATLAS_CONFIG } from '../utils/config';
import { AtlasImage } from '../components/AtlasImage';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';
import { 
  HERO_SLIDES, 
  HIGH_QUALITY_SHOWCASE as ABOUT_IMAGES, 
  MANUFACTURING_STAGES as ROLL_STEPS 
} from '../data/assets';

const TESTIMONIALS = [
  {
    quote: "Atlas Mabati completely simplified my roofing project! I sent my rafter layout on WhatsApp and received a precise quote in 10 minutes. The Charcoal Black Tile-effect sheets look absolutely stunning on my new 4-bedroom home in Kikuyu.",
    author: "Grace Mwangi",
    role: "Homeowner, Kikuyu",
    project: "Tile-Effect Profile, Charcoal Black",
    image: "/images/gallery/project-1.jpg"
  },
  {
    quote: "As a commercial structural contractor, durability and delivery speed are critical. Atlas delivered over 200 sheets of G28 Box Profile directly to our warehouse site in Shimanzi within 36 hours. Best wholesale rates in Kenya.",
    author: "Eng. Stephen Ochieng",
    role: "Lead Civil Contractor",
    project: "Box IT4 Profile, Brick Red",
    image: "/images/gallery/project-2.jpg"
  },
  {
    quote: "Our clients expect extreme precision. The continuous-rolling capability up to 9 meters allowed us to build seamless warehouse roofing with zero side leaks or joint failures. Their engineering team is unmatched.",
    author: "Arch. David Mutua",
    role: "Principal Architect, Triad Kenya",
    project: "Box IT4 Matte, Forest Green",
    image: "/images/gallery/project-3.jpg"
  },
  {
    quote: "We have stocked Atlas products in our hardware outlets across Nakuru for 3 years. Homeowners consistently ask for Atlas Mabati by name because the color does not peel or fade under hot sunshine.",
    author: "Amos Kiprop",
    role: "Director, Kiprop Hardware Ltd",
    project: "Corrugated Profile, Royal Blue",
    image: "/images/gallery/project-1.jpg"
  }
];

const useSwipeGesture = (onSwipeLeft: () => void, onSwipeRight: () => void) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      onSwipeLeft();
    } else if (distance < -minSwipeDistance) {
      onSwipeRight();
    }
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
};

export const Home: React.FC = () => {
  const { products, galleryItems } = useData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Carousel & Page states
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activeAboutImgIdx, setActiveAboutImgIdx] = useState(0);
  const [activeRollStep, setActiveRollStep] = useState(0);
  const [portfolioPage, setPortfolioPage] = useState(0);

  // Swipe gesture hooks for all sections
  const heroSwipe = useSwipeGesture(
    () => setActiveHeroIdx((prev) => (prev + 1) % HERO_SLIDES.length),
    () => setActiveHeroIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  );

  const aboutSwipe = useSwipeGesture(
    () => setActiveAboutImgIdx((prev) => (prev + 1) % ABOUT_IMAGES.length),
    () => setActiveAboutImgIdx((prev) => (prev - 1 + ABOUT_IMAGES.length) % ABOUT_IMAGES.length)
  );

  const rollSwipe = useSwipeGesture(
    () => setActiveRollStep((prev) => (prev + 1) % ROLL_STEPS.length),
    () => setActiveRollStep((prev) => (prev - 1 + ROLL_STEPS.length) % ROLL_STEPS.length)
  );

  const portfolioSwipe = useSwipeGesture(
    () => setPortfolioPage((prev) => (prev + 1) % 5),
    () => setPortfolioPage((prev) => (prev - 1 + 5) % 5)
  );

  // Autoplay Testimonial Carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Autoplay Hero Slider every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Autoplay About Images Slider every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAboutImgIdx((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Autoplay Roll forming steps every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRollStep((prev) => (prev + 1) % ROLL_STEPS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Get 5 popular products for preview
  const popularProducts = products.filter(p => p.isPopular).slice(0, 5);
  
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
      
      {/* 1. Hero Showcase Section (Interactive Slider) */}
      <section 
        onTouchStart={heroSwipe.onTouchStart}
        onTouchMove={heroSwipe.onTouchMove}
        onTouchEnd={heroSwipe.onTouchEnd}
        className="relative bg-slate-950 text-white min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] py-16 lg:py-24 overflow-hidden px-4 sm:px-6 lg:px-8 flex items-center cursor-grab active:cursor-grabbing"
      >
        
        {/* Absolute Background Asset with Pre-rendered and Cross-faded Layers for Smooth Touch Swipes */}
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = activeHeroIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 1 : 0 }}
              >
                <AtlasImage
                  src={slide.bgImage}
                  fallbackType={slide.fallback as any}
                  alt={slide.title}
                  overlayBlueprint={false}
                  loading={isActive ? "eager" : "lazy"}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
          {/* A light contrast overlay keeps the message legible without hiding the photography. */}
          <div className="absolute inset-0 bg-slate-950/50 md:bg-gradient-to-r md:from-slate-950/75 md:via-slate-900/45 md:to-slate-900/10 z-10" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-9 space-y-6 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div
                  className="inline-flex items-center space-x-2 bg-atlas-yellow/20 text-atlas-yellow border border-atlas-yellow/30 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                >
                  <Award className="w-3.5 h-3.5 animate-pulse" />
                  <span>{HERO_SLIDES[activeHeroIdx].tag}</span>
                </div>
                
                <h1
                  className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight"
                >
                  {HERO_SLIDES[activeHeroIdx].title} <br className="hidden sm:inline" />
                  <span className="text-atlas-yellow">{HERO_SLIDES[activeHeroIdx].highlight}</span>
                </h1>

                <p
                  className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
                >
                  {HERO_SLIDES[activeHeroIdx].description}
                </p>

                <div
                  className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4"
                >
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105 duration-155 group text-sm cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                    Request Custom Quote
                  </Link>
                  <Link
                    to="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-850 hover:bg-slate-800 text-white border border-slate-750 font-semibold px-8 py-4 rounded-xl shadow-md transition-colors text-sm cursor-pointer"
                  >
                    View Roofing Profiles
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sleek, Nearly Invisible Progress Indicator Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroIdx(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                activeHeroIdx === idx ? 'w-5 bg-atlas-yellow' : 'w-1 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
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
            <div 
              onTouchStart={aboutSwipe.onTouchStart}
              onTouchMove={aboutSwipe.onTouchMove}
              onTouchEnd={aboutSwipe.onTouchEnd}
              className="relative h-[25rem] w-full rounded-2xl overflow-hidden shadow-xl bg-slate-950 cursor-grab active:cursor-grabbing"
            >
              {ABOUT_IMAGES.map((image, idx) => {
                const isActive = activeAboutImgIdx === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 1 : 0 }}
                  >
                    <AtlasImage
                      src={image.src}
                      fallbackType="project-1"
                      alt={image.alt}
                      overlayBlueprint={true}
                      loading={isActive ? "eager" : "lazy"}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Floating text label */}
                    <div className="absolute bottom-4 left-4 bg-slate-950/70 border border-white/10 text-white backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md z-10">
                      {image.label}
                    </div>
                  </motion.div>
                );
              })}

              {/* Sleek Minimalist About Slider Dots */}
              <div className="absolute bottom-4 right-4 flex space-x-1 bg-black/35 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-white/5 z-20">
                {ABOUT_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAboutImgIdx(idx)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      activeAboutImgIdx === idx ? 'w-4 bg-atlas-yellow' : 'w-1 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Overlay badge statistics */}
            <div className="absolute -bottom-6 -right-6 bg-atlas-blue text-white p-6 rounded-2xl shadow-lg border border-atlas-blue-dark max-w-[12rem] text-center hidden sm:block z-10">
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

          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-6 pt-1 px-1 -mx-1 scrollbar-none snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-x-visible lg:pb-0">
              {popularProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[82vw] sm:w-[46vw] md:w-[30vw] lg:w-auto shrink-0 lg:shrink snap-start lg:snap-align-none"
                >
                  <ProductCard
                    product={product}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                </div>
              ))}
            </div>
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

          <div className="lg:col-span-5 relative">
            <div 
              onTouchStart={rollSwipe.onTouchStart}
              onTouchMove={rollSwipe.onTouchMove}
              onTouchEnd={rollSwipe.onTouchEnd}
              className="relative h-[22rem] rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800 cursor-grab active:cursor-grabbing"
            >
              {ROLL_STEPS.map((step, idx) => {
                const isActive = activeRollStep === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full"
                    style={{ pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 1 : 0 }}
                  >
                    <AtlasImage
                      src={step.image}
                      fallbackType={step.fallback as any}
                      alt={step.title}
                      loading={isActive ? "eager" : "lazy"}
                      className="w-full h-full object-cover opacity-80"
                    />
                    {/* Explanatory text overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6 z-10">
                      <span className="text-[10px] font-bold text-atlas-yellow uppercase tracking-widest mb-1">
                        Rolling Line Stage
                      </span>
                      <h4 className="font-display font-bold text-white text-lg">{step.title}</h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Steps Dots */}
              <div className="absolute top-4 right-4 flex space-x-1 bg-black/35 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-white/5 z-20">
                {ROLL_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveRollStep(idx)}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${activeRollStep === idx ? 'w-4 bg-atlas-yellow' : 'w-1 bg-white/40 hover:bg-white/60'}`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>
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

          {/* Staggered visual gallery with 5 swipable pages */}
          <div 
            onTouchStart={portfolioSwipe.onTouchStart}
            onTouchMove={portfolioSwipe.onTouchMove}
            onTouchEnd={portfolioSwipe.onTouchEnd}
            className="relative group/gallery space-y-8 cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={portfolioPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {galleryItems.slice(portfolioPage * 4, (portfolioPage + 1) * 4).map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative h-64 rounded-xl overflow-hidden shadow-sm group border border-slate-100 bg-slate-950"
                  >
                    <AtlasImage
                      src={item.imagePath}
                      fallbackType={idx === 0 ? 'factory-1' : idx === 1 ? 'project-1' : idx === 2 ? 'factory-3' : 'project-3'}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Information sliding overlay (fully visible on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <span className="text-[9px] font-bold text-atlas-yellow uppercase tracking-widest leading-none mb-1">
                        {item.category === 'factory' ? 'Mill Facility' : item.category === 'products' ? 'Spec Profile' : 'Kenyan Site'}
                      </span>
                      <h4 className="font-display font-bold text-white text-xs leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-slate-300 mt-1 line-clamp-2 leading-tight">{item.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots centered with no arrows */}
            <div className="flex justify-center items-center pt-4 border-t border-slate-100">
              <div className="flex space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                {[0, 1, 2, 3, 4].map((pageIdx) => (
                  <button
                    key={pageIdx}
                    onClick={() => setPortfolioPage(pageIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${portfolioPage === pageIdx ? 'w-6 bg-atlas-blue' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to portfolio page ${pageIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel Segment */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-800/60 px-3 py-1 rounded-full border border-slate-750">
              Voice of Verified Builders
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
              What Homeowners & Contractors Say
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Real stories from homeowners, commercial riggers, and hardware networks across Kenya.
            </p>
          </div>

          {/* Testimonial Core Box */}
          <div className="relative bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-12 overflow-hidden shadow-2xl min-h-[340px] flex flex-col justify-between">
            <Quote className="absolute -top-3 -right-3 w-32 h-32 text-slate-900/50 pointer-events-none" />

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonialIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-6"
                >
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 text-atlas-yellow fill-atlas-yellow" />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-slate-100 italic">
                    "{TESTIMONIALS[activeTestimonialIdx].quote}"
                  </p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-800/80">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-atlas-yellow shrink-0 relative bg-slate-800">
                      <AtlasImage
                        src={TESTIMONIALS[activeTestimonialIdx].image}
                        fallbackType="project-1"
                        alt={TESTIMONIALS[activeTestimonialIdx].author}
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{TESTIMONIALS[activeTestimonialIdx].author}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {TESTIMONIALS[activeTestimonialIdx].role} • <span className="text-atlas-yellow">{TESTIMONIALS[activeTestimonialIdx].project}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Custom Interactive Sliders & Controls */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-900/40">
              
              {/* Pagination Dots */}
              <div className="flex space-x-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${activeTestimonialIdx === idx ? 'w-6 bg-atlas-yellow' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                  />
                ))}
              </div>

              {/* Arrow navigation buttons */}
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-800 hover:text-white transition-all text-slate-400 cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-800 hover:text-white transition-all text-slate-400 cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

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
      <section className="py-20 bg-slate-950 text-white relative px-4 sm:px-6 lg:px-8 overflow-hidden rounded-t-[2.5rem] shadow-2xl border-t border-slate-800">
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Backdrop color blurs for visual punch */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-atlas-yellow/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-12">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">
              Let’s Shape Your Ideal Roofing Project
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-tight tracking-tight">
              Ready to Protect Your Structure with <br className="hidden sm:inline" />
              Kenya’s Elite Roof Panels?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Get connected instantly with our team. Share your roof layout, dimensions, or blueprints via any channel below to receive a direct, factory-wholesale quote.
            </p>
          </div>

          {/* Redesigned 3-Column Quick Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* WhatsApp channel */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <MessageSquare className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">WhatsApp Estimator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Send your sketch, blueprint, or sheet list. Get a free custom material takeoff and quote in minutes.
                </p>
              </div>
              <a
                href={`https://wa.me/${ATLAS_CONFIG.whatsappRaw}?text=Hi%20Atlas%20Mabati%20team%2C%20I'm%20interested%20in%20requesting%20a%20roofing%20estimate%20for%20my%20building%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-5 rounded-xl text-xs transition-colors"
              >
                Start WhatsApp Estimate
              </a>
            </div>

            {/* Direct Dial channel */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-atlas-yellow/30 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-atlas-yellow">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Factory Phone Lines</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Have urgent questions about mabati gauges, custom cuts, or delivery? Call our sales team directly.
                </p>
              </div>
              <a
                href={`tel:${ATLAS_CONFIG.phone1Raw}`}
                className="inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold py-3 px-5 rounded-xl text-xs transition-colors"
              >
                Call {ATLAS_CONFIG.phone1}
              </a>
            </div>

            {/* Email Blueprint channel */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-sky-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-white">Office Email Desk</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submit formal bidding requests, project tenders, or architectural drawing files directly to our inbox.
                </p>
              </div>
              <a
                href={`mailto:${ATLAS_CONFIG.email1}`}
                className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-5 rounded-xl text-xs transition-colors border border-slate-700"
              >
                Send File via Email
              </a>
            </div>

          </div>

          <div className="text-center space-y-2 pt-4">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-atlas-yellow" />
              <span>Office Hours: {ATLAS_CONFIG.workingHours}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              *Nationwide delivery dispatch within 24 to 48 hours directly to site or hardware dropoff.
            </p>
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
