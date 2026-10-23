import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, display, easeOut, mono, useLayout } from "../theme";
import { GridLines } from "./Intro";

type Props = { readonly whatsapp: string; readonly url: string };

// Closing card: big CTA, contact line, logo.
export const Outro = ({ whatsapp, url }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();
  const reveal = (d: number) => ({
    translate: interpolate(frame, [d, d + 0.7 * fps], ["0px 110%", "0px 0%"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: color.ink, padding: pad, justifyContent: "space-between", color: color.paper }}>
      <GridLines tint="rgba(242,240,235,0.08)" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: mono, fontSize: 28 * u, textTransform: "uppercase" }}>
        <span>
          <span style={{ color: color.design }}>●</span> Taking new projects
        </span>
        <Img src={staticFile("logo.webp")} style={{ width: 110 * u, height: 110 * u, borderRadius: "50%", border: `${3 * u}px solid ${color.paper}` }} />
      </div>
      <div>
        <div style={{ overflow: "hidden", paddingBottom: 20 * u }}>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: (vertical ? 230 : 330) * u, letterSpacing: "-0.065em", lineHeight: 0.82, ...reveal(0.1 * fps) }}>
            {vertical ? (
              <>
                Let’s
                <br />
                talk<span style={{ color: color.design }}>.</span>
              </>
            ) : (
              <>
                Let’s talk<span style={{ color: color.design }}>.</span>
              </>
            )}
          </div>
        </div>
        <div style={{ overflow: "hidden", marginTop: 40 * u }}>
          <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", gap: (vertical ? 16 : 60) * u, fontFamily: display, fontWeight: 700, fontSize: 64 * u, letterSpacing: "-0.03em", ...reveal(0.5 * fps) }}>
            <span>{url}</span>
            <span style={{ color: "#25d366" }}>WhatsApp {whatsapp}</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
