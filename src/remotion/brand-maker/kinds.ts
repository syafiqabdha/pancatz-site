/**
 * Shop types for the brand maker. Each sets the palette, tagline and the
 * small icon in the badge. Icons are drawn around (0,0) in a ~24px box.
 */
export const KINDS = {
  cafe: {
    label: "Café",
    paper: "#f3e9dc",
    primary: "#6b3a22",
    second: "#ff7a2f",
    tagline: "Good coffee, every day.",
    icon: "M-9 -4 h14 v7 a7 7 0 0 1 -14 0 z M5 -2 h3 a3 3 0 0 1 0 6 h-3 M-5 -11 v3 M-1 -11 v3",
  },
  bakery: {
    label: "Bakery",
    paper: "#fbefdc",
    primary: "#b8522a",
    second: "#ffc23d",
    tagline: "Baked before sunrise.",
    icon: "M-11 3 q11 -16 22 0 q-11 6 -22 0 z M-5 -1 l2 3 M0 -3 v4 M5 -1 l-2 3",
  },
  salon: {
    label: "Salon",
    paper: "#f7e9ef",
    primary: "#a3164f",
    second: "#ff8fc0",
    tagline: "Walk in. Glow out.",
    icon: "M-4 -5 L9 9 M-4 5 L9 -9 M-11 -8 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M-11 8 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0",
  },
  clinic: {
    label: "Clinic",
    paper: "#e8f3f0",
    primary: "#0f6f62",
    second: "#5ff0c8",
    tagline: "Care, close to home.",
    icon: "M-3 -10 h6 v7 h7 v6 h-7 v7 h-6 v-7 h-7 v-6 h7 z",
  },
  workshop: {
    label: "Workshop",
    paper: "#eceef0",
    primary: "#e05a00",
    second: "#ffb000",
    tagline: "Fixed right, first time.",
    icon: "M5 -10 a6 6 0 0 0 -5 9 l-9 9 a2 2 0 0 0 3 3 l9 -9 a6 6 0 0 0 9 -5 l-4 2 l-3 -3 z",
  },
  tech: {
    label: "Tech",
    paper: "#eceefe",
    primary: "#2b35ff",
    second: "#6cf5ff",
    tagline: "Smart systems, zero fuss.",
    icon: "M-7 -7 h14 v14 h-14 z M-3 -3 h6 v6 h-6 z M-4 -11 v4 M0 -11 v4 M4 -11 v4 M-4 7 v4 M0 7 v4 M4 7 v4",
  },
  retail: {
    label: "Shop",
    paper: "#f1efe3",
    primary: "#2f6b3a",
    second: "#c6ff4d",
    tagline: "Everything you need, nearby.",
    icon: "M-9 -4 h18 l-2 14 h-14 z M-4 -4 v-3 a4 4 0 0 1 8 0 v3",
  },
} as const;

export type KindId = keyof typeof KINDS;
export const KIND_IDS = Object.keys(KINDS) as KindId[];
export const isKind = (v: string | null | undefined): v is KindId => !!v && v in KINDS;
