import { interpolate, useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut, serifStyle } from "../theme";
import { Card, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

// Weekly reach, drawn as a rising line.
const POINTS = [0.12, 0.18, 0.15, 0.3, 0.27, 0.42, 0.5, 0.47, 0.66, 0.8, 0.92];
const X0 = 50;
const X1 = 420;
const Y0 = 400;
const Y1 = 120;

// Marketing: a campaign goes out, reach climbs, and leads drop into the inbox.
export const Marketing = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.design : color.ink;
  const draw = prog(f, 10, 90, easeOut);
  const pts = POINTS.map((v, i) => [X0 + ((X1 - X0) * i) / (POINTS.length - 1), Y0 - (Y0 - Y1) * v] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const reach = Math.round(interpolate(draw, [0, 1], [0, 212]));
  const leads = Math.min(5, Math.floor(prog(f, 50, 120) * 6));
  const [hx, hy] = pts[Math.min(pts.length - 1, Math.floor(draw * (pts.length - 1)))];

  return (
    <Card code="A5" label="Marketing">
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        <g stroke="rgba(13,13,15,0.12)" strokeWidth={1}>
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={X0} x2={X1} y1={Y1 + i * ((Y0 - Y1) / 3)} y2={Y1 + i * ((Y0 - Y1) / 3)} />
          ))}
        </g>
        <path d={`${path} L${X1} ${Y0} L${X0} ${Y0} Z`} fill={accent} opacity={0.12 * draw} style={ease} />
        <path d={path} fill="none" stroke={accent} strokeWidth={5} strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} style={ease} />
        <circle cx={hx} cy={hy} r={9} fill={accent} stroke={color.paper} strokeWidth={3} opacity={draw > 0.02 ? 1 : 0} style={ease} />
      </svg>
      <div style={{ position: "absolute", left: X0, top: 64, display: "flex", alignItems: "baseline", gap: 10, opacity: out }}>
        <span style={{ ...dotStyle, fontSize: 60, lineHeight: 1, color: accent, ...ease }}>+{reach}%</span>
        <span style={{ fontSize: 18, textTransform: "uppercase" }}>Reach</span>
      </div>
      <div style={{ position: "absolute", left: 450, top: 110, width: 160, display: "grid", gap: 10, opacity: out }}>
        <div style={{ fontSize: 16, textTransform: "uppercase" }}>New leads</div>
        {Array.from({ length: 5 }, (_, i) => {
          const on = i < leads;
          return (
            <div
              key={i}
              style={{
                height: 40,
                border: `2px solid ${color.ink}`,
                background: on ? (i === leads - 1 ? accent : color.paper) : "transparent",
                color: on && i === leads - 1 ? color.paper : color.ink,
                opacity: on ? 1 : 0.15,
                translate: on ? "0 0" : "0 -10px",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: 15,
                transition: "translate .3s, opacity .3s",
                ...ease,
              }}
            >
              {["WhatsApp", "Instagram", "Google", "Walk-in", "Facebook"][i]}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: X0, bottom: 26, ...serifStyle, fontSize: 34, color: accent, opacity: prog(f, 92, 110) * out, ...ease }}>Seen by the right people.</div>
    </Card>
  );
};
