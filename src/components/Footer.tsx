import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Truck, Clock, ArrowRight } from 'lucide-react';
import { ATLAS_CONFIG } from '../utils/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800" id="global-site-footer">
      
      {/* Upper Brand USP Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-slate-800 text-atlas-yellow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Unmatched Quality Guarantee</h4>
              <p className="text-xs text-slate-400 mt-0.5">Premium grade high-tensile alu-zinc steel substrate.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-slate-800 text-atlas-yellow">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Nationwide Delivery Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Speedy 24–48hr shipping dispatch all across Kenya.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <div className="p-3 rounded-full bg-slate-800 text-atlas-yellow">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-base">Custom Manufacturing Cuts</h4>
              <p className="text-xs text-slate-400 mt-0.5">Roll forming exact sheet sizes custom to your rafters.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Grids */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-display font-extrabold tracking-tight text-white leading-none">
                  ATLAS
                </span>
                <span className="text-2xl font-display font-bold tracking-tight text-atlas-yellow leading-none">
                  MABATI
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 mt-1">
                {ATLAS_CONFIG.parentCompany}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Atlas Mabati is a leading Kenyan steel rolling manufacturer providing durable, rust-resistant, and premium roofing profiles and structural accessories.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 bg-slate-800 text-atlas-yellow text-xs font-semibold rounded-full border border-slate-700/60">
                ★ ISO Standards Compliant
              </span>
            </div>
          </div>

          {/* Col 2: High-speed Page Links */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-atlas-yellow transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-slate-600 group-hover:text-atlas-yellow transition-colors" />
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-atlas-yellow transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-slate-600 group-hover:text-atlas-yellow transition-colors" />
                  About Our Mill
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-slate-600 group-hover:text-atlas-yellow transition-colors" />
                  Roofing Profiles
                </Link>
              </li>
              <li>
                <Link to="/process" className="hover:text-atlas-yellow transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-slate-600 group-hover:text-atlas-yellow transition-colors" />
                  Rolling Workflow
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-atlas-yellow transition-colors flex items-center group">
                  <ArrowRight className="w-3.5 h-3.5 mr-2 text-slate-600 group-hover:text-atlas-yellow transition-colors" />
                  Visual Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Segments */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-slate-800 pb-2">
              Our Profiles
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Box IT4 Profile</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Roman Tile Profile</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Corrugated Profile</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Curved Tile Profile</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Stone Coated Decra</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-atlas-yellow transition-colors">Roofing Safety Valleys</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Primary Coordinates */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-white text-base tracking-wide uppercase border-b border-slate-800 pb-2">
              Our Offices
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-atlas-yellow shrink-0 mt-0.5" />
                <span>{ATLAS_CONFIG.location}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-atlas-yellow shrink-0" />
                <a href={`tel:${ATLAS_CONFIG.phoneRaw}`} className="hover:text-white transition-colors">
                  {ATLAS_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-atlas-yellow shrink-0" />
                <a href={`mailto:${ATLAS_CONFIG.email}`} className="hover:text-white transition-colors">
                  {ATLAS_CONFIG.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* High-End Portfolio / Production Signature Panel (Super elegant & noticeable, as requested) */}
      <div className="bg-slate-950/80 py-8 px-4 border-t border-slate-800/60 text-slate-400 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-slate-400">
          
          {/* Studio Collaborators (Stephen Kimaru + Ma Creatives) */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
              <span>Designed & Created by</span>
              <a
                href={ATLAS_CONFIG.creator.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-atlas-yellow transition-colors inline-flex items-center"
              >
                {ATLAS_CONFIG.creator.name}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 shadow-sm">
              <span>Need a website like this?</span>
              <a
                href={ATLAS_CONFIG.agency.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-atlas-yellow hover:text-amber-400 transition-colors inline-flex items-center"
              >
                Talk to {ATLAS_CONFIG.agency.name}
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* Copy-writing notices */}
          <div className="text-slate-500">
            <p>&copy; {currentYear} {ATLAS_CONFIG.businessName}. All Rights Reserved.</p>
            <p className="text-[10px] mt-0.5">High-Performance Metal Roofing manufacturing in Nairobi, Kenya.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
