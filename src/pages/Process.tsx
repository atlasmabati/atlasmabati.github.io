import React from 'react';
import { Layers, Settings, ShieldCheck, Box, Truck, Check, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { AtlasImage } from '../components/AtlasImage';

export const Process: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: <Layers className="w-6 h-6 text-white" />,
      title: 'Raw Material Sourcing & Loading',
      desc: 'We feed dual-coated alu-zinc steel scrolls into our heavy-duty hydraulic decoilers. Each coil possesses protective aluminum shields (providing superior scratch boundaries) blended with natural zinc alloy substrates to halt structural atmospheric oxidation (rusting).',
      highlights: [
        'High-density alu-zinc metal substrates matching ASTM standard specs',
        'Anti-scratch micro-polymer color bake layers',
        'Exceptional solar thermal light reflection vectors'
      ],
      fallbackType: 'factory-2' as const,
      imagePath: '/images/factory/machine-2.jpg'
    },
    {
      step: '02',
      icon: <Settings className="w-6 h-6 text-white" />,
      title: 'Precision Cold-Roll Forming',
      desc: 'The linear steel scrolls proceed through a computerized array of high-hardened rolling dies. Each roll is machine-curved to progressively shape trapezoidal box folds (IT4), Spanish tile crests, or traditional wave crests without fracturing the base alloy structure or peeling paint film.',
      highlights: [
        'Computerized automated thickness alignment sensors',
        'Gradual progressive rolling passes prevent metal strain',
        'Exact wave crest height and valley pitch alignments'
      ],
      fallbackType: 'factory-1' as const,
      imagePath: '/images/factory/machine-1.jpg'
    },
    {
      step: '03',
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: 'Ultrasonic Quality Testing & Shearing',
      desc: 'An automated guillotine cuts the scrolling sheets to the client’s custom rafter lengths. Standard sheets can range up to 9.0 meters. Concurrently, quality managers inspect structural panels using calibrated digital micrometers to confirm uniform metal thickness.',
      highlights: [
        'Millimeter precise PLC computerized blade triggers',
        'Uniform thickness gauges inspected randomly per batch',
        'Zero material wastage — custom cut to matching carpentry sizes'
      ],
      fallbackType: 'factory-3' as const,
      imagePath: '/images/factory/machine-3.jpg'
    },
    {
      step: '04',
      icon: <Box className="w-6 h-6 text-white" />,
      title: 'Safety Interlock Packaging',
      desc: 'Sheets are neatly nested and stacked on sturdy wooden pallets. Every pallet receives protective cardboard guards and high-density waterproof wrapping to block moisture during intermediate storage, avoiding dampness and keeping finished paint glossy.',
      highlights: [
        'Secure structural wooden pallet supports prevent sheet flexing',
        'Multi-wrap dense plastic packaging blocks transit humidity',
        'Organized custom sheet stacks labeled cleanly with client names'
      ],
      fallbackType: 'stone-coated' as const,
      imagePath: '/images/products/stone-coated.jpg'
    },
    {
      step: '05',
      icon: <Truck className="w-6 h-6 text-white" />,
      title: 'Nationwide Delivery Dispatch',
      desc: 'Our fleet coordinates deliveries within 24 to 48 hours directly to your building site, hardware franchise, or construction lot. Our custom material hoisting systems offload the sheets carefully to ensure zero corner bent folds.',
      highlights: [
        'Coordinated transit tracking from Mombasa Road dispatch center',
        'Hoisting-grade secure vehicle offload assistance',
        'Fast 48-hour delivery covers all 47 counties in Kenya'
      ],
      fallbackType: 'project-2' as const,
      imagePath: '/images/gallery/project-2.jpg'
    }
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans pb-20" id="process-view-container">
      
      {/* Visual intro headline */}
      <section className="bg-slate-900 text-white py-16 md:py-24 text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <AtlasImage src="/images/factory/machine-1.jpg" fallbackType="factory-1" alt="Heavy steel lines" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <span className="text-xs font-bold text-atlas-yellow uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700/60 inline-block">
            Engineering Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
            Our Manufacturing Process
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Delivering trust through total visual transparency. Examine our five-stage automated cold-rolling mill sequence, custom engineered for Kenya.
          </p>
        </div>
      </section>

      {/* Main interactive visual timeline container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        
        {/* Central Vertical Connector Line for Desktop */}
        <div className="absolute left-[50%] -translate-x-1/2 top-24 bottom-24 w-1 bg-slate-200 hidden lg:block" />

        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={step.step}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative ${isEven ? '' : 'lg:flex-row-reverse'}`}
                id={`process-step-${step.step}`}
              >
                
                {/* Visual Step Number overlay marker on the central timeline line */}
                <div className="absolute left-[50%] -translate-x-1/2 top-4 w-11 h-11 bg-atlas-blue text-white rounded-full border-4 border-white shadow-md flex items-center justify-center font-display font-bold text-sm z-20 hidden lg:flex">
                  <span>{step.step}</span>
                </div>

                {/* Left Side (Depends on even index): Content or Image */}
                <div className={`col-span-1 lg:col-span-5 space-y-4 ${isEven ? 'lg:text-right' : 'lg:order-last'}`}>
                  
                  {/* Step label for mobile */}
                  <span className="inline-flex lg:hidden items-center justify-center bg-atlas-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    Step {step.step}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>

                  <ul className={`space-y-2.5 pt-2 text-xs font-semibold text-slate-500 flex flex-col ${isEven ? 'lg:items-end' : ''}`}>
                    {step.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        {isEven && <span className="text-slate-600 text-[11px] font-medium hidden lg:inline">{hl}</span>}
                        <Check className="w-4 h-4 text-emerald-500 bg-emerald-50 rounded-full p-0.5" />
                        {(!isEven || window.innerWidth < 1024) && <span className="text-slate-600 text-[11px] font-medium lg:hidden inline">{hl}</span>}
                        {!isEven && <span className="text-slate-600 text-[11px] font-medium hidden lg:inline">{hl}</span>}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blank center gutter spacing for central timeline markers */}
                <div className="col-span-1 lg:col-span-2 hidden lg:block pointer-events-none" />

                {/* Right Side (Depends on even index): Image or Content */}
                <div className="col-span-1 lg:col-span-5 h-[20rem] rounded-2xl overflow-hidden shadow-md relative">
                  <AtlasImage
                    src={step.imagePath}
                    fallbackType={step.fallbackType}
                    alt={step.title}
                    overlayBlueprint={true}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Step graphic watermark */}
                  <div className="absolute top-4 right-4 bg-white/9 text-slate-900 border border-slate-20/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-sm shadow-xs uppercase">
                    Atlas Stage {step.step}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Visual Manufacturing Standard Seals Area */}
      <section className="bg-white border-y border-slate-200/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
          <div className="space-y-1.5 p-4">
            <span className="block text-2xl font-display font-extrabold text-atlas-blue uppercase">G30 to G26</span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Gauge Verification standard</span>
          </div>
          <div className="space-y-1.5 p-4 border-l border-slate-100">
            <span className="block text-2xl font-display font-extrabold text-atlas-blue uppercase">ASTM A792</span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Alu-Zinc Grade Alloy Shielding</span>
          </div>
          <div className="space-y-1.5 p-4 border-l border-slate-100">
            <span className="block text-2xl font-display font-extrabold text-atlas-blue uppercase">±0.02 mm</span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Precision Guillotine Tolerance</span>
          </div>
          <div className="space-y-1.5 p-4 border-l border-slate-100">
            <span className="block text-2xl font-display font-extrabold text-atlas-blue uppercase">48 Hours</span>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Maximum Processing Turnaround</span>
          </div>
        </div>
      </section>

    </div>
  );
};
