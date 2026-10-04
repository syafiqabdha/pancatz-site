export interface PriceTier {
  id: string;
  /** Label on the category tab. */
  tab: string;
  title: string;
  items: { name: string; price: string }[];
  note: string;
}

/** Indicative MYR pricing. The first tier is selected by default. */
export const pricing: PriceTier[] = [
  {
    id: 'creative',
    tab: 'Creative',
    title: 'Creative',
    items: [
      { name: 'Logo + basic brand', price: 'RM 890' },
      { name: 'Full visual identity', price: 'RM 1,890' },
      { name: 'Social + print pack', price: 'from RM 1,450' },
    ],
    note: 'Includes 2 rounds of revisions. Source files delivered.',
  },
  {
    id: 'print',
    tab: 'Print',
    title: 'Print Production',
    items: [
      { name: 'Business cards (500)', price: 'RM 380' },
      { name: 'A3 posters (100)', price: 'RM 620' },
      { name: 'Full signage set', price: 'quoted' },
    ],
    note: 'High-quality local printing.',
  },
  {
    id: 'tech',
    tab: 'Tech',
    title: 'Tech',
    items: [
      { name: 'One-time repair', price: 'RM 180–280' },
      { name: 'Website hosting (yearly)', price: 'from RM 480' },
      { name: 'Web app development', price: 'from RM 2,500' },
      { name: 'Monthly Tech Care', price: 'RM 380–680/mo' },
    ],
    note: 'On-site in JB area. Remote support included. Hosting & web dev quoted per project.',
  },
  {
    id: 'ai',
    tab: 'AI',
    title: 'AI',
    items: [
      { name: 'Simple chatbot', price: 'RM 1,250' },
      { name: 'Workflow setup', price: 'RM 980' },
      { name: 'Custom image gen flow', price: 'from RM 1,650' },
    ],
    note: 'Built with tools you already use.',
  },
  {
    id: 'retainer',
    tab: 'Retainers',
    title: 'Monthly Retainers',
    items: [
      { name: 'Starter (8h)', price: 'RM 1,250/mo' },
      { name: 'Growth (20h)', price: 'RM 2,650/mo' },
      { name: 'Full partnership', price: 'RM 4,200/mo' },
    ],
    note: 'Best value. Roll over unused hours. Priority response.',
  },
];
