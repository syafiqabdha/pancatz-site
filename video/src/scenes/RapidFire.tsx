import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { color, display, easeOut, mono, useLayout } from "../theme";

const words: { t: string; bg: string; fg: string; tag: string }[] = [
  { t: "Brands", bg: color.design, fg: color.ink, tag: "Design" },
  { t: "Print", bg: color.paper, fg: color.design, tag: "Print" },
  { t: "Signage", bg: color.ink, fg: color.design, tag: "Print" },
  { t: "IT support", bg: color.tech, fg: color.paper, tag: "Tech" },
  { t: "Networks", bg: color.paper, fg: color.tech, tag: "Tech" },
  { t: "Websites", bg: color.ink, fg: color.paper, tag: "Tech" },
  { t: "AI bots", bg: color.tech, fg: color.paper, tag: "AI" },
  { t: "Automation", bg: color.paper, fg: color.ink, tag: "AI" },
  { t: "Photos", bg: color.design, fg: color.paper, tag: "Photo" },
];

/** Kinetic word cuts, one discipline every few frames. */
export const RapidFire = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();
  const per = Math.round(0.4 * fps);
  const i = Math.min(words.length - 1, Math.floor(frame / per));
  const local = frame - i * per;
  const w = words[i];

  return (
    <AbsoluteFill style={{ backgroundColor: w.bg, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          fontFamily: display,
          fontWeight: 800,
          fontSize: (vertical ? 200 : 300) * u,
          letterSpacing: "-0.06em",
          lineHeight: 0.9,
          color: w.fg,
          textAlign: "center",
          scale: interpolate(local, [0, per], [1.18, 1], { extrapolateRight: "clamp", easing: easeOut }),
          transform: `skewX(${interpolate(local, [0, 4], [-8, 0], { extrapolateRight: "clamp" })}deg)`,
        }}
      >
        {w.t}
      </div>
      <div style={{ position: "absolute", left: pad, bottom: pad, fontFamily: mono, fontSize: 30 * u, color: w.fg, textTransform: "uppercase" }}>
        [{String(i + 1).padStart(2, "0")}/{String(words.length).padStart(2, "0")}] {w.tag}
      </div>
    </AbsoluteFill>
  );
};
