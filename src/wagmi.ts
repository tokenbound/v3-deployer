import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import * as chainExports from "wagmi/chains";

import { defineChain } from "viem";

const customChain = defineChain({
  id: 8853,
  name: "Clique",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.myclique.io"],
    },
  },
});

const allChains = Object.keys(chainExports).map(
  // @ts-ignore
  (key): Chain => chainExports[key],
);

export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  // @ts-ignore
  // chains: allChains,
  chains: [...allChains, customChain],
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
