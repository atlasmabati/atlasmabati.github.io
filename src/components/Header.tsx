import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Clock, MapPin, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ATLAS_CONFIG } from '../utils/config';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Roofing Products', path: '/products' },
    { name: 'Manufacturing Process', path: '/process' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  // Monitor scrolling to dim the header with backdrop-blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on routing shifts
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname === path;
  };

  return (
    <header className="w-full z-40 relative">
      {/* Top Professional Banner Contact Strip */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-atlas-yellow" />
              <span>{ATLAS_CONFIG.workingHours}</span>
            </span>
            <span className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-atlas-yellow" />
              <span>{ATLAS_CONFIG.location}</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href={`tel:${ATLAS_CONFIG.phoneRaw}`} className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-atlas-yellow" />
              <span className="font-medium">{ATLAS_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${ATLAS_CONFIG.email}`} className="flex items-center space-x-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-atlas-yellow" />
              <span>{ATLAS_CONFIG.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header Block */}
      <nav
        id="main-navigation-bar"
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'sticky top-0 bg-white/95 backdrop-blur-md shadow-md border-slate-200/50 py-3'
            : 'relative bg-white border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Brand Logo Identity */}
          <Link to="/" className="flex items-center space-x-3 group" id="brand-logo-anchor">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-atlas-blue leading-none group-hover:text-atlas-blue-dark transition-colors">
                  ATLAS
                </span>
                <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-atlas-yellow leading-none">
                  MABATI
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-500 mt-1">
                {ATLAS_CONFIG.parentCompany}
              </span>
            </div>
          </Link>

          {/* Navigational Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1" id="desktop-menu-container">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 rounded-lg ${
                  isActive(link.path)
                    ? 'text-atlas-blue'
                    : 'text-slate-600 hover:text-atlas-blue hover:bg-slate-50'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-atlas-yellow rounded"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Primary Call to Action Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-900 font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform active:scale-95 text-sm"
              id="cta-quote-header"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Request Instant Quote
            </Link>
          </div>

          {/* Hamburger Mobile Access Action */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-trigger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-atlas-blue hover:bg-slate-100/80 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-Down Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden z-50 lg:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-slate-100 text-atlas-blue border-l-4 border-atlas-yellow pl-3'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-atlas-blue'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'text-atlas-blue' : 'text-slate-400'}`} />
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-100 px-4 space-y-4">
                <div className="flex flex-col space-y-2 text-sm text-slate-500">
                  <span className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-atlas-yellow" />
                    <a href={`tel:${ATLAS_CONFIG.phoneRaw}`} className="hover:text-atlas-blue font-medium text-slate-700">
                      {ATLAS_CONFIG.phone}
                    </a>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-atlas-yellow" />
                    <span>{ATLAS_CONFIG.email}</span>
                  </span>
                </div>
                
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-900 font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Get Roof Estimate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
