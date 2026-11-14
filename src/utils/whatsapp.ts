import { ATLAS_CONFIG } from './config';
import { Product, QuoteItem } from '../types';

export type WhatsAppActionType = 'quote' | 'pricing' | 'ask';

export interface ProductQuoteOptions {
  color?: string;
  gauge?: string;
  length?: string;
  quantity?: number;
}

export const getWhatsAppUrl = (
  productTitle: string,
  actionType: WhatsAppActionType = 'quote',
  options?: ProductQuoteOptions
): string => {
  const phone = ATLAS_CONFIG.whatsappRaw;
  let text = '';

  const specLines = options
    ? [
        options.color ? `• Selected Color: *${options.color}*` : '',
        options.gauge ? `• Selected Gauge: *${options.gauge}*` : '',
        options.length ? `• Sheet Length: *${options.length}*` : '',
        options.quantity ? `• Quantity: *${options.quantity} pcs*` : ''
      ]
        .filter(Boolean)
        .join('\n')
    : '';

  switch (actionType) {
    case 'quote':
      text = `Hello Atlas Mabati,\n\nI would like an official factory quotation for *${productTitle}*.${
        specLines ? `\n\n*Configured Specifications:*\n${specLines}` : ''
      }\n\nPlease assist me with wholesale pricing and delivery timeline.`;
      break;
    case 'pricing':
      text = `Hello Atlas Mabati,\n\nI am inquiring about the wholesale price structure and dynamic packages for *${productTitle}*.${
        specLines ? `\n\n${specLines}` : ''
      }\n\nPlease guide me on the rates for available options.`;
      break;
    case 'ask':
      text = `Hello Atlas Mabati,\n\nI have technical inquiries regarding *${productTitle}*${
        options?.color ? ` (${options.color}, ${options.gauge || 'Standard'})` : ''
      }.\n\nCould you please connect me with a manufacturing or installation advisor?`;
      break;
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

export interface BasketQuoteDetails {
  customerName: string;
  customerPhone?: string;
  deliveryLocation: string;
  projectType?: string;
  additionalAccessories?: string[];
  notes?: string;
}

export const getStructuredBasketWhatsAppUrl = (
  items: QuoteItem[],
  details: BasketQuoteDetails
): string => {
  const phone = ATLAS_CONFIG.whatsappRaw;

  let text = `*ATLAS MABATI - ROOFING QUOTATION BASKET* 🇰🇪\n`;
  text += `----------------------------------------\n`;
  text += `👤 *Customer Name:* ${details.customerName || 'Valued Client'}\n`;
  if (details.customerPhone) {
    text += `📞 *Phone:* ${details.customerPhone}\n`;
  }
  text += `📍 *Site Location:* ${details.deliveryLocation || 'Not Specified'}\n\n`;
  text += `📦 *Requested Products (${items.length} Lines):*\n`;

  items.forEach((item, index) => {
    text += `*${index + 1}. ${item.product.title}*\n`;
    text += `   • Color: ${item.selectedColor.name}\n`;
    text += `   • Gauge: ${item.selectedGauge}\n`;
    text += `   • Length: ${item.length}\n`;
    text += `   • Quantity: ${item.quantity} pcs\n\n`;
  });

  if (details.additionalAccessories && details.additionalAccessories.length > 0) {
    text += `*ADDITIONAL ACCESSORIES REQUESTED*\n`;
    details.additionalAccessories.forEach(acc => {
      text += `• ${acc}\n`;
    });
    text += `\n`;
  }

  if (details.notes) {
    text += `📝 *Additional Notes:* ${details.notes}\n`;
  }

  text += `----------------------------------------\n`;
  text += `*Generated via Atlas Mabati Quote Basket Engine* 💻`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

export const getWishlistWhatsAppUrl = (likedItems: Product[]): string => {
  if (likedItems.length === 0) return '#';
  const phone = ATLAS_CONFIG.whatsappRaw;
  const itemsText = likedItems
    .map((item, i) => `${i + 1}. *${item.title}* (${item.categoryLabel} • ${item.gaugeRange})`)
    .join('\n');
  const fullText = `Hello Atlas Mabati,\n\nI am reviewing your roofing catalog and would like a wholesale estimate on my saved wishlist profiles:\n\n${itemsText}\n\nPlease share pricing, available colors, and delivery options.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
};

export interface CalculatorEstimatePayload {
  customerName: string;
  customerLocation: string;
  calculationMode: 'plinth' | 'directSqFt';
  roofType: string;
  footprintText: string;
  pitchType: string;
  slopedAreaSqM: number;
  profileTitle: string;
  effectiveCoverWidthM: number;
  selectedGauge: string;
  selectedColor: string;
  rollingStrategy: 'custom-cut' | 'standard-3m';
  rafterCutLengthM: number;
  sheetsCount: number;
  wastageSavedKes: number;
  ridgeCapMeters: number;
  valleyMeters: number;
  pvcGutterMeters: number;
  screwsNeeded: number;
  foilRolls: number;
  framingType: 'timber' | 'lgs-steel';
  rafterMeters: number;
  purlinMeters: number;
  wallPlateMeters: number;
  costs: {
    sheetsCost: number;
    timberCost: number;
    underlaymentCost: number;
    ridgeCapCost: number;
    valleyCost: number;
    screwsCost: number;
    gutterCost: number;
    laborCost: number;
    grandTotal: number;
  };
  specialNotes?: string;
}

export const getCalculatorEstimateWhatsAppUrl = (p: CalculatorEstimatePayload): string => {
  const phone = ATLAS_CONFIG.whatsappRaw;
  const cutLabel =
    p.rollingStrategy === 'custom-cut'
      ? `Custom Continuous Cut (${p.rafterCutLengthM}m sheets — Zero Joint Wastage)`
      : `Standard 3.0m Stock Sheets`;

  const msg = `*ATLAS MABATI ROOF ESTIMATE REQUEST* 🇰🇪
----------------------------------------
👤 *Customer Name:* ${p.customerName || 'Valued Builder'}
📍 *Site Location:* ${p.customerLocation || 'Not Specified'}
🏠 *Roof Architecture:* ${p.roofType.toUpperCase()} Roof (${p.pitchType.toUpperCase()} Pitch)
📐 *Building Footprint:* ${p.footprintText}
📐 *Calculated Sloped Area:* ${p.slopedAreaSqM} m²

📋 *Engineered Mabati Specification:*
• *Profile:* ${p.profileTitle} (Cover Width: ${p.effectiveCoverWidthM}m)
• *Gauge & Finish:* ${p.selectedGauge} • ${p.selectedColor}
• *Rolling Strategy:* ${cutLabel}
• *Sheets Required:* ~${p.sheetsCount} Sheets${
    p.wastageSavedKes > 0 ? `\n• *Custom-Cut Savings:* KSh ${p.wastageSavedKes.toLocaleString()} saved on overlaps` : ''
  }

🔩 *Complete Roof System Accessories:*
• *Ridge Caps:* ${p.ridgeCapMeters}m | *Valley Liners:* ${p.valleyMeters}m
• *Fascia PVC Gutters:* ${p.pvcGutterMeters}m
• *Self-Drilling EPDM Screws:* ~${p.screwsNeeded} pcs (${Math.ceil(p.screwsNeeded / 100)} pkts)
• *Thermal Moisture Foil:* ${p.foilRolls} rolls

🪵 *Truss Structure (${p.framingType === 'lgs-steel' ? 'Light Gauge Steel LGS' : 'Treated Timber'}):*
• *Rafters:* ~${p.rafterMeters}m | *Purlins:* ~${p.purlinMeters}m | *Wall Plates:* ~${p.wallPlateMeters}m

💰 *Estimated Wholesale Budget (KSh):*
• *Mabati Sheets:* KSh ${p.costs.sheetsCost.toLocaleString()}
• *Truss Framing:* KSh ${p.costs.timberCost.toLocaleString()}
• *Moisture Barriers:* KSh ${p.costs.underlaymentCost.toLocaleString()}
• *Ridges & Valleys:* KSh ${(p.costs.ridgeCapCost + p.costs.valleyCost).toLocaleString()}
• *Waterproof Screws:* KSh ${p.costs.screwsCost.toLocaleString()}
• *PVC Gutter System:* KSh ${p.costs.gutterCost.toLocaleString()}
• *Installation Labor:* KSh ${p.costs.laborCost.toLocaleString()}
----------------------------------------
🔥 *Estimated Grand Total:* KSh ${p.costs.grandTotal.toLocaleString()}

📝 *Notes:* ${p.specialNotes || 'Please confirm factory lead time and delivery to site.'}
*Sent via Atlas Mabati Estimator Engine v2.5* 💻`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
};

export interface ContactQuotePayload {
  userName: string;
  userPhone: string;
  userLocation: string;
  selectedProfile: string;
  preferredGauge: string;
  preferredColor: string;
  estimatedSheets: string;
  customMessage: string;
}

export const getContactQuoteWhatsAppUrl = (p: ContactQuotePayload): string => {
  const message =
    `Hello Atlas Mabati Sales,\n\nI would like to request an official quotation with the following project parameters:\n\n` +
    `👤 *Client Name:* ${p.userName || 'Not Specified'}\n` +
    `📞 *Contact Phone:* ${p.userPhone || 'Not Specified'}\n` +
    `📍 *Site Location:* ${p.userLocation || 'Within Kenya'}\n\n` +
    `📋 *Roofing Profile:* ${p.selectedProfile}\n` +
    `⚙️ *Metal Thickness:* ${p.preferredGauge}\n` +
    `🎨 *Preferred Color:* ${p.preferredColor}\n` +
    `📏 *Estimated Sheets/Size:* ${p.estimatedSheets || 'Need estimate consultation'}\n` +
    `💬 *Custom Specs:* ${p.customMessage || 'None'}\n\n` +
    `Kindly assist me with pricing, current lead times, and dispatch arrangements.`;

  return `https://wa.me/${ATLAS_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
};

export const getContactQuoteMailtoUrl = (p: ContactQuotePayload): string => {
  const subject = `QUOTATION REQUEST: ${p.selectedProfile} for ${p.userName || 'Client Project'}`;
  const body =
    `Hello Atlas Mabati Sales,\n\nI would like to request an official quotation with the following project parameters:\n\n` +
    `Client Name: ${p.userName || 'Not Specified'}\n` +
    `Contact Phone: ${p.userPhone || 'Not Specified'}\n` +
    `Site Location: ${p.userLocation || 'Within Kenya'}\n\n` +
    `Roofing Profile: ${p.selectedProfile}\n` +
    `Metal Thickness: ${p.preferredGauge}\n` +
    `Preferred Color: ${p.preferredColor}\n` +
    `Estimated Sheets/Size: ${p.estimatedSheets || 'Need estimate consultation'}\n` +
    `Custom Specs: ${p.customMessage || 'None'}\n\n` +
    `Kindly assist me with pricing, current lead times, and dispatch arrangements.`;

  return `mailto:${ATLAS_CONFIG.email1}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const getMailtoUrl = (productTitle?: string): string => {
  const destEmail = ATLAS_CONFIG.email1;
  const subject = productTitle
    ? `Quotation Request: ${productTitle} - Atlas Mabati`
    : 'Roofing Quotation Request - Atlas Mabati';

  const body = productTitle
    ? `Hello Atlas Mabati Sales,\n\nI would like to request a professional quotation for the following product:\n\nProduct: ${productTitle}\n\nKindly provide pricing structures, delivery times, and color selection checklists.\n\nBest regards,\n[My Name]\n[My Location]`
    : `Hello Atlas Mabati Sales,\n\nI am planning a roofing / construction project in Kenya and would like to request a quotation for Atlas Mabati profiles.\n\nKindly provide catalog details, delivery times, and help me consult with a roofing expert.\n\nBest regards,\n[My Name]\n[My Location]\n[Phone Number]`;

  return `mailto:${destEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
