import { loadFont } from "@remotion/fonts";
import { Easing, staticFile, useVideoConfig } from "remotion";

// Fonts are vendored in public/fonts so renders work offline and behind proxies.
export const display = "Bricolage Grotesque";
export const body = "Inter";
export const mono = "JetBrains Mono";

loadFont({ family: display, url: staticFile("fonts/Bricolage-700.woff2"), weight: "700" });
loadFont({ family: display, url: staticFile("fonts/Bricolage-800.woff2"), weight: "800" });
loadFont({ family: body, url: staticFile("fonts/Inter-400.woff2"), weight: "400" });
loadFont({ family: body, url: staticFile("fonts/Inter-600.woff2"), weight: "600" });
loadFont({ family: mono, url: staticFile("fonts/JetBrainsMono-500.woff2"), weight: "500" });

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
