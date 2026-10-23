import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { color, dotStyle, easeInOut, mono } from "../theme";

/**
 * Shared pieces for the service visuals: small looping compositions that the
 * site plays inline with <Player>. Canvas is 640×480 at 30fps.
 * `active` is true while the visitor hovers or focuses the service row,
 * and switches the art from ink line work to the side colour.
 */
export type ServiceMotionProps = { readonly active?: boolean };

export const W = 640;
export const H = 480;
export const LOOP = 150;

/** Eased 0→1 progress between two frames. */
export const prog = (frame: number, from: number, to: number, easing = easeInOut) =>
  interpolate(frame, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

/** 1 for most of the loop, fading to 0 in the last frames so the loop restarts cleanly. */
export const loopOut = (frame: number) => 1 - prog(frame, LOOP - 16, LOOP - 2);

/** CSS transition so hover colour changes ease in the Player (ignored when rendering). */
export const ease: CSSProperties = { transition: "fill .45s, stroke .45s, background-color .45s, color .45s, border-color .45s" };

/** Stroke-draw helper for SVG paths whose length is known. */
export const draw = (length: number, p: number) => ({ strokeDasharray: length, strokeDashoffset: length * (1 - p) });

export const Card = ({ code, label, children }: { readonly code: string; readonly label: string; readonly children: ReactNode }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: color.paper, color: color.ink, fontFamily: mono, overflow: "hidden" }}>
      <AbsoluteFill style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} style={{ borderLeft: i ? "1px solid rgba(13,13,15,0.07)" : undefined }} />
        ))}
      </AbsoluteFill>
      {children}
      <div style={{ position: "absolute", left: 24, top: 20, fontSize: 18, textTransform: "uppercase", letterSpacing: "0.02em" }}>
        {code} · {label}
      </div>
      <div style={{ position: "absolute", right: 24, top: 14, fontSize: 26, ...dotStyle }}>
        {String(frame).padStart(3, "0")}
      </div>
    </AbsoluteFill>
  );
};
