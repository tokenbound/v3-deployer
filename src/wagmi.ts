import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import * as chainExports from "wagmi/chains";

const allChains = Object.keys(chainExports).map(
  // @ts-ignore
  (key): Chain => chainExports[key],
);

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  // @ts-ignore
  chains: allChains,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
