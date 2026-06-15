import { ATLAS_CONFIG } from './config';

export type WhatsAppActionType = 'quote' | 'pricing' | 'ask';

export const getWhatsAppUrl = (productTitle: string, actionType: WhatsAppActionType = 'quote'): string => {
  const phone = ATLAS_CONFIG.whatsappRaw;
  let text = '';

  switch (actionType) {
    case 'quote':
      text = `Hello Atlas Mabati,\n\nI would like a quotation for **${productTitle}**.\n\nPlease assist me with pricing and product information.`;
      break;
    case 'pricing':
      text = `Hello Atlas Mabati,\n\nI am inquiring about the price structure and dynamic packages for the custom ${productTitle}.\n\nPlease guide me on the rates for available gauges.`;
      break;
    case 'ask':
      text = `Hello Atlas Mabati,\n\nI have some technical inquiries regarding the ${productTitle}.\n\nCould you please connect me with a manufacturing or installation advisor?`;
      break;
  }

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
};

/**
 * Generates email mailto link for clients preferring email requests
 */
export const getMailtoUrl = (productTitle?: string) => {
  const destEmail = ATLAS_CONFIG.email;
  const subject = productTitle 
    ? `Quotation Request: ${productTitle} - Atlas Mabati`
    : 'Roofing Quotation Request - Atlas Mabati';
  
  const body = productTitle
    ? `Hello Atlas Mabati Sales,\n\nI would like to request a professional quotation for the following product:\n\nProduct: ${productTitle}\n\nKindly provide pricing structures, delivery times, and color selection checklists.\n\nBest regards,\n[My Name]\n[My Location]`
    : `Hello Atlas Mabati Sales,\n\nI am planning a roofing / construction project in Kenya and would like to request a quotation for Atlas Mabati profiles.\n\nKindly provide catalog details, delivery times, and help me consult with a roofing expert.\n\nBest regards,\n[My Name]\n[My Location]\n[Phone Number]`;

  return `mailto:${destEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
