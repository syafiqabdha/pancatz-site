import { useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut } from "../theme";
import { Card, ease, LOOP, loopOut, prog, type ServiceMotionProps } from "./kit";

const CX = 300;
const CY = 250;
const nodes = [
  { label: "PC", a: -150 },
  { label: "CCTV", a: -90 },
  { label: "AP", a: -30 },
  { label: "PRINT", a: 30 },
  { label: "POS", a: 150 },
].map((n) => ({ ...n, x: CX + Math.cos((n.a * Math.PI) / 180) * 170, y: CY + Math.sin((n.a * Math.PI) / 180) * 140 }));

const FAULT = 3;

// IT support & networks: links come up, packets flow, one device fails
// and gets fixed while uptime holds.
export const Network = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.tech : color.ink;
  const down = f >= 58 && f < 92;
  const fixed = prog(f, 92, 104, easeOut);
  const ping = 9 + ((f * 7) % 9);

  return (
    <Card code="B1" label="IT & networks">
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        {nodes.map((n, i) => {
          const p = prog(f, 4 + i * 4, 24 + i * 4);
          const broken = i === FAULT && down;
          return (
            <g key={n.label}>
              <line x1={CX} y1={CY} x2={CX + (n.x - CX) * p} y2={CY + (n.y - CY) * p} stroke={broken ? color.design : color.ink} strokeWidth={2} strokeDasharray={broken ? "6 6" : undefined} />
              {/* Packets: two per link, travelling out and back on a loop-length period. */}
              {!broken && p === 1
                ? [0, 0.5].map((o) => {
                    const t = ((f / LOOP) * 3 + o + i * 0.17) % 1;
                    const k = t < 0.5 ? t * 2 : 2 - t * 2;
                    return <rect key={o} x={CX + (n.x - CX) * k - 5} y={CY + (n.y - CY) * k - 5} width={10} height={10} fill={accent} style={ease} />;
                  })
                : null}
            </g>
          );
        })}
        <rect x={CX - 34} y={CY - 34} width={68} height={68} fill={accent} style={ease} />
        <rect x={CX - 14} y={CY - 14} width={28} height={28} fill={color.paper} />
        {nodes.map((n, i) => {
          const p = prog(f, 14 + i * 4, 28 + i * 4, easeOut);
          const broken = i === FAULT && down;
          const fill = broken ? color.design : i === FAULT && fixed > 0 ? (active ? color.tech : color.ink) : color.paper;
          return (
            <g key={n.label} opacity={p} transform={`translate(${n.x} ${n.y}) scale(${0.6 + 0.4 * p})`}>
              <rect x={-24} y={-24} width={48} height={48} fill={fill} stroke={color.ink} strokeWidth={2} style={ease} />
              {i === FAULT && fixed > 0 ? <path d="M-11 0 l7 8 l15 -16" stroke={color.paper} strokeWidth={4} fill="none" strokeDasharray={40} strokeDashoffset={40 * (1 - fixed)} /> : null}
              {broken ? <text y={9} textAnchor="middle" fontSize={26} fontWeight={700} fill={color.paper}>!</text> : null}
            </g>
          );
        })}
      </svg>
      {nodes.map((n) => (
        <div key={n.label} style={{ position: "absolute", left: n.x - 50, width: 100, top: n.y + 30, textAlign: "center", fontSize: 16, opacity: prog(f, 20, 34) * out }}>
          {n.label}
        </div>
      ))}
      <div style={{ position: "absolute", left: 24, bottom: 22, opacity: out }}>
        <div style={{ ...dotStyle, fontSize: 54, lineHeight: 1, color: accent, ...ease }}>99.98%</div>
        <div style={{ fontSize: 16, textTransform: "uppercase", marginTop: 6 }}>Uptime</div>
      </div>
      <div style={{ position: "absolute", right: 24, bottom: 26, fontSize: 18, textTransform: "uppercase", opacity: out, color: down ? color.design : color.ink }}>
        {down ? "Print: offline" : `Ping ${ping}ms`}
      </div>
    </Card>
  );
};
