import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut } from "../theme";
import { Card, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

// Photography: autofocus hunts and locks, the iris fires, and the shot
// develops from flat grey to full colour.
export const Photo = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.tech : color.paper;
  const hunt = 1 - prog(f, 10, 44, easeOut);
  const lock = prog(f, 44, 52, easeOut);
  const fx = 320 + Math.sin(f / 5) * 90 * hunt;
  const fy = 250 + Math.cos(f / 7) * 50 * hunt;
  const box = 150 - 40 * lock;
  // Iris closes and reopens around frame 60, then a short flash.
  const iris = interpolate(f, [56, 61, 66], [100, 0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flash = interpolate(f, [61, 63, 72], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dev = prog(f, 66, 110);

  return (
    <Card code="B4" label="Photography">
      <div style={{ position: "absolute", inset: 0, background: color.ink }}>
        <Img
          src={staticFile("images/portfolio-cafe.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: `blur(${(1 - lock) * 8}px) grayscale(${1 - dev}) contrast(${0.8 + 0.25 * dev}) brightness(${0.55 + 0.45 * dev})`,
            scale: String(1.12 - 0.08 * dev),
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: color.ink, clipPath: `circle(${150 - iris * 1.5}% at 50% 50%)`, opacity: iris < 100 ? 1 : 0, mixBlendMode: "normal" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 70%, rgba(13,13,15,0.75))" }} />
        <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />
      </div>
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        <g stroke="rgba(242,240,235,0.35)" strokeWidth={1}>
          <line x1={213} y1={0} x2={213} y2={480} />
          <line x1={427} y1={0} x2={427} y2={480} />
          <line x1={0} y1={160} x2={640} y2={160} />
          <line x1={0} y1={320} x2={640} y2={320} />
        </g>
        <g transform={`translate(${fx} ${fy})`} stroke={lock > 0.5 ? accent : color.paper} strokeWidth={3} fill="none" style={ease}>
          {[
            [-1, -1],
            [1, -1],
            [-1, 1],
            [1, 1],
          ].map(([sx, sy], i) => (
            <path key={i} d={`M${(sx * box) / 2} ${(sy * box) / 2 - sy * 22} V${(sy * box) / 2} H${(sx * box) / 2 - sx * 22}`} />
          ))}
        </g>
      </svg>
      <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline", color: color.paper, fontSize: 18, textTransform: "uppercase", opacity: out }}>
        <span>f/2.8 · 1/125 · ISO 200</span>
        <span style={{ ...dotStyle, fontSize: 30, color: lock > 0.5 ? accent : color.paper, ...ease }}>AF {lock > 0.5 ? "OK" : "··"}</span>
      </div>
    </Card>
  );
};
