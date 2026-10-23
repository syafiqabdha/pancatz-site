import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { color, dotStyle, easeInOut, easeOut, mono, serifStyle, useLayout, wide } from "../../theme";
import { GridLines } from "./Intro";

// "Look sharper. / Run smarter." with masked line reveals and an underline swipe.
export const Headline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();
  const size = (vertical ? 180 : 215) * u;

  // Each side speaks in its own voice: serif italic for Design, dot matrix for Tech.
  const D = (t: string) => <span style={{ ...serifStyle, color: color.design }}>{t}</span>;
  const T = (t: string) => <span style={{ ...dotStyle, color: color.tech }}>{t}</span>;
  const lines = vertical
    ? [<>Look</>, D("sharper."), <>Run</>, T("smarter.")]
    : [<>Look {D("sharper.")}</>, <>Run {T("smarter.")}</>];

  return (
    <AbsoluteFill style={{ backgroundColor: color.paper, justifyContent: "center", padding: pad }}>
      <GridLines />
      <div style={{ fontFamily: mono, fontSize: 28 * u, textTransform: "uppercase", color: color.ink, marginBottom: 40 * u, opacity: interpolate(frame, [0, 0.3 * fps], [0, 1], { extrapolateRight: "clamp" }) }}>
        [01] What we do
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden", paddingBottom: 0.06 * size }}>
          <div
            style={{
              ...wide,
              fontWeight: 800,
              fontSize: size,
              lineHeight: 0.86,
              whiteSpace: "nowrap",
              letterSpacing: "-0.037em",
              color: color.ink,
              paddingLeft: !vertical && i === 1 ? 220 * u : 0,
              translate: interpolate(frame, [0.15 * fps + i * 5, 0.15 * fps + i * 5 + 0.7 * fps], ["0px 110%", "0px 0%"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }),
            }}
          >
            {l}
          </div>
        </div>
      ))}
      <div
        style={{
          height: 8 * u,
          marginTop: 40 * u,
          background: `linear-gradient(90deg, ${color.design} 50%, ${color.tech} 50%)`,
          transformOrigin: "left",
          scale: `${interpolate(frame, [1 * fps, 1.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut })} 1`,
        }}
      />
    </AbsoluteFill>
  );
};
