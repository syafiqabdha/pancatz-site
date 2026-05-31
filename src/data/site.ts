export const site = {
  name: 'Pancatz',
  tagline: 'Design, Print, Photo, IT & AI Solutions in Kelapa Sawit and Kulai',
  description:
    'Pancatz helps local businesses and families with practical creative and technical services: design and printing, studio and event photography, plus computer repair and AI-assisted IT support.',
  area: 'Kelapa Sawit, Kulai, Johor',
  whatsappNumber: '60137572507',
  whatsappMessage:
    'Hi Pancatz, saya berminat dengan servis anda. Boleh saya dapatkan sebut harga?',
  phoneDisplay: '+60 13-757 2507',
  email: 'hello@pancatz.com',
  instagramUrl: 'https://www.instagram.com/pancatz.design',
  address: 'Kelapa Sawit, Kulai, Johor, Malaysia',
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const whatsappIntents = {
  general: 'Hi Pancatz, saya berminat dengan servis anda. Boleh saya dapatkan sebut harga?',
  printing: 'Hi Pancatz, saya nak quote printing. Item: __. Quantity: __. Deadline: __.',
  photography: 'Hi Pancatz, saya nak tanya pakej photography. Date: __. Location: __. Duration: __.',
  repair: 'Hi Pancatz, saya perlukan bantuan computer repair. Device: __. Masalah: __.',
  itAi: 'Hi Pancatz, saya berminat dengan IT/AI support untuk business saya. Masalah utama: __.',
};

export const services = [
  {
    slug: 'design-branding',
    eyebrow: 'DESIGN / 01',
    title: 'Graphic Design & Branding',
    description:
      'Logo touch-ups, flyers, menus, social posts, banners, and marketing visuals tailored to local audiences.',
    bestFor: ['Menus', 'Flyers', 'Social posts', 'Banners'],
    quoteNeeds: ['Size/platform', 'Copy/content', 'Deadline', 'Reference style'],
    bullets: ['Fast concept turnaround', 'Malay + English copy-friendly', 'Ready-to-print export'],
  },
  {
    slug: 'printing',
    eyebrow: 'PRINT / 02',
    title: 'Printing Services',
    description:
      'Business cards, bunting, stickers, labels, invitation cards, and packaging inserts with quality finishing.',
    bestFor: ['Retail promo packs', 'Business cards', 'Product labels'],
    quoteNeeds: ['Item type', 'Material', 'Quantity', 'Needed-by date'],
    bullets: ['Low minimum order', 'Color-accurate output', 'Pickup and local delivery options'],
  },
  {
    slug: 'photography',
    eyebrow: 'PHOTO / 03',
    title: 'Photography',
    description:
      'Event, portrait, and product photography for families, schools, and local businesses who need clean visuals.',
    bestFor: ['Events', 'Family portraits', 'Product photos'],
    quoteNeeds: ['Date', 'Location', 'Duration', 'Output format'],
    bullets: ['Natural color grading', 'Social + web optimized delivery', 'Simple package pricing'],
  },
  {
    slug: 'computer-repair',
    eyebrow: 'REPAIR / 04',
    title: 'Computer Repair & Maintenance',
    description:
      'Troubleshooting, upgrades, virus cleanup, data backup, and routine maintenance for laptops and desktops.',
    bestFor: ['Slow laptops', 'Startup issues', 'Office maintenance'],
    quoteNeeds: ['Device model', 'Main issue', 'Urgency', 'Backup requirement'],
    bullets: ['Diagnosis before repair', 'Clear repair estimates', 'Home-office friendly support'],
  },
  {
    slug: 'it-ai',
    eyebrow: 'AI OPS / 05',
    title: 'IT & AI Support for SMEs',
    description:
      'Practical setup for business email, cloud storage, workflow automation, and simple AI adoption.',
    bestFor: ['Admin automation', 'Team onboarding', 'Digital ops setup'],
    quoteNeeds: ['Current workflow', 'Team size', 'Tools in use', 'Main pain point'],
    bullets: ['Beginner-friendly onboarding', 'Secure setup guidance', 'Focus on measurable efficiency'],
  },
];

export const portfolioItems = [
  {
    title: 'Cafe Menu + Counter Display Set',
    category: 'Design + Print',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    summary: 'Designed and printed a full in-store visual set for a local cafe refresh.',
    deliverables: ['Menu design', 'Counter display', 'Print-ready files'],
    turnaround: '3–5 days',
  },
  {
    title: 'School Sports Day Coverage',
    category: 'Photography',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80',
    summary: 'Delivered event highlights and parent-ready digital albums within 48 hours.',
    deliverables: ['On-site coverage', 'Edited album', 'Social-ready highlights'],
    turnaround: '2 days',
  },
  {
    title: 'SME Workstation Upgrade',
    category: 'Computer Repair',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    summary: 'Improved performance with SSD/RAM upgrade and full preventive maintenance.',
    deliverables: ['Hardware upgrade', 'Cleanup + backup', 'Performance checks'],
    turnaround: '1 day',
  },
  {
    title: 'Product Photo Set for Online Listings',
    category: 'Photography + Design',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=80',
    summary: 'Created clean product shots and branded listing visuals for marketplace growth.',
    deliverables: ['Photo set', 'Edited exports', 'Listing templates'],
    turnaround: '2–4 days',
  },
  {
    title: 'Retail Sticker & Label Batch',
    category: 'Printing',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?auto=format&fit=crop&w=1600&q=80',
    summary: 'Produced durable labels and promo stickers with quick repeat-order workflow.',
    deliverables: ['Material test', 'Final print batch', 'Packaging-ready cut'],
    turnaround: '2 days',
  },
  {
    title: 'Admin Workflow Automation Setup',
    category: 'IT & AI',
    status: 'sample',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    summary: 'Reduced repetitive manual admin tasks with practical automation and templates.',
    deliverables: ['Workflow map', 'Automation setup', 'Team handover notes'],
    turnaround: '1 week',
  },
];

export const faqs = [
  {
    q: 'Do you serve only Kelapa Sawit?',
    a: 'Kelapa Sawit and Kulai are our core service areas, and we also handle selected requests around Johor depending on scope.',
  },
  {
    q: 'How do I get a quotation?',
    a: 'Send us your requirements on WhatsApp. We usually reply quickly with options, timeline, and price estimate.',
  },
  {
    q: 'Can I combine services in one package?',
    a: 'Yes. Many clients combine design + print, or photography + social content setup to simplify delivery and reduce cost.',
  },
];