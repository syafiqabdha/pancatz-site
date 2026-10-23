import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { SERVICE_HEIGHT, SERVICE_MOTION, SERVICE_WIDTH } from '../../remotion/services';

// Frame shown when motion is reduced: every visual is fully built by then.
const STILL_FRAME = 100;

/**
 * A service's looping Remotion visual, played live in the page.
 * Plays only while on screen. Hovering or focusing the service row (or, on
 * touch screens, scrolling it into the middle of the view) switches the art
 * to the side colour.
 */
export default function ServiceMotion({ id }: { id: string }) {
  const entry = SERVICE_MOTION.find((s) => s.id === id);
  const player = useRef<PlayerRef>(null);
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const el = host.current;
    const p = player.current;
    if (!el || !p) return;
    const row = el.closest<HTMLElement>('.svc-row') ?? el;
    const on = () => setActive(true);
    const off = () => setActive(false);
    row.addEventListener('pointerenter', on);
    row.addEventListener('pointerleave', off);
    row.addEventListener('focusin', on);
    row.addEventListener('focusout', off);

    const touch = matchMedia('(hover: none)').matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!reduced) (e.isIntersecting ? p.play() : p.pause());
        if (touch) setActive(e.intersectionRatio > 0.85);
      },
      { threshold: [0, 0.25, 0.85] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      row.removeEventListener('pointerenter', on);
      row.removeEventListener('pointerleave', off);
      row.removeEventListener('focusin', on);
      row.removeEventListener('focusout', off);
    };
  }, [reduced]);

  const inputProps = useMemo(() => ({ active }), [active]);
  if (!entry) return null;

  return (
    <div ref={host} className="svc-motion" aria-hidden="true">
      <Player
        ref={player}
        component={entry.component}
        inputProps={inputProps}
        durationInFrames={entry.durationInFrames}
        compositionWidth={SERVICE_WIDTH}
        compositionHeight={SERVICE_HEIGHT}
        fps={30}
        loop
        initialFrame={reduced ? STILL_FRAME : 0}
        clickToPlay={false}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        style={{ width: '100%' }}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
