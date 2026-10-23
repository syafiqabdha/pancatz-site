export const site = {
  name: 'Pancatz',
  url: 'https://pancatz.com',
  tagline: 'Design, print, tech, AI and photography from one Johor studio',
  description:
    'Pancatz is a Kulai, Johor studio for design, print, IT support, AI automation and photography. One team that makes your business look sharper and run smarter. Serving Malaysia and Singapore.',
  location: 'Kulai, Johor',
  serviceArea: 'Johor, Malaysia & Singapore',
  email: 'pancatz.design@gmail.com',
  // International format, digits only — used for wa.me links
  whatsapp: '60137572507',
  whatsappDisplay: '+60 13-757 2507',
  instagramUrl: 'https://www.instagram.com/pancatz.design',
  facebookUrl: 'https://www.facebook.com/pancatz',
  // Contact form webhook — n8n receives and routes to Telegram
  contactWebhook: 'https://n8n.pancatz.com/webhook/pancatz-contact',
};

// Keys are sent to the n8n webhook as `service`; keep existing keys stable.
export const contactIntents = {
  general: 'Not sure yet / a bit of everything',
  creative: 'Design: brand, logo, social, UI/UX',
  print: 'Print: cards, flyers, banners, signage',
  tech: 'Tech: IT support, network, web & hosting',
  ai: 'AI: chatbots, automation, workflows',
  photo: 'Photography: product, food, event, corporate',
} as const;

export type ContactIntent = keyof typeof contactIntents;

export function whatsappLink(message = 'Hi Pancatz, I would like to ask about a project.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: '/design', label: 'Design & Print' },
  { href: '/tech', label: 'Tech & AI' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
];
