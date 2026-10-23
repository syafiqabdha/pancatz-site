import { interpolate, useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut, wide } from "../theme";
import { Card, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

const plates = [
  { c: "#00a8e8", dx: -46, dy: -30 },
  { c: "#ff2e88", dx: 40, dy: -24 },
  { c: "#ffd400", dx: -30, dy: 38 },
  { c: color.ink, dx: 44, dy: 30 },
];

const SX = 170;
const SY = 92;
const SW = 300;
const SH = 230;

// Print production: four CMYK plates start out of register and slide into
// place, then the run counts up.
export const Print = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const reg = prog(f, 12, 72, easeOut);
  const run = Math.round(interpolate(prog(f, 78, 132), [0, 1], [0, 500]));
  const accent = active ? color.design : color.ink;
  const crop = 18;

  return (
    <Card code="A3" label="Print production">
      <div style={{ position: "absolute", inset: 0, opacity: out }}>
        {[3, 2, 1].map((n) => (
          <div key={n} style={{ position: "absolute", left: SX + n * 8, top: SY + n * 8, width: SW, height: SH, border: `2px solid ${color.ink}`, background: color.paper, opacity: prog(f, 80 + n * 6, 92 + n * 6) }} />
        ))}
        <div style={{ position: "absolute", left: SX, top: SY, width: SW, height: SH, background: "#fff", border: `2px solid ${color.ink}`, overflow: "hidden" }}>
          {plates.map((p, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, mixBlendMode: "multiply", translate: `${p.dx * (1 - reg)}px ${p.dy * (1 - reg)}px` }}>
              {i < 3 ? (
                <div style={{ position: "absolute", left: 40 + i * 50, top: 40, width: 120, height: 120, borderRadius: "50%", background: p.c, opacity: 0.9 }} />
              ) : (
                <div style={{ position: "absolute", left: 24, bottom: 18, ...wide, fontWeight: 800, fontSize: 44, letterSpacing: "-0.03em", color: p.c }}>Menu</div>
              )}
            </div>
          ))}
        </div>
        <svg width={640} height={480} style={{ position: "absolute", inset: 0 }}>
          <g stroke={color.ink} strokeWidth={1.5}>
            {[
              [SX, SY, -1, -1],
              [SX + SW, SY, 1, -1],
              [SX, SY + SH, -1, 1],
              [SX + SW, SY + SH, 1, 1],
            ].map(([x, y, sx, sy], i) => (
              <g key={i}>
                <line x1={x + sx * 6} y1={y} x2={x + sx * (6 + crop)} y2={y} />
                <line x1={x} y1={y + sy * 6} x2={x} y2={y + sy * (6 + crop)} />
              </g>
            ))}
          </g>
          <g transform={`translate(320 66) rotate(${reg * 180})`} stroke={accent} strokeWidth={2} fill="none" style={ease}>
            <circle r={12} />
            <line x1={-20} x2={20} />
            <line y1={-20} y2={20} />
          </g>
        </svg>
        <div style={{ position: "absolute", left: 34, bottom: 30, fontSize: 18, textTransform: "uppercase" }}>CMYK · 350gsm · Matte</div>
        <div style={{ position: "absolute", right: 30, bottom: 22, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 18, textTransform: "uppercase" }}>Run</span>
          <span style={{ ...dotStyle, fontSize: 56, lineHeight: 1, color: accent, ...ease }}>{String(run).padStart(3, "0")}</span>
        </div>
      </div>
    </Card>
  );
};
