import { Composition, Folder } from "remotion";
import { SERVICE_MOTION } from "../../src/remotion/services";
import { Showreel, SHOWREEL_FRAMES } from "../../src/remotion/showreel/Showreel";

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
    <Folder name="Services">
      {SERVICE_MOTION.map((s) => (
        <Composition
          key={s.id}
          id={`Service-${s.id}`}
          component={s.component}
          durationInFrames={s.durationInFrames}
          fps={30}
          width={640}
          height={480}
          defaultProps={{ active: true }}
        />
      ))}
    </Folder>
  </Folder>
);
