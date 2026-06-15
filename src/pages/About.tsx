import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Warehouse, Landmark, Users, Flame, Hammer } from 'lucide-react';
import { motion } from 'motion/react';
import { AtlasImage } from '../components/AtlasImage';

export const About: React.FC = () => {
  const stats = [
    { label: 'Combined Industrial Experience', value: '15+ Yrs' },
    { label: 'Buildings Covered Nationwide', value: '5,000+' },
    { label: 'Tons of Rolled Steel Annually', value: '25,000+' },
    { label: 'Official Depot Networks', value: '12+' }
  ];

  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-atlas-yellow" />,
      title: 'Gauge Integrity',
      desc: 'No millimeter shortcuts. We roll precisely the material gauge (G30, G28, G26) requested in your bill of quantities.'
    },
    {
      icon: <Warehouse className="w-6 h-6 text-atlas-yellow" />,
      title: 'Manufacturing Excellence',
      desc: 'We continuously upgrade our heavy line roll-formers to output perfect ripple margins, minimizing rafter leaks.'
    },
    {
      icon: <Hammer className="w-6 h-6 text-atlas-yellow" />,
      title: 'Kenyan First Pride',
      desc: 'We source high-grade alu-zinc composites suited specifically for the high salt humdity of Mombasa and heat vectors of Kisumu.'
    },
    {
      icon: <Heart className="w-6 h-6 text-atlas-yellow" />,
      title: 'Client Obsession',
      desc: 'Our customer engineers analyze blueprint designs and provide accurate board sheet counts to save you timber wastage costs.'
    }
  ];

  const factoryHighlights = [
    'Fully automated high-speed cold rolers',
    'Dual-coated high yield premium raw alu-zinc steel scrolls',
    'Real-time automated length shearers supporting sheets up to 9M',
    'Multi-layer texturized polymer bake-ovens to ensure fade stability',
    'Dynamic moisture-lock safety packaging lines'
  ];

  return (
    <div className="w-full relative bg-slate-50 font-sans" id="about-view-container">
      
      {/* Page Header visual banner */}
      <section className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <AtlasImage src="/images/factory/machine-2.jpg" fallbackType="factory-2" alt="Rolling Mill rollers" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60 inline-block">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
            About Atlas Mabati
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Operating under Atlas Rolling Mill to provide structural metal shelter solutions with complete thickness integrity across Kenya.
          </p>
        </div>
      </section>

      {/* Stats Grid Dashboard Panel */}
      <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="py-4 px-2 border-r last:border-0 border-slate-100"
            >
              <span className="block text-3xl sm:text-4xl font-display font-extrabold text-atlas-blue">{stat.value}</span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-500 mt-2 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Corporate Story & Legacy Area */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block">
              Founded on Trust
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              The Journey of Atlas Rolling Mill
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Atlas Rolling Mill was founded in Kenya with a core vision: to eradicate subpar sheet metals in the roof industry. Standard mabati roof panels were frequently thinned below code limits, resulting in cracking joints and rapid rust failure during storm seasons.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We established Atlas Mabati as a flagship digital catalog and roll forming solution. We invest heavily in automated mill systems to form premium alu-zinc steel backing panels. These sheets guarantee high thermal insulation and survive heavy rains under extreme winds, securing properties from Malindi to Lodwar safely.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our products are molded, baked, texturized, and delivered direct-from-mill in custom measurements within 48 hours, establishing ourselves as the contractor’s first-choice supplier.
            </p>
          </div>

          {/* Visual representations on the right */}
          <div className="lg:col-span-6 relative h-[25rem] rounded-2xl overflow-hidden shadow-lg">
            <AtlasImage
              src="/images/factory/machine-1.jpg"
              fallbackType="factory-1"
              alt="Raw steel loading coils"
              overlayBlueprint={true}
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Mission & Vision Twin Pillars */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/60 shadow-md space-y-4"
          >
            <div className="p-3 bg-atlas-yellow/10 rounded-xl inline-block">
              <Target className="w-8 h-8 text-atlas-yellow" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Our Mission</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To manufacture and distribute top-tier steel roofing sheets and structural safety channels that provide lasting structural weatherproofing, visual prestige, and absolute material integrity to Kenyan homeowners, property builders, and developers.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700/60 shadow-md space-y-4"
          >
            <div className="p-3 bg-atlas-yellow/10 rounded-xl inline-block">
              <Eye className="w-8 h-8 text-atlas-yellow" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Our Vision</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To be recognized as East Africa’s most trusted roofing manufacturer, bridging advanced steel metallurgy with fast local dispatch, while fostering future-proof building solutions for generations to come.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Why Customers Trust Us Core Values */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block">
              Built on Integrity
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Why Customers Trust Atlas Mabati
            </h2>
            <p className="text-sm text-slate-500">
              Unlike brokers who source off-grid thinned sheets, we manage your roof processing from coil metal to direct site freight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, idx) => (
              <div key={idx} className="space-y-3.5 p-6 rounded-xl bg-slate-50 hover:bg-slate-100/60 border border-slate-200/40 transition-colors">
                <div className="p-2.5 bg-amber-500/10 rounded-lg inline-block">
                  {item.icon}
                </div>
                <h4 className="font-display font-bold text-slate-900 text-base">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Factory Highlights Segment */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 h-[24rem] rounded-2xl overflow-hidden shadow-lg relative order-last lg:order-first">
            <AtlasImage
              src="/images/factory/machine-3.jpg"
              fallbackType="factory-3"
              alt="High capacity shearers"
              overlayBlueprint={true}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest block">
              Manufacturing Prowess
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Factory Infrastructure Standards
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our steel rolling mill is situated on Mombasa Road, occupying heavy fabrication grounds. Our machinery operates real-time PLC computerized systems that take profile gauges and feed them into specialized roll-former beds.
            </p>
            
            <div className="space-y-3">
              {factoryHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-center space-x-3 text-xs text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-atlas-yellow rounded-full shrink-0"></span>
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Team Support Segment Placeholder (Future expansion ready, as requested) */}
      <section className="py-20 bg-white border-t border-slate-150 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-atlas-blue uppercase tracking-widest">
              Our Team Layout
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Metropolitan Sales & Manufacturing Leaders
            </h2>
            <p className="text-sm text-slate-500">
              A collection of dedicated metallurgical engineers, logistics operators, and customer estimation managers centered on delivering premium Kenyan shelter.
            </p>
          </div>

          {/* Collapsible future-support group cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center" id="future-team-expansion-grid">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-500">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-slate-800 text-sm">Sales & Project Estimates</h4>
              <p className="text-xs text-slate-400 mt-1">Direct support for bill of quantities & roofing specs</p>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-500">
                <Warehouse className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-slate-800 text-sm">Rolling Mill Operations</h4>
              <p className="text-xs text-slate-400 mt-1">Automated coil loaders & color finish oven inspectors</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-500">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-slate-800 text-sm">Site Freight & Transport</h4>
              <p className="text-xs text-slate-400 mt-1">Our dynamic logistics dispatch team shipping nationwide</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
