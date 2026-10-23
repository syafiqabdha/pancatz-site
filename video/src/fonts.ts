import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { display, dot, mono, serif } from "../../src/remotion/theme";

// The website gets these faces from @fontsource. Renders load the same files
// from public/fonts so they work offline and behind proxies.
loadFont({ family: display, url: staticFile("fonts/MonaSans.woff2"), weight: "200 900", stretch: "75% 125%" });
loadFont({ family: serif, url: staticFile("fonts/InstrumentSerif-Italic.woff2"), weight: "400", style: "italic" });
loadFont({ family: dot, url: staticFile("fonts/Doto.woff2"), weight: "100 900" });
loadFont({ family: mono, url: staticFile("fonts/GeistMono.woff2"), weight: "100 900" });
