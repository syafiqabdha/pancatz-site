import { interpolate, useCurrentFrame } from "remotion";
import { color, dotStyle, easeOut, serifStyle } from "../theme";
import { Card, ease, LOOP, loopOut, prog, type ServiceMotionProps } from "./kit";

const POST = 172;

// Digital & social: a feed scrolls in a phone, a post gets liked,
// and the numbers climb.
export const Social = ({ active = false }: ServiceMotionProps) => {
  const f = useCurrentFrame();
  const out = loopOut(f);
  const accent = active ? color.design : color.ink;
  // Two posts per loop, so the scroll position wraps seamlessly.
  const scroll = (f / LOOP) * POST * 2;
  const likes = Math.round(interpolate(prog(f, 40, 110, easeOut), [0, 1], [1204, 1287]));
  const heart = prog(f, 48, 58, easeOut) * (1 - prog(f, 72, 84));
  const toast = prog(f, 82, 98, easeOut);

  return (
    <Card code="A2" label="Digital & social">
      <div style={{ position: "absolute", left: 226, top: 66, width: 188, height: 380, border: `3px solid ${color.ink}`, borderRadius: 30, overflow: "hidden", background: color.paper }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: -scroll + 34 }}>
          {Array.from({ length: 5 }, (_, i) => {
            const alt = i % 2 === 0;
            return (
              <div key={i} style={{ height: POST, padding: "10px 12px", boxSizing: "border-box" }}>
                <div style={{ height: 110, background: alt ? accent : color.ink, position: "relative", overflow: "hidden", ...ease }}>
                  <div style={{ position: "absolute", right: -20, bottom: -20, width: 80, height: 80, borderRadius: "50%", background: color.paper, opacity: 0.9 }} />
                  <div style={{ position: "absolute", left: 10, top: 8, color: color.paper, fontSize: 30, ...serifStyle }}>{alt ? "New menu" : "Open late"}</div>
                </div>
                <div style={{ height: 8, width: "80%", background: color.ink, marginTop: 10, opacity: 0.8 }} />
                <div style={{ height: 8, width: "50%", background: color.ink, marginTop: 6, opacity: 0.35 }} />
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 34, background: color.paper, borderBottom: `2px solid ${color.ink}` }} />
        <svg width={90} height={90} viewBox="0 0 24 24" style={{ position: "absolute", left: 49, top: 110, transform: `scale(${heart * 1.15})`, opacity: heart }}>
          <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.5 3 5 6.5 5c2 0 3.6 1.1 4.5 2.7C11.9 6.1 13.5 5 15.5 5 19 5 21 8.5 19.6 11.8 17.5 16.4 12 21 12 21z" fill={active ? color.design : color.paper} stroke={color.ink} strokeWidth={1.2} />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 440, top: 150, opacity: out }}>
        <div style={{ ...dotStyle, fontSize: 64, lineHeight: 1, color: accent, ...ease }}>{likes.toLocaleString("en-US")}</div>
        <div style={{ fontSize: 18, textTransform: "uppercase", marginTop: 8 }}>Likes this week</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 300,
          opacity: toast * out,
          translate: `${(1 - toast) * -40}px 0`,
          border: `2px solid ${color.ink}`,
          background: active ? color.design : color.paper,
          color: color.ink,
          padding: "10px 14px",
          fontSize: 20,
          textTransform: "uppercase",
          ...ease,
        }}
      >
        +38 followers
      </div>
    </Card>
  );
};
