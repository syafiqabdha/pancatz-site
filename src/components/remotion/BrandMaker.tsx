import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BRAND_FRAMES, BRAND_H, BRAND_W, BrandReveal, cleanName } from '../../remotion/brand-maker/BrandReveal';
import { isKind, KIND_IDS, KINDS, type KindId } from '../../remotion/brand-maker/kinds';

type Props = { whatsapp: string; siteUrl: string };
type Job = { state: 'idle' } | { state: 'rendering'; progress: number } | { state: 'error'; message: string };

const composition = {
  id: 'BrandMaker',
  component: BrandReveal,
  durationInFrames: BRAND_FRAMES,
  fps: 30,
  width: BRAND_W,
  height: BRAND_H,
  defaultProps: { name: 'Kedai Ali', kind: 'cafe' as KindId },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'shop';

/**
 * The brand maker on /try. Visitors type a shop name, pick a type, and a
 * Remotion composition builds a mini brand for it live. They can save it as
 * an MP4 or PNG (rendered in their own browser) and share a link that
 * replays it for whoever opens it.
 */
export default function BrandMaker({ whatsapp, siteUrl }: Props) {
  const [name, setName] = useState('');
  const [kind, setKind] = useState<KindId>('cafe');
  const [job, setJob] = useState<Job>({ state: 'idle' });
  const [copied, setCopied] = useState(false);
  const player = useRef<PlayerRef>(null);
  const reduced = useMemo(() => matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  // A shared link (?n=…&k=…) opens with that brand already playing.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const n = q.get('n');
    const k = q.get('k');
    if (n) setName(n.slice(0, 24));
    if (isKind(k)) setKind(k);
  }, []);

  const shown = cleanName(name);
  const inputProps = useMemo(() => ({ name: shown, kind }), [shown, kind]);
  const shareUrl = `${siteUrl}/try?n=${encodeURIComponent(shown)}&k=${kind}`;

  // Keep the address bar in sync so copying the URL shares this brand.
  useEffect(() => {
    if (!name) return;
    const t = setTimeout(() => history.replaceState(null, '', `/try?n=${encodeURIComponent(shown)}&k=${kind}`), 400);
    return () => clearTimeout(t);
  }, [name, shown, kind]);

  // Jump to the wordmark while typing so visitors see their name straight away.
  const lastName = useRef(shown);
  useEffect(() => {
    const p = player.current;
    if (!p || lastName.current === shown) return;
    lastName.current = shown;
    p.seekTo(96);
    if (!reduced) p.play();
  }, [shown, reduced]);

  const render = async (type: 'video' | 'image') => {
    setJob({ state: 'rendering', progress: 0 });
    try {
      const web = await import('@remotion/web-renderer');
      let blob: Blob;
      let ext: string;
      if (type === 'video') {
        // MP4 plays everywhere (WhatsApp, Instagram); fall back to WebM where H.264 encoding is missing.
        let container: 'mp4' | 'webm' = 'mp4';
        if (!(await web.canRenderMediaOnWeb({ container: 'mp4', width: BRAND_W, height: BRAND_H })).canRender) {
          container = 'webm';
          if (!(await web.canRenderMediaOnWeb({ container, width: BRAND_W, height: BRAND_H })).canRender) {
            throw new Error('This browser can’t make videos yet. Try Chrome, or save the image instead.');
          }
        }
        const res = await web.renderMediaOnWeb({
          composition,
          inputProps,
          container,
          licenseKey: 'free-license',
          onProgress: ({ progress }) => setJob({ state: 'rendering', progress }),
        });
        blob = await res.getBlob();
        ext = container;
      } else {
        const res = await web.renderStillOnWeb({ composition, inputProps, frame: 222, licenseKey: 'free-license' });
        blob = await res.blob({ format: 'png' });
        ext = 'png';
      }
      const file = new File([blob], `${slug(shown)}-brand-by-pancatz.${ext}`, { type: blob.type });
      // On phones, hand the file straight to the share sheet (WhatsApp, Instagram…).
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `My shop, branded in 10 seconds by Pancatz: ${shareUrl}` }).catch(() => {});
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = file.name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      }
      setJob({ state: 'idle' });
    } catch (e) {
      setJob({ state: 'error', message: e instanceof Error ? e.message : 'Something went wrong. Please try again.' });
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      prompt('Copy this link', shareUrl);
    }
  };

  const shareText = `I just branded "${shown}" in 10 seconds 😮 Try yours: ${shareUrl}`;
  const realText = `Hi Pancatz! I tried the brand maker for "${shown}" (${KINDS[kind].label}). Can we make it real?`;
  const busy = job.state === 'rendering';

  return (
    <div className="bm">
      <form className="bm-form bm-in" onSubmit={(e) => e.preventDefault()}>
        <label className="label" htmlFor="bm-name">Your shop’s name</label>
        <input
          id="bm-name"
          className="bm-input"
          value={name}
          maxLength={24}
          placeholder="Kedai Ali"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        <fieldset className="bm-kinds">
          <legend className="label">What kind of shop?</legend>
          {KIND_IDS.map((id) => (
            <label key={id} className="bm-kind" data-checked={id === kind}>
              <input type="radio" name="kind" value={id} checked={id === kind} onChange={() => setKind(id)} />
              <span className="bm-dot" style={{ background: KINDS[id].primary }} aria-hidden="true" />
              {KINDS[id].label}
            </label>
          ))}
        </fieldset>
      </form>

      <div className="bm-form bm-out">
        <div className="bm-actions">
          <button type="button" className="btn" disabled={busy} onClick={() => render('video')}>
            {job.state === 'rendering' ? `Making… ${Math.round(job.progress * 100)}%` : 'Save video'}
          </button>
          <button type="button" className="btn btn--ghost" disabled={busy} onClick={() => render('image')}>
            Save image
          </button>
        </div>
        <div className="bm-actions">
          <a className="btn btn--ghost" href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener">
            Share on WhatsApp
          </a>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            {copied ? 'Link copied ✓' : 'Copy link'}
          </button>
        </div>
        {job.state === 'error' ? <p className="bm-error" role="alert">{job.message}</p> : null}
        <p className="bm-real">
          Like it? This took 10 seconds. A real brand takes us about 10 days.{' '}
          <a className="link-u" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(realText)}`} target="_blank" rel="noopener">
            Make it real on WhatsApp →
          </a>
        </p>
      </div>

      <div className="bm-stage" aria-label={`Animated brand preview for ${shown}`} role="img">
        <Player
          ref={player}
          component={BrandReveal}
          inputProps={inputProps}
          durationInFrames={BRAND_FRAMES}
          compositionWidth={BRAND_W}
          compositionHeight={BRAND_H}
          fps={30}
          loop
          autoPlay={!reduced}
          initialFrame={reduced ? 222 : 0}
          clickToPlay={false}
          spaceKeyToPlayOrPause={false}
          style={{ width: '100%' }}
          acknowledgeRemotionLicense
        />
      </div>
    </div>
  );
}
