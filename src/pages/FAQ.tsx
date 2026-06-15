import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone, Mail, FileText, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../data/faqs';
import { ATLAS_CONFIG } from '../utils/config';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="faq-view-container">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* FAQ Intro */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs inline-block">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Roofing & Sales Knowledge Base
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Get immediate answers regarding structural sheet gauges (thicknesses), custom rafter cuts, coastal paint stability levels, and nationwide delivery operations.
          </p>
        </div>

        {/* Master FAQ Accordion list */}
        <div className="space-y-4" id="comprehensive-faq-accordion">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-2xs transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5.5 text-left font-display font-bold text-slate-900 hover:bg-slate-50/80 cursor-pointer focus:outline-none focus:ring-1 focus:ring-atlas-yellow select-none"
                >
                  <span className="flex items-center space-x-3.5 pr-4 text-sm sm:text-base">
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
                      <div className="px-5.5 pb-5.5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Section */}
        <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-8 text-center space-y-6 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 left-0 w-64 h-64 bg-atlas-yellow/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl font-display font-bold">Still Have Pending Inquiries?</h3>
            <p className="text-xs text-slate-300 leading-normal">
              If your structural blueprint requirements are complex, or you require exact cost sheets for major corporate hardware partnerships, contact our estimating engineers directly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${ATLAS_CONFIG.whatsappRaw}&text=Hello%20Atlas%20Mabati%2C%20I%20have%20an%20inquiry%20regarding%20roofing%20profiles.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl shadow-xs text-xs text-center"
              >
                <MessageSquare className="w-4.5 h-4.5 mr-2" />
                Inquire on WhatsApp
              </a>
              
              <a
                href={`tel:${ATLAS_CONFIG.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-800 hover:bg-slate-705 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700 text-xs text-center"
              >
                <Phone className="w-4 h-4 mr-2 text-atlas-yellow" />
                Call Hotline: {ATLAS_CONFIG.phone}
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
