import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { color, dotStyle, easeInOut, easeOut, mono, serifStyle, useLayout, wide } from "../../theme";

const designChips = ["Brand identity", "Logo", "Social kits", "Menus", "Packaging", "Signage"];
const techChips = ["IT support", "Networks", "Websites", "SEO", "Chatbots", "Automation", "Photography"];

// Two sides of the studio. The divider sweeps across, then settles at 50%.
export const Split = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();
  const split = interpolate(frame, [0, 0.9 * fps, 1.6 * fps, 2.3 * fps], [100, 30, 62, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
  const title = (vertical ? 150 : 180) * u;

  const chip = (t: string, i: number, base: number) => (
    <span
      key={t}
      style={{
        fontFamily: mono,
        fontSize: 26 * u,
        textTransform: "uppercase",
        border: `${2 * u}px solid currentColor`,
        padding: `${8 * u}px ${14 * u}px`,
        opacity: interpolate(frame, [base + i * 3, base + i * 3 + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        translate: interpolate(frame, [base + i * 3, base + i * 3 + 12], ["0px 20px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
      }}
    >
      {t}
    </span>
  );

  // In vertical the split runs top/bottom instead of left/right.
  const clip = vertical ? `inset(0 0 ${100 - split}% 0)` : `inset(0 ${100 - split}% 0 0)`;

  return (
    <AbsoluteFill style={{ backgroundColor: color.tech }}>
      <AbsoluteFill style={{ padding: pad, color: color.paper, justifyContent: "flex-end", alignItems: "flex-end", textAlign: "right" }}>
        <div style={{ fontFamily: mono, fontSize: 28 * u, textTransform: "uppercase", marginBottom: 24 * u }}>[B] Tech, AI & Photography</div>
        <div style={{ ...wide, fontWeight: 800, fontSize: title, lineHeight: 0.85, letterSpacing: "-0.034em", marginBottom: 40 * u }}>
          Tech, AI
          <br />& <span style={dotStyle}>Photo</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 * u, justifyContent: "flex-end", maxWidth: (vertical ? 900 : 820) * u }}>
          {techChips.map((t, i) => chip(t, i, 1.2 * fps))}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: color.design, clipPath: clip, padding: pad, color: color.ink }}>
        <div style={{ fontFamily: mono, fontSize: 28 * u, textTransform: "uppercase", marginBottom: 24 * u }}>[A] Design & Print</div>
        <div style={{ ...wide, fontWeight: 800, fontSize: title, lineHeight: 0.85, letterSpacing: "-0.034em", marginBottom: 40 * u }}>
          Design
          <br />& <span style={serifStyle}>Print</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 * u, maxWidth: (vertical ? 900 : 760) * u }}>
          {designChips.map((t, i) => chip(t, i, 0.9 * fps))}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          backgroundColor: color.ink,
          ...(vertical
            ? { left: 0, right: 0, top: `${split}%`, height: 3 * u }
            : { top: 0, bottom: 0, left: `${split}%`, width: 3 * u }),
        }}
      />
    </AbsoluteFill>
  );
};
