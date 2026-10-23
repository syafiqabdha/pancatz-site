/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import path from "node:path";
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Compositions live in the website (../src/remotion) so the site's <Player>
// and these renders share one source. Pin the runtime packages to this
// project's copies so the bundle never mixes two Remotion or React instances.
const pin = (name: string) => path.resolve(process.cwd(), "node_modules", name);
Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...(config.resolve?.alias ?? {}),
      remotion: pin("remotion"),
      "@remotion/transitions": pin("@remotion/transitions"),
      react: pin("react"),
      "react-dom": pin("react-dom"),
    },
  },
}));
