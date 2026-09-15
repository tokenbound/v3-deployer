import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import * as chainExports from "wagmi/chains";

import { type Chain, defineChain } from "viem";
import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";

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

const allChains = Object.values(chainExports);

export function createWagmiConfig(chains: [Chain, ...Chain[]]) {
  const projectId = import.meta.env.VITE_WC_PROJECT_ID;
  if (projectId) {
    return getDefaultConfig({
      appName: "My RainbowKit App",
      projectId,
      chains,
    });
  }

  // Browser wallets can still connect when WalletConnect is not configured.
  return createConfig({
    chains,
    connectors: [injected()],
    transports: Object.fromEntries(chains.map((chain) => [chain.id, http()])),
  });
}

export const config = createWagmiConfig([allChains[0], ...allChains.slice(1), customChain]);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
