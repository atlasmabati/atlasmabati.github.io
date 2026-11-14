import React, { useState } from 'react';

interface AtlasImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'hero' | 'factory-1' | 'factory-2' | 'factory-3' | 'box-it4' | 'roman-tile' | 'corrugated' | 'curved-tile' | 'stone-coated' | 'ridge-valley' | 'round-ridge' | 'project-1' | 'project-2' | 'project-3' | 'logo' | 'avatar';
  overlayBlueprint?: boolean;
}

// Map high-quality Unsplash construction + steel industry assets to corresponding entries
const FALLBACK_IMAGES: Record<string, string> = {
  hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1600',
  'factory-1': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
  'factory-2': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
  'factory-3': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
  'box-it4': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  'roman-tile': 'https://images.unsplash.com/photo-1628744448839-4467dc041113?auto=format&fit=crop&q=80&w=800',
  corrugated: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800',
  'curved-tile': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
  'stone-coated': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
  'ridge-valley': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
  'round-ridge': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
  'project-1': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
  'project-2': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
  'project-3': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
  logo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=200',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
};

export const AtlasImage: React.FC<AtlasImageProps> = ({
  src,
  alt,
  fallbackType,
  className = '',
  overlayBlueprint = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If local asset fails or is pending, use the corresponding Unsplash mapping
  const resolveSrc = () => {
    if (hasError || !src) {
      return FALLBACK_IMAGES[fallbackType || 'box-it4'] || FALLBACK_IMAGES['box-it4'];
    }
    return src;
  };

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      <img
        src={resolveSrc()}
        alt={alt || "Atlas Mabati Manufacturing Asset"}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        {...props}
      />
      {/* Visual steel structure blueprint aesthetic lines overlay (adds extreme premium feel for Ma Creatives) */}
      {overlayBlueprint && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent pointer-events-none">
          <div className="absolute top-4 left-4 border-t border-l border-amber-400/30 w-8 h-8 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 border-b border-r border-amber-400/30 w-8 h-8 pointer-events-none"></div>
          {/* Subtle architect grids */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      )}
    </div>
  );
};
