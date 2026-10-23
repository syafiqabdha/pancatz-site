import { useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut } from "../theme";
import { Card, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

const steps = ["WhatsApp", "AI", "CRM", "Reply"];
const NX = (i: number) => 40 + i * 150;
const NY = 76;

// AI: a message runs through the workflow while the chat answers itself.
export const Automation = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.tech : color.ink;
  const pulse = prog(f, 14, 74);
  const at = pulse * (steps.length - 1);
  const bubble = (from: number) => {
    const p = prog(f, from, from + 10, easeOut);
    return { opacity: p, transform: `translateY(${(1 - p) * 16}px) scale(${0.92 + 0.08 * p})` };
  };
  const typing = f >= 52 && f < 76;

  return (
    <Card code="B3" label="AI automation">
      <div style={{ position: "absolute", inset: 0, opacity: out }}>
        <svg width={640} height={480} style={{ position: "absolute", inset: 0 }}>
          <line x1={NX(0) + 60} y1={NY + 26} x2={NX(3) + 60} y2={NY + 26} stroke={color.ink} strokeWidth={2} strokeDasharray="4 6" />
          <line x1={NX(0) + 60} y1={NY + 26} x2={NX(0) + 60 + at * 150} y2={NY + 26} stroke={accent} strokeWidth={4} style={ease} />
          <circle cx={NX(0) + 60 + at * 150} cy={NY + 26} r={8} fill={accent} opacity={pulse > 0 && pulse < 1 ? 1 : 0} style={ease} />
        </svg>
        {steps.map((s, i) => {
          const on = at >= i - 0.05 && pulse > 0;
          return (
            <div
              key={s}
              style={{
                position: "absolute",
                left: NX(i),
                top: NY,
                width: 120,
                height: 52,
                border: `2px solid ${color.ink}`,
                background: on ? accent : color.paper,
                color: on ? color.paper : color.ink,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 17,
                textTransform: "uppercase",
                ...ease,
              }}
            >
              {s}
            </div>
          );
        })}
        <div style={{ position: "absolute", left: 40, right: 40, top: 168, display: "grid", gap: 12, fontSize: 20 }}>
          <div style={{ justifySelf: "start", maxWidth: 330, border: `2px solid ${color.ink}`, padding: "10px 14px", background: "#fff", ...bubble(10) }}>
            Price for 500 business cards?
          </div>
          {typing ? (
            <div style={{ justifySelf: "end", border: `2px solid ${color.ink}`, padding: "10px 16px", display: "flex", gap: 6, ...bubble(52) }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: color.ink, opacity: 0.3 + 0.7 * (Math.floor(f / 4 + i) % 3 === 0 ? 1 : 0) }} />
              ))}
            </div>
          ) : (
            <div style={{ justifySelf: "end", maxWidth: 360, padding: "10px 14px", background: accent, color: color.paper, border: `2px solid ${accent}`, ...bubble(76), ...ease }}>
              RM 380, ready Friday. Want the order form?
            </div>
          )}
        </div>
        <div style={{ position: "absolute", left: 40, bottom: 26 }}>
          <div style={{ ...dotStyle, fontSize: 54, lineHeight: 1, color: accent, ...ease }}>-12h</div>
          <div style={{ fontSize: 16, textTransform: "uppercase", marginTop: 6 }}>Saved every week</div>
        </div>
        <div style={{ position: "absolute", right: 40, bottom: 30, fontSize: 18, textTransform: "uppercase" }}>Reply in 4s</div>
      </div>
    </Card>
  );
};
