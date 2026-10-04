export type Tone = 'primary' | 'accent';

/** Bento slot used by both the Capabilities and Services grids. */
export type BentoSize = 'wide' | 'tall' | 'sq' | 'sm';

export interface Capability {
  label: string;
  tone: Tone;
  size: BentoSize;
  title: string;
  body: string;
  /** Short tag line shown under a rule. Omitted on the small card. */
  meta?: string;
}

export interface Service {
  label: string;
  tone: Tone;
  size: BentoSize;
  featured?: boolean;
  meta: string;
  /** Two-line headline; each entry is one line. */
  headline: [string, string];
  items: string[];
  cta: string;
  intent: string;
}

export const capabilities: Capability[] = [
  {
    label: 'CREATIVE',
    tone: 'primary',
    size: 'wide',
    title: 'Brand, Design & UI/UX',
    body: 'Logos, visual identities, web design, social kits, digital assets. Everything that makes your business look sharp on screen.',
    meta: 'Logo · UI/UX · Social · Brand',
  },
  {
    label: 'PRINT',
    tone: 'primary',
    size: 'tall',
    title: 'Production',
    body: 'Business cards, flyers, banners, signage, packaging, menus. High-quality local printing that delivers.',
    meta: 'Cards · Flyers · Banners · Signage',
  },
  {
    label: 'TECH',
    tone: 'primary',
    size: 'sq',
    title: 'Systems & Support',
    body: 'PC and laptop repair, network setup, WiFi, hosting, web apps, SEO, monthly retainers. Your tech, always operational.',
    meta: 'Hardware · Hosting · Web Dev · SEO',
  },
  {
    label: 'AI',
    tone: 'accent',
    size: 'sm',
    title: 'Workflows & Automation',
    body: 'Chatbots, n8n workflows, AI image generation, lead routing. Automate the repetitive so you focus on growth.',
  },
];

export const services: Service[] = [
  {
    label: 'CREATIVE',
    tone: 'primary',
    size: 'wide',
    meta: 'Brand + Design + UI/UX',
    headline: ['Design that works.', 'Brands that last.'],
    items: ['Logo & brand identity systems', 'Web design & UI/UX', 'Social kits, digital assets', 'SEO strategy'],
    cta: 'Discuss creative work',
    intent: 'creative',
  },
  {
    label: 'PRINT',
    tone: 'primary',
    size: 'tall',
    meta: 'Production',
    headline: ['Print that delivers.', 'Quality you can hold.'],
    items: [
      'Business cards & corporate stationery',
      'Flyers, brochures & menus',
      'Banners, signage & large format',
      'Packaging & custom print',
    ],
    cta: 'Discuss print work',
    intent: 'print',
  },
  {
    label: 'TECH',
    tone: 'primary',
    size: 'sq',
    meta: 'Support + Systems + Web',
    headline: ['Systems that work.', 'Support that shows up.'],
    items: [
      'PC, laptop & hardware repair',
      'Network, WiFi & infrastructure',
      'Web app development & hosting',
      'SEO implementation & Monthly Tech Care',
      'On-site in JB, remote included',
    ],
    cta: 'Discuss tech work',
    intent: 'tech',
  },
  {
    label: 'AI',
    tone: 'accent',
    size: 'sq',
    featured: true,
    meta: 'Bots + Flows',
    headline: ['Bots that work.', 'Flows that scale.'],
    items: ['Telegram & web chatbots', 'n8n workflow automation', 'AI image gen pipelines', 'Lead routing & CRM integration'],
    cta: 'Discuss AI work',
    intent: 'ai',
  },
];

export const processSteps = [
  { title: 'Reach out', body: 'Fill in the form above. We respond fast and ask the right questions to understand scope.' },
  { title: 'Build', body: 'We design, develop, and iterate. You see progress, not promises. Revisions included.' },
  { title: 'Launch', body: 'Delivery, handover, and ongoing support. We stay until everything runs smooth.' },
];

export const marqueeWords = ['Selected Work', 'Creative', 'Print', 'Tech', 'AI', 'Full Partnership'];
