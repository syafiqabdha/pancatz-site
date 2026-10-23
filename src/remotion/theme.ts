import { Easing, useVideoConfig } from "remotion";

// Same faces as the website. The site loads them with @fontsource;
// the render project (video/) loads the same files with @remotion/fonts.
export const display = "Mona Sans Variable";
export const body = display;
export const serif = "Instrument Serif";
export const dot = "Doto Variable";
export const mono = "Geist Mono Variable";

/** Mona Sans expanded: the brand voice. */
export const wide = { fontFamily: display, fontStretch: "125%" } as const;
/** Design & Print voice. */
export const serifStyle = { fontFamily: serif, fontStyle: "italic", fontWeight: 400, fontStretch: "normal", letterSpacing: "-0.01em" } as const;
/** Tech voice. */
export const dotStyle = { fontFamily: dot, fontWeight: 800, fontStretch: "normal", letterSpacing: "-0.03em" } as const;

// Same tokens as the website (src/styles/global.css)
export const color = {
  paper: "#f2f0eb",
  ink: "#0d0d0f",
  design: "#ff4f1a",
  tech: "#2b35ff",
};

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Layout helpers so one set of scenes renders both 16:9 and 9:16. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  // 1 unit = 1px at 1920 wide (landscape) or 1080 wide (vertical)
  const u = vertical ? width / 1080 : width / 1920;
  const pad = (vertical ? 80 : 110) * u;
  return { vertical, u, pad, width, height };
};
