import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, display, easeOut, mono, useLayout } from "../theme";

// Logo + location, then the wordmark slams in letter by letter.
export const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();
  const word = "Pancatz";

  return (
    <AbsoluteFill style={{ backgroundColor: color.paper, justifyContent: "center", alignItems: "center" }}>
      <GridLines />
      <Img
        src={staticFile("logo.webp")}
        style={{
          width: 180 * u,
          height: 180 * u,
          borderRadius: "50%",
          border: `${3 * u}px solid ${color.ink}`,
          scale: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
          rotate: interpolate(frame, [0, 0.6 * fps], ["-90deg", "0deg"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
          marginBottom: 40 * u,
        }}
      />
      <div style={{ display: "flex", overflow: "hidden", paddingBottom: 10 * u }}>
        {word.split("").map((ch, i) => (
          <span
            key={i}
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: (vertical ? 230 : 300) * u,
              letterSpacing: "-0.06em",
              lineHeight: 0.9,
              color: color.ink,
              display: "inline-block",
              translate: interpolate(frame, [0.35 * fps + i * 2, 0.35 * fps + i * 2 + 0.5 * fps], ["0px 110%", "0px 0%"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              }),
            }}
          >
            {ch}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: pad,
          right: pad,
          bottom: pad,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: mono,
          fontSize: 28 * u,
          textTransform: "uppercase",
          color: color.ink,
          opacity: interpolate(frame, [0.8 * fps, 1.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span>[ Studio ]</span>
        <span>Kulai, Johor</span>
      </div>
    </AbsoluteFill>
  );
};

export const GridLines = ({ tint = "rgba(13,13,15,0.07)" }: { readonly tint?: string }) => {
  const { vertical } = useLayout();
  const cols = vertical ? 4 : 12;
  return (
    <AbsoluteFill style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }, (_, i) => (
        <div key={i} style={{ borderLeft: `1px solid ${tint}` }} />
      ))}
    </AbsoluteFill>
  );
};
