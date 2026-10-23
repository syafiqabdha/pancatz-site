import { Composition, Folder } from "remotion";
import { Showreel } from "./Showreel";

// 30fps: scenes 2 + 3 + 3.6 + 3.6 + 3.2 + 3.4 = 18.8s (564f) minus 5 transitions x 12f = 504f
const SHOWREEL_FRAMES = 504;

export const RemotionRoot = () => (
  <Folder name="Pancatz">
    <Composition
      id="Showreel"
      component={Showreel}
      durationInFrames={SHOWREEL_FRAMES}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ whatsapp: "+60 13-757 2507", url: "pancatz.com" }}
    />
    <Composition
      id="ShowreelVertical"
      component={Showreel}
      durationInFrames={SHOWREEL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ whatsapp: "+60 13-757 2507", url: "pancatz.com" }}
    />
  </Folder>
);
