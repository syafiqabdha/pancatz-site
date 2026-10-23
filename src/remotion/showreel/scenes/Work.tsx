import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { color, easeInOut, easeOut, mono, useLayout, wide } from "../../theme";
import { GridLines } from "./Intro";

const shots = ["portfolio-cafe.png", "portfolio-clinic.png", "portfolio-retail.png", "portfolio-property.png"];

// Sample work tiles wipe in, then slowly push in.
export const Work = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, pad, vertical } = useLayout();

  return (
    <AbsoluteFill style={{ backgroundColor: color.paper, padding: pad, gap: 36 * u }}>
      <GridLines />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ ...wide, fontWeight: 800, fontSize: (vertical ? 120 : 130) * u, letterSpacing: "-0.031em", lineHeight: 0.9, color: color.ink }}>
          Proof, not
          <br />
          promises.
        </div>
        <div style={{ fontFamily: mono, fontSize: 26 * u, textTransform: "uppercase", color: color.ink }}>[04] Selected work</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: vertical ? "1fr" : "repeat(4, 1fr)", gridTemplateRows: vertical ? "repeat(4, 1fr)" : "1fr", gap: 20 * u }}>
        {shots.map((s, i) => {
          const start = 0.2 * fps + i * 5;
          return (
            <div
              key={s}
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: 0,
                border: `${2 * u}px solid ${color.ink}`,
                clipPath: `inset(${interpolate(frame, [start, start + 0.7 * fps], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeInOut })}% 0 0 0)`,
              }}
            >
              <Img
                src={staticFile(`images/${s}`)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  scale: interpolate(frame, [start, 3 * fps], [1.25, 1.05], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }),
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 14 * u,
                  top: 14 * u,
                  fontFamily: mono,
                  fontSize: 20 * u,
                  background: color.paper,
                  color: color.ink,
                  padding: `${4 * u}px ${8 * u}px`,
                  border: `${2 * u}px solid ${color.ink}`,
                  textTransform: "uppercase",
                }}
              >
                Sample
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
