import type { ContactIntent } from './site';

export type Side = 'design' | 'tech';

export interface Service {
  id: string;
  intent: ContactIntent;
  title: string;
  summary: string;
  items: string[];
}

export interface PriceGroup {
  id: string;
  side: Side | 'both';
  title: string;
  items: { name: string; price: string }[];
  note: string;
}

export interface WorkItem {
  slug: string;
  title: string;
  client: string;
  side: Side;
  tags: string[];
  image: string;
  /** True until a real project replaces this sample. */
  placeholder: boolean;
}

export const sides: Record<Side, { name: string; short: string; href: string; pitch: string; disciplines: string[] }> = {
  design: {
    name: 'Design & Print',
    short: 'Design',
    href: '/design',
    pitch: 'Brands people remember, and the print that puts them in people’s hands.',
    disciplines: ['Brand identity', 'Logo', 'Social kits', 'UI/UX', 'Menus', 'Packaging', 'Signage', 'Large format'],
  },
  tech: {
    name: 'Tech, AI & Photography',
    short: 'Tech',
    href: '/tech',
    pitch: 'Systems that keep running, automation that saves hours, and photos that sell.',
    disciplines: ['IT support', 'Networking', 'Web & hosting', 'SEO', 'Chatbots', 'n8n automation', 'Product photos', 'Events'],
  },
};

export const services: Record<Side, Service[]> = {
  design: [
    {
      id: 'brand',
      intent: 'creative',
      title: 'Brand identity',
      summary: 'Logo, colours, type and the rules that hold it together, so every touchpoint looks like you.',
      items: ['Logo design', 'Visual identity system', 'Brand guidelines', 'Rebrands & refreshes'],
    },
    {
      id: 'digital',
      intent: 'creative',
      title: 'Digital & social',
      summary: 'Content that stops the scroll and stays on-brand week after week.',
      items: ['Social media kits', 'Campaign visuals', 'Web & UI/UX design', 'Digital ads'],
    },
    {
      id: 'print',
      intent: 'print',
      title: 'Print production',
      summary: 'Designed in-house, printed locally, checked before it reaches you.',
      items: ['Business cards & stationery', 'Flyers, brochures & menus', 'Packaging & labels', 'Custom print'],
    },
    {
      id: 'signage',
      intent: 'print',
      title: 'Signage & large format',
      summary: 'Shopfronts, banners and displays that read from across the road.',
      items: ['Shop signage', 'Banners & buntings', 'Event backdrops', 'Window & wall graphics'],
    },
  ],
  tech: [
    {
      id: 'it',
      intent: 'tech',
      title: 'IT support & networks',
      summary: 'Repairs, WiFi that reaches every corner, and someone to call when it breaks.',
      items: ['PC & laptop repair', 'Network & WiFi setup', 'Hardware & software setup', 'Monthly Tech Care'],
    },
    {
      id: 'web',
      intent: 'tech',
      title: 'Web, hosting & SEO',
      summary: 'Fast websites that show up on Google and stay online.',
      items: ['Website & web app builds', 'Hosting & domains', 'SEO setup', 'Maintenance'],
    },
    {
      id: 'ai',
      intent: 'ai',
      title: 'AI',
      summary: 'Bots and workflows that answer customers and move data while you sleep.',
      items: ['Telegram & web chatbots', 'n8n workflow automation', 'Lead routing & CRM', 'AI image pipelines'],
    },
    {
      id: 'photo',
      intent: 'photo',
      title: 'Photography',
      summary: 'Product, food, space and event photos made to sell, not just to look nice.',
      items: ['Product & food photography', 'Interior & property', 'Corporate & headshots', 'Events'],
    },
  ],
};

export const pricing: PriceGroup[] = [
  {
    id: 'brand',
    side: 'design',
    title: 'Brand & design',
    items: [
      { name: 'Logo + basic brand', price: 'RM 890' },
      { name: 'Full visual identity', price: 'RM 1,890' },
      { name: 'Social + print pack', price: 'from RM 1,450' },
    ],
    note: 'Includes 2 rounds of revisions. Source files delivered.',
  },
  {
    id: 'print',
    side: 'design',
    title: 'Print',
    items: [
      { name: 'Business cards (500)', price: 'RM 380' },
      { name: 'A3 posters (100)', price: 'RM 620' },
      { name: 'Full signage set', price: 'Quoted' },
    ],
    note: 'Printed locally. Design can be bundled.',
  },
  {
    id: 'tech',
    side: 'tech',
    title: 'Tech',
    items: [
      { name: 'One-time repair', price: 'RM 180–280' },
      { name: 'Website hosting (yearly)', price: 'from RM 480' },
      { name: 'Web app development', price: 'from RM 2,500' },
      { name: 'Monthly Tech Care', price: 'RM 380–680/mo' },
    ],
    note: 'On-site in the JB area. Remote support included.',
  },
  {
    id: 'ai',
    side: 'tech',
    title: 'AI',
    items: [
      { name: 'Simple chatbot', price: 'RM 1,250' },
      { name: 'Workflow setup', price: 'RM 980' },
      { name: 'Custom image gen flow', price: 'from RM 1,650' },
    ],
    note: 'Built on the tools you already use.',
  },
  {
    id: 'photo',
    side: 'tech',
    title: 'Photography',
    items: [
      { name: 'Product / food shoot', price: 'Quoted' },
      { name: 'Event coverage', price: 'Quoted' },
      { name: 'Corporate & headshots', price: 'Quoted' },
    ],
    note: 'Priced by shot list, location and usage.',
  },
  {
    id: 'retainer',
    side: 'both',
    title: 'Monthly retainers',
    items: [
      { name: 'Starter (8h)', price: 'RM 1,250/mo' },
      { name: 'Growth (20h)', price: 'RM 2,650/mo' },
      { name: 'Full partnership (42h)', price: 'RM 4,200/mo' },
    ],
    note: 'Mix design and tech hours freely. Unused hours roll over. Priority response.',
  },
];

// Sample visuals until real projects are supplied. Replace `image`, set
// `placeholder: false`, and update the copy when a real case study is ready.
export const work: WorkItem[] = [
  { slug: 'cafe', title: 'Café brand & menu system', client: 'Sample project', side: 'design', tags: ['Brand', 'Print'], image: '/images/portfolio-cafe.png', placeholder: true },
  { slug: 'clinic', title: 'Clinic identity & signage', client: 'Sample project', side: 'design', tags: ['Brand', 'Signage'], image: '/images/portfolio-clinic.png', placeholder: true },
  { slug: 'network', title: 'Office network rebuild', client: 'Sample project', side: 'tech', tags: ['IT', 'Network'], image: '/images/portfolio-retail.png', placeholder: true },
  { slug: 'automation', title: 'Lead routing automation', client: 'Sample project', side: 'tech', tags: ['AI', 'Automation'], image: '/images/portfolio-property.png', placeholder: true },
  { slug: 'stationery', title: 'Studio stationery set', client: 'Sample project', side: 'design', tags: ['Print'], image: '/images/portfolio-design.jpg', placeholder: true },
  { slug: 'repair', title: 'Laptop fleet refresh', client: 'Sample project', side: 'tech', tags: ['IT', 'Photography'], image: '/images/portfolio-it.jpg', placeholder: true },
];

export const process = [
  { n: '01', title: 'Reach out', text: 'WhatsApp or the form. Tell us the problem, not the solution. We reply within a few hours.' },
  { n: '02', title: 'Build', text: 'Design, set-up, shoot or automate. You see real progress and give feedback as we go.' },
  { n: '03', title: 'Launch', text: 'Handover, training and support. We stay around after it goes live.' },
];
