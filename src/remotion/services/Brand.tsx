import { useCurrentFrame } from "remotion";
import { color, easeOut, serifStyle, wide } from "../theme";
import { Card, draw, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

const swatches = [
  { hex: "#FF4F1A", fill: color.design },
  { hex: "#0D0D0F", fill: color.ink },
  { hex: "#F2F0EB", fill: color.paper },
  { hex: "#FFD23F", fill: "#ffd23f" },
];

// Brand identity: construction guides draw, the mark locks together,
// then the wordmark and palette arrive.
export const Brand = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.design : color.ink;
  const cx = 200;
  const cy = 215;
  const guides = prog(f, 0, 32);
  const guideFade = 1 - 0.7 * prog(f, 62, 80);
  const mark = prog(f, 32, 58, easeOut);
  const word = "Kedai";

  return (
    <Card code="A1" label="Brand identity">
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        <g fill="none" stroke={color.ink} strokeWidth={1.5} opacity={guideFade}>
          <circle cx={cx} cy={cy} r={110} strokeDasharray="6 6" style={{ ...draw(692, guides) }} />
          <line x1={cx - 150} y1={cy} x2={cx + 150} y2={cy} style={draw(300, guides)} />
          <line x1={cx} y1={cy - 150} x2={cx} y2={cy + 150} style={draw(300, guides)} />
          <rect x={cx - 78} y={cy - 78} width={156} height={156} transform={`rotate(45 ${cx} ${cy})`} style={draw(624, prog(f, 8, 40))} />
        </g>
        <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: `scale(${mark}) rotate(${(1 - mark) * -90}deg)` }}>
          <circle cx={cx} cy={cy} r={78} fill={accent} style={ease} />
          <circle cx={cx} cy={cy} r={30} fill={color.paper} />
          <rect x={cx + 8} y={cy + 8} width={70} height={70} fill={color.ink} style={{ transform: `translate(${(1 - mark) * 40}px, ${(1 - mark) * 40}px)` }} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 60, top: 372, display: "flex", alignItems: "baseline", gap: 14, opacity: out, overflow: "hidden", paddingBottom: 8 }}>
        <span style={{ display: "flex", ...wide, fontWeight: 800, fontSize: 52, letterSpacing: "-0.03em" }}>
          {word.split("").map((ch, i) => (
            <span key={i} style={{ display: "inline-block", translate: `0 ${(1 - prog(f, 58 + i * 3, 74 + i * 3, easeOut)) * 110}%` }}>
              {ch}
            </span>
          ))}
        </span>
        <span style={{ ...serifStyle, fontSize: 58, color: accent, opacity: prog(f, 74, 90), ...ease }}>Kopi</span>
      </div>
      <div style={{ position: "absolute", left: 410, top: 110, display: "grid", gap: 14, opacity: out }}>
        {swatches.map((s, i) => {
          const p = prog(f, 78 + i * 6, 96 + i * 6, easeOut);
          return (
            <div key={s.hex} style={{ display: "flex", alignItems: "center", gap: 14, opacity: p, translate: `${(1 - p) * 30}px 0` }}>
              <span style={{ width: 52, height: 52, background: s.fill, border: `2px solid ${color.ink}` }} />
              <span style={{ fontSize: 22 }}>{s.hex}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
