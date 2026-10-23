import { useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut } from "../theme";
import { Card, draw, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

const SIGN = "KEDAI KOPI";

// Signage & large format: the shopfront goes up, dimension lines draw,
// and the sign lights letter by letter, with a flicker.
export const Signage = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const lit = active ? color.design : "#ffd23f";
  const awning = prog(f, 6, 30, easeOut);
  const flicker = f > 104 && f < 112 && f % 3 === 0 ? 0.25 : 1;

  return (
    <Card code="A4" label="Signage">
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        <g stroke={color.ink} strokeWidth={1.5} fill="none">
          <line x1={110} y1={92} x2={530} y2={92} style={draw(420, prog(f, 10, 34))} />
          <line x1={110} y1={84} x2={110} y2={100} opacity={prog(f, 10, 14)} />
          <line x1={530} y1={84} x2={530} y2={100} opacity={prog(f, 30, 34)} />
        </g>
        <rect x={110} y={110} width={420} height={96} fill={color.ink} />
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={90 + i * 38.3} y={206} width={38.3} height={58 * awning} fill={i % 2 ? color.paper : active ? color.design : color.ink} stroke={color.ink} strokeWidth={1.5} style={ease} />
          ))}
        </g>
        <g stroke={color.ink} strokeWidth={2} fill="none" opacity={prog(f, 20, 36)}>
          <rect x={110} y={270} width={420} height={170} />
          <rect x={140} y={300} width={170} height={110} />
          <rect x={350} y={300} width={150} height={140} />
          <line x1={425} y1={300} x2={425} y2={440} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontSize: 16, opacity: prog(f, 30, 38) * out }}>4200 MM</div>
      <div style={{ position: "absolute", left: 110, top: 110, width: 420, height: 96, display: "flex", justifyContent: "center", alignItems: "center", gap: 2, opacity: out }}>
        {SIGN.split("").map((ch, i) => {
          const on = prog(f, 36 + i * 4, 40 + i * 4) * flicker;
          return (
            <span
              key={i}
              style={{
                ...dotStyle,
                fontSize: 56,
                width: ch === " " ? 20 : undefined,
                color: on > 0.5 ? lit : "#2a2a30",
                textShadow: on > 0.5 ? `0 0 18px ${lit}` : "none",
                ...ease,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </Card>
  );
};
