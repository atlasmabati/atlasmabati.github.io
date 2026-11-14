import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, Landmark, BadgeCheck, ClipboardCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { ATLAS_CONFIG } from '../utils/config';
import { getContactQuoteWhatsAppUrl, getContactQuoteMailtoUrl } from '../utils/whatsapp';

export const Contact: React.FC = () => {
  const { products, logLead } = useData();
  
  // Interactive Regional Maps States
  const [activeBranchId, setActiveBranchId] = useState('ruiru');
  const [branchEmbedUrl, setBranchEmbedUrl] = useState(ATLAS_CONFIG.googleMapsEmbedUrl);

  // Client Estimation State
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [preferredGauge, setPreferredGauge] = useState('G28 (Medium Base Metal)');
  const [preferredColor, setPreferredColor] = useState('Charcoal Black');
  const [estimatedSheets, setEstimatedSheets] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  useEffect(() => {
    if (products.length > 0 && !selectedProfile) {
      setSelectedProfile(products[0].title);
    }
  }, [products, selectedProfile]);

  // Builds dynamic WhatsApp link containing all parameters entered and logs to CRM
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    logLead({
      customerName: userName || 'Inquiry Client',
      customerPhone: userPhone || 'Direct Inquiry',
      location: userLocation || 'Kenya',
      source: 'contact-form',
      profileTitle: selectedProfile || 'General Inquiry',
      gauge: preferredGauge.split(' ')[0] || 'G28',
      colorName: preferredColor,
      estimatedAreaSqM: parseInt(estimatedSheets, 10) ? Math.round(parseInt(estimatedSheets, 10) * 2.8) : 150,
      estimatedValueKes: parseInt(estimatedSheets, 10) ? Math.round(parseInt(estimatedSheets, 10) * 2800) : 220000,
      itemsSummary: `${selectedProfile} (${preferredGauge}, ${preferredColor}) - ${estimatedSheets || 'Custom Estimate'}`,
      notes: customMessage || 'Direct inquiry from Contact Page'
    });

    const url = getContactQuoteWhatsAppUrl({
      userName,
      userPhone,
      userLocation,
      selectedProfile,
      preferredGauge,
      preferredColor,
      estimatedSheets,
      customMessage
    });
    window.open(url, '_blank');
  };

  // Build dynamic Mailto link containing all parameters entered and logs to CRM
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    logLead({
      customerName: userName || 'Inquiry Client',
      customerPhone: userPhone || 'Direct Inquiry',
      location: userLocation || 'Kenya',
      source: 'contact-form',
      profileTitle: selectedProfile || 'General Inquiry',
      gauge: preferredGauge.split(' ')[0] || 'G28',
      colorName: preferredColor,
      estimatedAreaSqM: parseInt(estimatedSheets, 10) ? Math.round(parseInt(estimatedSheets, 10) * 2.8) : 150,
      estimatedValueKes: parseInt(estimatedSheets, 10) ? Math.round(parseInt(estimatedSheets, 10) * 2800) : 220000,
      itemsSummary: `${selectedProfile} (${preferredGauge}, ${preferredColor}) - ${estimatedSheets || 'Custom Estimate'}`,
      notes: customMessage || 'Direct email inquiry from Contact Page'
    });

    const url = getContactQuoteMailtoUrl({
      userName,
      userPhone,
      userLocation,
      selectedProfile,
      preferredGauge,
      preferredColor,
      estimatedSheets,
      customMessage
    });
    window.location.href = url;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 font-sans" id="contact-view-container">
      
      {/* Intro Header banner */}
      <section className="bg-slate-900 text-white py-16 md:py-24 text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60 inline-block">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
            Contact Atlas Mabati
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Ready to receive an expert quotation? Fill out our dynamic estimate generator below or visit our rolling mill coordinates on Ruiru Road, Ruiru.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Estimates Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Col 1: Contacts & Office Information (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-2xs space-y-6">
              <h3 className="font-display font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
                Factory Headquarters
              </h3>

              <div className="space-y-6 text-sm">
                
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-atlas-blue shrink-0">
                    <MapPin className="w-5.5 h-5.5 text-atlas-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Physical Coordinates</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ATLAS_CONFIG.location}</p>
                  </div>
                </div>

                {/* Hotlines */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-atlas-blue shrink-0">
                    <Phone className="w-5.5 h-5.5 text-atlas-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Call & Telephone</h4>
                    <div className="space-y-1 mt-1">
                      <p className="text-xs text-slate-500">
                        <a href={`tel:${ATLAS_CONFIG.phone1Raw}`} className="hover:text-atlas-blue font-semibold text-slate-700">
                          {ATLAS_CONFIG.phone1}
                        </a>
                      </p>
                      <p className="text-xs text-slate-500">
                        <a href={`tel:${ATLAS_CONFIG.phone2Raw}`} className="hover:text-atlas-blue font-semibold text-slate-700">
                          {ATLAS_CONFIG.phone2}
                        </a>
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Direct factory consultation lines</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-atlas-blue shrink-0">
                    <Mail className="w-5.5 h-5.5 text-atlas-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Electronic Mail</h4>
                    <div className="space-y-1 mt-1">
                      <p className="text-xs text-slate-500">
                        <a href={`mailto:${ATLAS_CONFIG.email1}`} className="hover:text-atlas-blue text-slate-700 font-semibold">
                          {ATLAS_CONFIG.email1}
                        </a>
                      </p>
                      <p className="text-xs text-slate-500">
                        <a href={`mailto:${ATLAS_CONFIG.email2}`} className="hover:text-atlas-blue text-slate-700 font-semibold">
                          {ATLAS_CONFIG.email2}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl text-atlas-blue shrink-0">
                    <Clock className="w-5.5 h-5.5 text-atlas-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Working Hours</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ATLAS_CONFIG.workingHours}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro FAQ notice */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <span className="text-[10px] uppercase font-bold text-atlas-yellow tracking-widest block">
                ★ 24/48hr Dispatch Standard
              </span>
              <h4 className="font-display font-semibold text-base">In Need of a Structural Drawing Evaluation?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                You can attach your PDF architectural blueprints or rafter layouts directly into our official sales email, and our manufacturing designers will build a custom BOQ for your review.
              </p>
            </div>
          </div>

          {/* Col 2: Interactive Dynamic Quotation Request Generator Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 shadow-sm space-y-6" id="client-estimate-form">
            <div className="space-y-1">
              <span className="inline-flex items-center space-x-1.5 bg-amber-500/10 text-slate-800 rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                <ClipboardCheck className="w-3.5 h-3.5 text-atlas-yellow" />
                <span>Client-Side Quote Builder</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                Generate Instant Quotation
              </h2>
              <p className="text-xs text-slate-500">
                Specify your project requirements below. The form dynamically parameters your dimensions and allows drafting directly to WhatsApp or Email. No logging signup required.
              </p>
            </div>

            <form className="space-y-5 text-sm">
              
              {/* Name & phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="user-name" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Your Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="user-phone" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    id="user-phone"
                    type="tel"
                    required
                    placeholder="e.g. 0712 345 678"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs"
                  />
                </div>
              </div>

              {/* Site Location in Kenya */}
              <div className="space-y-1.5">
                <label htmlFor="user-location" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Site Delivery Location (in Kenya)
                </label>
                <input
                  id="user-location"
                  type="text"
                  required
                  placeholder="e.g. Syokimau, Eldoret, Naivasha, Runda, Mombasa..."
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs"
                />
              </div>

              {/* Profiles & Gauge Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Profile selection */}
                <div className="space-y-1.5">
                  <label htmlFor="user-profile-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Select Roofing Profile
                  </label>
                  <select
                    id="user-profile-select"
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs cursor-pointer"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </div>

                {/* Gauge selection */}
                <div className="space-y-1.5">
                  <label htmlFor="user-gauge-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Thickness / Gauge
                  </label>
                  <select
                    id="user-gauge-select"
                    value={preferredGauge}
                    onChange={(e) => setPreferredGauge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs cursor-pointer"
                  >
                    <option value="G28 (Medium Base Metal)">G28 (Recommended standard balanced)</option>
                    <option value="G30 (Cost-effective structure)">G30 (Economy / Budget residential)</option>
                  </select>
                </div>

              </div>

              {/* Color & Estimated Sheet Quantities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label htmlFor="user-color-select" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Preferred Color finish
                  </label>
                  <select
                    id="user-color-select"
                    value={preferredColor}
                    onChange={(e) => setPreferredColor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs cursor-pointer"
                  >
                    <option value="Charcoal Black / Slate Gray">Matte Charcoal Black</option>
                    <option value="Classic Tile Red">Glossy Tile Red</option>
                    <option value="Chocolate Brown">Earthy Chocolate Brown</option>
                    <option value="Forest Green">Hunter Forest Green</option>
                    <option value="Royal Blue">Royal Deep Blue</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="user-sheets-qty" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Approx. Count or Length (Optional)
                  </label>
                  <input
                    id="user-sheets-qty"
                    type="text"
                    placeholder="e.g. 45 sheets of 3 meters"
                    value={estimatedSheets}
                    onChange={(e) => setEstimatedSheets(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs"
                  />
                </div>

              </div>

              {/* Special details */}
              <div className="space-y-1.5">
                <label htmlFor="user-custom-specs" className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Additional Site Specifications / Custom Details
                </label>
                <textarea
                  id="user-custom-specs"
                  rows={3}
                  placeholder="Tell us about ridge caps needed, specific angles, or custom transport limits..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-atlas-yellow focus:bg-white transition-all text-xs resize-none"
                />
              </div>

              {/* Action Buttons panel - One-click drafting */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  id="whatsapp-form-submit-btn"
                  onClick={handleWhatsAppSubmit}
                  className="w-full inline-flex items-center justify-center bg-atlas-yellow hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-xs hover:shadow-md transition-all text-xs text-center cursor-pointer select-none"
                >
                  <MessageSquare className="w-4.5 h-4.5 mr-2 shrink-0" />
                  Request via WhatsApp
                </button>

                <button
                  type="button"
                  id="email-form-submit-btn"
                  onClick={handleEmailSubmit}
                  className="w-full inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all text-xs text-center border border-slate-850 cursor-pointer select-none"
                >
                  <Send className="w-4 h-4 mr-2 shrink-0" />
                  Email Estimate Sheet
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* Styled Google Maps Iframe Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16" id="google-maps-iframe-section">
        <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          {/* Map Heading & Branch list (5 Cols) */}
          <div className="p-6 sm:p-8 lg:col-span-4 bg-slate-900 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="inline-flex items-center space-x-1.5 bg-atlas-yellow/10 text-atlas-yellow px-2.5 py-1 rounded-md text-[10px] tracking-wider font-extrabold uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>National Coverage</span>
                </span>
                <h4 className="font-display font-black text-xl text-white mt-1">Our Regional Hubs</h4>
                <p className="text-xs text-slate-400">Select any collection point below to verify physical coordinates and direct contact channels.</p>
              </div>

              {/* Branch Selector Buttons */}
              <div className="space-y-2 pt-2">
                {ATLAS_CONFIG.branches.map((branch) => {
                  const isSelected = activeBranchId === branch.id;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => {
                        setActiveBranchId(branch.id);
                        setBranchEmbedUrl(branch.embedUrl);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all flex flex-col space-y-1 group border cursor-pointer ${
                        isSelected
                          ? 'bg-white text-slate-900 border-white shadow-md'
                          : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-bold text-xs">{branch.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-atlas-blue' : 'text-slate-500 group-hover:text-white'}`} />
                      </div>
                      <span className="text-[10px] font-medium opacity-80 leading-normal truncate">{branch.address}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 text-[11px] text-slate-400">
              <span className="font-semibold text-white">Need local dispatch help?</span> Call any of our regional reps directly for local pick-up queries.
            </div>
          </div>

          {/* Actual responsive Google Maps iframe (centered on active coordinates - 8 Cols) */}
          <div className="lg:col-span-8 relative w-full h-96 lg:h-full min-h-[400px] bg-slate-100">
            <iframe
              title="Atlas Mabati Roll Mill Location"
              src={branchEmbedUrl}
              className="w-full h-full border-0 absolute inset-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
