import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { useVideoConfig } from "remotion";
import { Headline } from "./scenes/Headline";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { RapidFire } from "./scenes/RapidFire";
import { Split } from "./scenes/Split";
import { Work } from "./scenes/Work";

export type ShowreelProps = { readonly whatsapp: string; readonly url: string };

// Total = sum of sequences - sum of transitions. Keep SHOWREEL_FRAMES in Root in sync.
export const Showreel = ({ whatsapp, url }: ShowreelProps) => {
  const { fps } = useVideoConfig();
  const t = linearTiming({ durationInFrames: Math.round(0.4 * fps) });
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Intro" durationInFrames={Math.round(2 * fps)}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t} />
      <TransitionSeries.Sequence name="Headline" durationInFrames={Math.round(3 * fps)}>
        <Headline />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={t} />
      <TransitionSeries.Sequence name="Two sides" durationInFrames={Math.round(3.6 * fps)}>
        <Split />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t} />
      <TransitionSeries.Sequence name="Disciplines" durationInFrames={Math.round(3.6 * fps)}>
        <RapidFire />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-top" })} timing={t} />
      <TransitionSeries.Sequence name="Work" durationInFrames={Math.round(3.2 * fps)}>
        <Work />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={Math.round(3.4 * fps)}>
        <Outro whatsapp={whatsapp} url={url} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
