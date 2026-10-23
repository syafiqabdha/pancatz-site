import type { ComponentType } from "react";
import { Automation } from "./Automation";
import { Brand } from "./Brand";
import { LOOP, type ServiceMotionProps } from "./kit";
import { Network } from "./Network";
import { Photo } from "./Photo";
import { Print } from "./Print";
import { Signage } from "./Signage";
import { Social } from "./Social";
import { Web } from "./Web";

export type { ServiceMotionProps } from "./kit";
export { H as SERVICE_HEIGHT, W as SERVICE_WIDTH } from "./kit";

/** One looping visual per service id in src/data/services.ts. */
export const SERVICE_MOTION: { id: string; component: ComponentType<ServiceMotionProps>; durationInFrames: number }[] = [
  { id: "brand", component: Brand, durationInFrames: LOOP },
  { id: "digital", component: Social, durationInFrames: LOOP },
  { id: "print", component: Print, durationInFrames: LOOP },
  { id: "signage", component: Signage, durationInFrames: LOOP },
  { id: "it", component: Network, durationInFrames: LOOP },
  { id: "web", component: Web, durationInFrames: LOOP },
  { id: "ai", component: Automation, durationInFrames: LOOP },
  { id: "photo", component: Photo, durationInFrames: LOOP },
];
