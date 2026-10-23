import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { color, dotStyle, easeInOut, easeOut, mono, serifStyle, wide } from "../theme";
import { KINDS, type KindId } from "./kinds";

/**
 * "Brand your shop in 10 seconds": a visitor types a shop name, and this
 * composition builds a mini identity for it (mark, wordmark, palette,
 * signboard, card, post) and closes on a Pancatz end card.
 * 1080×1350 (4:5) so it posts cleanly to Instagram and WhatsApp status.
 */
export type BrandRevealProps = { readonly name: string; readonly kind: KindId };

export const BRAND_W = 1080;
export const BRAND_H = 1350;
export const BRAND_FRAMES = 270;

const p = (f: number, a: number, b: number, easing = easeInOut) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** Clean up visitor input: trim, collapse spaces, cap the length. */
export const cleanName = (raw: string) => {
  const s = Array.from(raw.replace(/\s+/g, " ").trim()).slice(0, 24).join("");
  return s || "Kedai Ali";
};

const fitSize = (name: string, max: number, width: number) => Math.min(max, width / (Array.from(name).length * 0.74));

const Grid = ({ tint }: { readonly tint: string }) => (
  <AbsoluteFill style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ borderLeft: i ? `1px solid ${tint}` : undefined }} />
    ))}
  </AbsoluteFill>
);

const Badge = ({ size, k, letter, f, from }: { readonly size: number; readonly k: (typeof KINDS)[KindId]; readonly letter: string; readonly f: number; readonly from: number }) => {
  const s = p(f, from, from + 22, easeOut);
  return (
    <div style={{ width: size, height: size, position: "relative", scale: String(s), rotate: `${(1 - s) * -120}deg` }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
        <circle cx={50} cy={50} r={48} fill={k.primary} />
        <circle cx={50} cy={50} r={41} fill="none" stroke={k.paper} strokeWidth={1.2} strokeDasharray="2 3" />
        <g transform="translate(66 66) scale(0.9)" stroke={k.paper} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={k.icon} />
        </g>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...serifStyle, color: k.paper, fontSize: size * 0.62, lineHeight: 1, paddingBottom: size * 0.06, paddingRight: size * 0.08 }}>
        {letter}
      </div>
    </div>
  );
};

export const BrandReveal = ({ name: rawName, kind }: BrandRevealProps) => {
  const f = useCurrentFrame();
  const k = KINDS[kind] ?? KINDS.cafe;
  const name = cleanName(rawName);
  const letter = Array.from(name)[0].toUpperCase();
  const chars = Array.from(name);

  return (
    <AbsoluteFill style={{ backgroundColor: k.paper, color: color.ink, fontFamily: mono, overflow: "hidden" }}>
      <Grid tint="rgba(13,13,15,0.07)" />

      {/* 1 · Mark: construction guides, then the badge locks in */}
      <Sequence durationInFrames={140} layout="none">
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: 1 - p(f, 100, 118), translate: `0 ${-p(f, 84, 118) * 420}px`, scale: String(1 - 0.45 * p(f, 84, 118)) }}>
          <svg width={760} height={760} viewBox="0 0 760 760" style={{ position: "absolute" }}>
            <g fill="none" stroke={color.ink} strokeWidth={2} opacity={0.45}>
              <circle cx={380} cy={380} r={300} strokeDasharray="10 12" style={{ strokeDashoffset: 1885 * (1 - p(f, 0, 34)) }} pathLength={1885} />
              <line x1={20} y1={380} x2={20 + 720 * p(f, 4, 30)} y2={380} />
              <line x1={380} y1={20} x2={380} y2={20 + 720 * p(f, 8, 34)} />
              <rect x={168} y={168} width={424} height={424} transform="rotate(45 380 380)" strokeDasharray="1700" strokeDashoffset={1700 * (1 - p(f, 12, 44))} />
            </g>
          </svg>
          <Badge size={420} k={k} letter={letter} f={f} from={30} />
        </AbsoluteFill>
      </Sequence>
      <div style={{ position: "absolute", left: 70, top: 64, fontSize: 30, textTransform: "uppercase", opacity: 1 - p(f, 200, 214) }}>
        [ {k.label} ] Brand kit · {String(Math.min(f, 255)).padStart(3, "0")}
      </div>

      {/* 2 · Wordmark, tagline, palette */}
      <Sequence from={84} durationInFrames={125} layout="none">
        <AbsoluteFill style={{ padding: 70, justifyContent: "center", opacity: 1 - p(f, 186, 204) }}>
          <div style={{ height: 300 }} />
          <div style={{ overflow: "hidden", paddingBottom: 14 }}>
            <div style={{ display: "flex", ...wide, fontWeight: 800, fontSize: fitSize(name, 170, 940), letterSpacing: "-0.03em", lineHeight: 0.95, whiteSpace: "nowrap" }}>
              {chars.map((ch, i) => (
                <span key={i} style={{ display: "inline-block", whiteSpace: "pre", translate: `0 ${(1 - p(f, 96 + i * 2, 116 + i * 2, easeOut)) * 110}%` }}>
                  {ch}
                </span>
              ))}
            </div>
          </div>
          <div style={{ ...serifStyle, fontSize: 76, color: k.primary, marginTop: 18, opacity: p(f, 118, 134), translate: `0 ${(1 - p(f, 118, 140, easeOut)) * 30}px` }}>{k.tagline}</div>
          <div style={{ display: "flex", gap: 22, marginTop: 70 }}>
            {[k.primary, k.second, color.ink, k.paper].map((c, i) => {
              const s = p(f, 132 + i * 5, 150 + i * 5, easeOut);
              return (
                <div key={i} style={{ opacity: s, translate: `0 ${(1 - s) * 40}px` }}>
                  <div style={{ width: 150, height: 150, background: c, border: `3px solid ${color.ink}` }} />
                  <div style={{ fontSize: 26, marginTop: 12, textTransform: "uppercase" }}>{c}</div>
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 3 · Out in the world: signboard, card, post */}
      <Sequence from={186} durationInFrames={64} layout="none">
        <AbsoluteFill style={{ padding: 70, paddingTop: 150, display: "grid", gridTemplateRows: "1.1fr 1fr", gap: 30, opacity: 1 - p(f, 236, 248) }}>
          {/* Signboard */}
          <div style={{ position: "relative", border: `3px solid ${color.ink}`, background: "#fff", overflow: "hidden", clipPath: `inset(0 ${100 - p(f, 186, 204) * 100}% 0 0)` }}>
            <div style={{ position: "absolute", left: 40, right: 40, top: 40, height: 170, background: color.ink, display: "flex", alignItems: "center", gap: 26, padding: "0 30px" }}>
              <Badge size={120} k={k} letter={letter} f={f} from={190} />
              <span style={{ ...dotStyle, color: k.second, fontSize: fitSize(name, 92, 640), textShadow: `0 0 22px ${k.second}`, whiteSpace: "nowrap" }}>{name.toUpperCase()}</span>
            </div>
            <div style={{ position: "absolute", left: 20, right: 20, top: 210, display: "grid", gridTemplateColumns: "repeat(10, 1fr)", height: 70 }}>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} style={{ background: i % 2 ? k.paper : k.primary, border: `2px solid ${color.ink}`, height: 70 * p(f, 196, 210, easeOut) }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 70, top: 310, width: 300, bottom: 0, border: `3px solid ${color.ink}`, borderBottom: 0 }} />
            <div style={{ position: "absolute", right: 70, top: 310, width: 380, bottom: 30, border: `3px solid ${color.ink}` }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
            {/* Business card */}
            <div style={{ perspective: 1200, display: "flex", alignItems: "center" }}>
              <div style={{ width: "100%", aspectRatio: "1.75", background: k.paper, border: `3px solid ${color.ink}`, padding: 26, display: "flex", flexDirection: "column", justifyContent: "space-between", transform: `rotateY(${(1 - p(f, 200, 222, easeOut)) * 80}deg) rotate(-4deg)`, boxShadow: "18px 18px 0 rgba(13,13,15,0.9)" }}>
                <Badge size={78} k={k} letter={letter} f={f} from={204} />
                <div>
                  <div style={{ ...wide, fontWeight: 800, fontSize: fitSize(name, 40, 380), whiteSpace: "nowrap" }}>{name}</div>
                  <div style={{ fontSize: 18, marginTop: 6, textTransform: "uppercase" }}>{k.label} · Est. {new Date().getFullYear()}</div>
                </div>
              </div>
            </div>
            {/* Social post */}
            <div style={{ background: k.primary, border: `3px solid ${color.ink}`, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", color: k.paper, translate: `0 ${(1 - p(f, 206, 226, easeOut)) * 120}%` }}>
              <span style={{ fontSize: 22, textTransform: "uppercase" }}>@{name.toLowerCase().replace(/[^a-z0-9]/g, "")}</span>
              <span style={{ ...serifStyle, fontSize: 58, lineHeight: 1 }}>Now open.</span>
            </div>
          </div>
          <div style={{ position: "absolute", left: 70, right: 70, bottom: 34, display: "flex", justifyContent: "space-between", fontSize: 24, textTransform: "uppercase" }}>
            <span>{k.label} brand kit</span>
            <span>Made at pancatz.com/try</span>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 4 · Pancatz end card */}
      <Sequence from={238} layout="none">
        <AbsoluteFill style={{ backgroundColor: color.ink, color: color.paper, padding: 70, justifyContent: "space-between", clipPath: `inset(${100 - p(f, 238, 252) * 100}% 0 0 0)` }}>
          <Grid tint="rgba(242,240,235,0.08)" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, textTransform: "uppercase" }}>
            <span>Made in 10 seconds</span>
            <Img src={staticFile("pancatz-logo.webp")} style={{ width: 100, height: 100, borderRadius: "50%", border: `3px solid ${color.paper}` }} />
          </div>
          <div>
            <div style={{ ...wide, fontWeight: 800, fontSize: 118, lineHeight: 0.9, letterSpacing: "-0.035em" }}>
              Imagine
              <br />
              <span style={serifStyle}>10 days</span>
              <span style={{ color: color.design }}>.</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 50, ...wide, fontWeight: 700, fontSize: 44 }}>
              <span>pancatz.com</span>
              <span style={{ ...dotStyle, color: k.second }}>/try</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
