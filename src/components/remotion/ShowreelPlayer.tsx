import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import { Showreel, SHOWREEL_FRAMES } from '../../remotion/showreel/Showreel';

// Frame shown when motion is reduced: the "Look sharper. Run smarter." card.
const STILL_FRAME = 95;

/**
 * The brand showreel, rendered live by Remotion instead of a video file.
 * Plays when at least a third is on screen, unless the visitor paused it or
 * prefers reduced motion. The button always works.
 */
export default function ShowreelPlayer({ whatsapp, url }: { whatsapp: string; url: string }) {
  const player = useRef<PlayerRef>(null);
  const host = useRef<HTMLDivElement>(null);
  const userPaused = useRef(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const p = player.current;
    const el = host.current;
    if (!p || !el) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    p.addEventListener('play', onPlay);
    p.addEventListener('pause', onPause);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) p.play();
        else if (!e.isIntersecting) p.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      p.removeEventListener('play', onPlay);
      p.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = () => {
    const p = player.current;
    if (!p) return;
    if (p.isPlaying()) {
      userPaused.current = true;
      p.pause();
    } else {
      userPaused.current = false;
      p.play();
    }
  };

  return (
    <div ref={host}>
      <Player
        ref={player}
        component={Showreel}
        inputProps={{ whatsapp, url }}
        durationInFrames={SHOWREEL_FRAMES}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        loop
        initialFrame={userPaused.current ? STILL_FRAME : 0}
        clickToPlay={false}
        spaceKeyToPlayOrPause={false}
        style={{ width: '100%', aspectRatio: '16 / 9', lineHeight: 'normal' }}
        acknowledgeRemotionLicense
      />
      <div className="reel-bar">
        <span className="label" style={{ color: 'inherit' }}>[ Reel ] Live Remotion render · 17 sec</span>
        <button type="button" className="reel-toggle" aria-pressed={playing} onClick={toggle}>
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}
