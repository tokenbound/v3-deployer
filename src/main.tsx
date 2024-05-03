import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Buffer } from "buffer";
import React, { useContext, createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import App from "./App.tsx";
import { config as wagmiConfig } from "./wagmi";

import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { defineChain } from "viem";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

type AddChainParams = {
  name: string;
  chainId: number;
  rpcUrl: string;
};

export const ConfigContext = createContext({
  config: wagmiConfig,
  addChain: (_: AddChainParams) => {},
});

function ConfigProvider({ children }: React.PropsWithChildren) {
  const [config, setConfig] = useState(wagmiConfig);

  const addChain = ({ name, chainId, rpcUrl }: AddChainParams) => {
    setConfig((config) => ({
      ...config,
      chains: [
        defineChain({
          id: chainId,
          name,
          rpcUrls: {
            default: {
              http: [rpcUrl],
            },
          },
          nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
          },
        }),
        ...config.chains,
      ],
    }));
  };

  return (
    <ConfigContext.Provider value={{ config: wagmiConfig, addChain }}>
      {children}
    </ConfigContext.Provider>
  );
}

function Providers() {
  const { config } = useContext(ConfigContext);
  console.log(config.chains);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider>
      <Providers />
    </ConfigProvider>
  </React.StrictMode>,
);
