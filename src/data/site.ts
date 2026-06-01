export const site = {
  name: 'Pancatz',
  tagline: 'Creative Hub + IT Services for modern teams',
  description:
    'Pancatz brings design, print, computer repair, and practical AI support into one clear service desk for people and small businesses that need useful work delivered fast.',
  area: 'Online-first service with appointment-based support',
  whatsappNumber: '60137572507',
  whatsappMessage:
    'Hi Pancatz, saya berminat dengan servis anda. Boleh saya dapatkan sebut harga?',
  phoneDisplay: '+60 13-757 2507',
  email: 'hello@pancatz.com',
  instagramUrl: 'https://www.instagram.com/pancatz.design',
  facebookUrl: 'https://www.facebook.com/pancatz',
  address: 'Online-first / appointment-based',
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const whatsappIntents = {
  general: 'Hi Pancatz, saya berminat dengan servis Creative Hub / IT Services. Boleh saya dapatkan sebut harga?',
  creativeHub: 'Hi Pancatz, saya nak quote Creative Hub. Item: __. Quantity/platform: __. Deadline: __.',
  printing: 'Hi Pancatz, saya nak quote printing. Item: __. Quantity: __. Deadline: __.',
  repair: 'Hi Pancatz, saya perlukan bantuan computer repair. Device: __. Masalah: __.',
  itAi: 'Hi Pancatz, saya berminat dengan IT/AI support untuk business saya. Masalah utama: __.',
};

export const services = [
  {
    slug: 'creative-hub-design',
    group: 'Creative Hub',
    eyebrow: 'CREATIVE HUB / 01',
    title: 'Design & Brand Assets',
    description:
      'Logos, social media posts, flyers, menus, banners, and campaign visuals shaped into a consistent look for your brand.',
    bestFor: ['Logo refreshes', 'Social posts', 'Flyers and menus', 'Campaign banners'],
    quoteNeeds: ['Size or platform', 'Copy/content', 'Deadline', 'Reference style'],
    bullets: ['Fast concept direction', 'Malay + English copy-friendly', 'Ready-to-print and web-ready exports'],
  },
  {
    slug: 'creative-hub-print',
    group: 'Creative Hub',
    eyebrow: 'CREATIVE HUB / 02',
    title: 'Print Production',
    description:
      'Business cards, stickers, labels, bunting, cards, and packaging inserts prepared with practical material and finishing advice.',
    bestFor: ['Retail promo packs', 'Business cards', 'Product labels', 'Event materials'],
    quoteNeeds: ['Item type', 'Material preference', 'Quantity', 'Needed-by date'],
    bullets: ['Print-ready checks', 'Batch and repeat-order workflow', 'Clear quantity and finishing options'],
  },
  {
    slug: 'it-services-repair',
    group: 'IT Services',
    eyebrow: 'IT SERVICES / 03',
    title: 'Computer Repair & Maintenance',
    description:
      'Troubleshooting, upgrades, virus cleanup, data backup, software setup, and routine maintenance for laptops and desktops.',
    bestFor: ['Slow laptops', 'Startup issues', 'Office workstations', 'Backup and cleanup'],
    quoteNeeds: ['Device model', 'Main issue', 'Urgency', 'Backup requirement'],
    bullets: ['Diagnosis before repair', 'Clear repair estimates', 'Home-office friendly support'],
  },
  {
    slug: 'it-services-ai',
    group: 'IT Services',
    eyebrow: 'IT SERVICES / 04',
    title: 'AI & Digital Workflow Support',
    description:
      'Beginner-friendly setup for business email, cloud storage, workflow automation, AI tools, and simple operating templates.',
    bestFor: ['Admin automation', 'Team onboarding', 'Digital ops setup', 'AI starter workflows'],
    quoteNeeds: ['Current workflow', 'Team size', 'Tools in use', 'Main pain point'],
    bullets: ['Plain-language onboarding', 'Secure setup guidance', 'Focus on measurable efficiency'],
  },
];

export const portfolioItems = [
  {
    title: 'Starter Brand Kit for New Business',
    category: 'Creative Hub',
    status: 'sample',
    image: '/portfolio-brand-kit.svg',
    summary: 'Built a compact identity system with logo refinement, colour direction, typography, and launch-ready social templates.',
    deliverables: ['Logo refinement', 'Brand mini-guide', 'Social launch templates'],
    turnaround: '3–5 days',
  },
  {
    title: 'Menu, Flyer & Counter Display Set',
    category: 'Creative Hub',
    status: 'sample',
    image: '/portfolio-print-set.svg',
    summary: 'Prepared a coordinated print pack so promotions, in-store signage, and take-away materials feel consistent.',
    deliverables: ['Menu layout', 'Flyer artwork', 'Print-ready files'],
    turnaround: '3–5 days',
  },
  {
    title: 'Retail Sticker & Label Batch',
    category: 'Creative Hub',
    status: 'sample',
    image: '/portfolio-labels.svg',
    summary: 'Designed and prepared label artwork with practical sizing, material notes, and a repeat-order production flow.',
    deliverables: ['Label design', 'Material test notes', 'Final print batch'],
    turnaround: '2 days',
  },
  {
    title: 'Laptop Recovery & Speed Upgrade',
    category: 'IT Services',
    status: 'sample',
    image: '/portfolio-repair.svg',
    summary: 'Diagnosed a slow workstation, protected key files, upgraded performance, and returned a cleaner daily-use setup.',
    deliverables: ['Device diagnosis', 'Backup check', 'SSD/RAM upgrade plan'],
    turnaround: '1 day',
  },
  {
    title: 'Small Office Device Maintenance',
    category: 'IT Services',
    status: 'sample',
    image: '/portfolio-maintenance.svg',
    summary: 'Created a simple maintenance routine for multiple workstations covering updates, storage cleanup, and basic security.',
    deliverables: ['Health checklist', 'Cleanup session', 'Maintenance guide'],
    turnaround: '1–2 days',
  },
  {
    title: 'Admin Workflow Automation Setup',
    category: 'IT Services',
    status: 'sample',
    image: '/portfolio-ai-workflow.svg',
    summary: 'Mapped repetitive admin tasks into templates and lightweight AI-assisted workflows that reduce manual follow-up.',
    deliverables: ['Workflow map', 'Automation setup', 'Team handover notes'],
    turnaround: '1 week',
  },
];

export const faqs = [
  {
    q: 'What does Pancatz focus on now?',
    a: 'Pancatz now focuses on two service lanes: Creative Hub for design and print, and IT Services for repair, maintenance, AI, and digital workflow support.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Send your requirements on WhatsApp. Include the service lane, scope, quantity or device details, deadline, and any reference files so we can reply with clear options.',
  },
  {
    q: 'Can I combine creative and IT services?',
    a: 'Yes. We can combine design, print, repair, and AI workflow setup when one project needs both brand materials and technical support.',
  },
];
