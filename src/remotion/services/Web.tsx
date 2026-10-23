import { interpolate, useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut, wide } from "../theme";
import { Card, ease, loopOut, prog, type ServiceMotionProps } from "./kit";

const BX = 30;
const BY = 72;
const BW = 380;

// Web, hosting & SEO: the page assembles block by block, the speed score
// fills, and the site climbs to the top search result.
export const Web = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.tech : color.ink;
  const block = (i: number) => {
    const p = prog(f, 8 + i * 6, 22 + i * 6, easeOut);
    return { opacity: p, transform: `translateY(${(1 - p) * 14}px)` };
  };
  const score = prog(f, 40, 90, easeOut);
  const climb = prog(f, 84, 116, easeOut);
  // Our row moves from 4th to 1st; the others step down one place each.
  const rowY = (i: number) => (i === 3 ? interpolate(climb, [0, 1], [3, 0]) : i + climb);

  return (
    <Card code="B2" label="Web & SEO">
      <div style={{ position: "absolute", left: BX, top: BY, width: BW, height: 340, border: `2px solid ${color.ink}`, background: "#fff", opacity: out }}>
        <div style={{ height: 30, borderBottom: `2px solid ${color.ink}`, display: "flex", alignItems: "center", gap: 6, padding: "0 10px" }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", border: `1.5px solid ${color.ink}` }} />
          ))}
          <span style={{ marginLeft: 10, fontSize: 14 }}>kedaikopi.my</span>
        </div>
        <div style={{ padding: 14, display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", ...block(0) }}>
            <span style={{ ...wide, fontWeight: 800, fontSize: 18 }}>Kedai</span>
            <span style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ width: 34, height: 8, background: color.ink, opacity: 0.4, marginTop: 6 }} />
              ))}
            </span>
          </div>
          <div style={{ height: 112, background: accent, position: "relative", ...block(1), ...ease }}>
            <span style={{ position: "absolute", left: 14, bottom: 12, ...wide, fontWeight: 800, fontSize: 30, color: color.paper, letterSpacing: "-0.03em" }}>Good coffee.</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, ...block(2) }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 72, border: `2px solid ${color.ink}` }} />
            ))}
          </div>
          <div style={{ height: 8, width: "70%", background: color.ink, ...block(3), opacity: block(3).opacity * 0.6 }} />
          <div style={{ height: 8, width: "45%", background: color.ink, ...block(4), opacity: block(4).opacity * 0.3 }} />
        </div>
      </div>
      <svg width={640} height={480} style={{ position: "absolute", inset: 0, opacity: out }}>
        <circle cx={528} cy={150} r={56} fill="none" stroke="rgba(13,13,15,0.12)" strokeWidth={10} />
        <circle cx={528} cy={150} r={56} fill="none" stroke={accent} strokeWidth={10} strokeDasharray={352} strokeDashoffset={352 * (1 - score)} transform="rotate(-90 528 150)" style={ease} />
      </svg>
      <div style={{ position: "absolute", left: 472, width: 112, top: 122, textAlign: "center", ...dotStyle, fontSize: 48, lineHeight: 1, opacity: out }}>{Math.round(score * 100)}</div>
      <div style={{ position: "absolute", left: 472, width: 112, top: 214, textAlign: "center", fontSize: 14, textTransform: "uppercase", opacity: out }}>Speed</div>
      <div style={{ position: "absolute", left: 440, top: 258, width: 176, height: 160, opacity: out }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: rowY(i) * 40,
              height: 32,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 8px",
              border: `2px solid ${i === 3 ? accent : "rgba(13,13,15,0.2)"}`,
              background: i === 3 ? accent : "transparent",
              color: i === 3 ? color.paper : color.ink,
              fontSize: 14,
              ...ease,
            }}
          >
            <span style={dotStyle}>#{Math.round(rowY(i)) + 1}</span>
            <span style={{ height: 6, flex: 1, background: "currentColor", opacity: i === 3 ? 0.9 : 0.25 }} />
          </div>
        ))}
      </div>
    </Card>
  );
};
