import React, { useState, useMemo } from 'react';
import { Image, Sliders, Layers, CircleCheck, HelpCircle, HardHat, FileCode2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryItems } from '../data/gallery';
import { AtlasImage } from '../components/AtlasImage';

type GalleryFilter = 'all' | 'factory' | 'products' | 'projects';

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('all');

  const filterTabs = [
    { value: 'all', label: 'All Media' },
    { value: 'factory', label: 'Rolling Mill' },
    { value: 'products', label: 'Roof Profiles' },
    { value: 'projects', label: 'Site Projects' }
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItems;
    return galleryItems.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  const getFallbackType = (id: string, idx: number): any => {
    if (id.includes('factory')) {
      return idx === 0 ? 'factory-1' : idx === 1 ? 'factory-2' : 'factory-3';
    }
    if (id.includes('project')) {
      return idx === 3 ? 'project-1' : idx === 4 ? 'project-2' : 'project-3';
    }
    if (id.includes('roman-tile')) return 'roman-tile';
    if (id.includes('stone')) return 'stone-coated';
    return 'box-it4';
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="gallery-view-container">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Gallery introductory layout descriptions */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs inline-block">
            Project Portfolios
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Visual Media & Site Showcase
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Examine our high-capacity engineering lines on Mombasa Road alongside finished residential villas, resorts, and warehouses across Nairobi, Naivasha, Nakuru, and surrounding counties.
          </p>
        </div>

        {/* Categories filtration tab strip container */}
        <div className="flex justify-center" id="gallery-navigation-tabs">
          <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex flex-wrap gap-1 shadow-2xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value as GalleryFilter)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-atlas-blue text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery visual responsive grid */}
        <div id="gallery-images-grid">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  key={item.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200/50 shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
                    <AtlasImage
                      src={item.imagePath}
                      fallbackType={getFallbackType(item.id, idx)}
                      alt={item.title}
                      overlayBlueprint={true}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Visual floating category chip */}
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <span className="bg-slate-950/90 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded border border-slate-800">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col grow justify-between bg-white border-t border-slate-50">
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-800 text-sm tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-semibold font-mono">
                      <span>PROJECT INDEX: #{item.id.toUpperCase()}</span>
                      <span className="text-atlas-blue font-bold uppercase select-none">✓ Verified</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Future case-studies and Installations notice box support (As requested) */}
        <section className="bg-white rounded-xl border border-slate-200/60 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-1.5 bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <HardHat className="w-3.5 h-3.5 text-slate-500" />
              <span>Version 2.0 Architectural Modules</span>
            </span>
            <h3 className="text-xl font-display font-bold text-slate-900">Future Installation Guides & Case Studies</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We are compiling step-by-step rafter carpentry diagrams, dynamic windload ratings for coastal regions, and specific solar cell integration blueprints. Clients will soon be able to download complete project engineering files and browse case studies detailing exactly how top builders executed complex commercial layouts.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-xl space-y-3">
            <h4 className="font-display font-bold text-slate-800 text-sm flex items-center">
              <FileCode2 className="w-4 h-4 text-atlas-blue mr-2 shrink-0" />
              Submit Your Case Study
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you a contractor who recently roofed a villa using Atlas Mabati? Submit clear photographs and rafter specifications to our engineering team to get featured on our project showcases.
            </p>
            <a
              href="mailto:marketing@atlasmabati.co.ke?subject=Submit%20Case%20Study%20Proposal"
              className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 font-bold px-4 py-2 rounded-lg text-xs transition-colors"
            >
              Contact Marketing Line
            </a>
          </div>

        </section>

      </div>
    </div>
  );
};
