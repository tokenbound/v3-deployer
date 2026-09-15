import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";

test("configured chains have RPC transports, while custom RPC chains remain supported", async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
  try {
    const { config, createWagmiConfig } = await server.ssrLoadModule("/src/wagmi.ts");

    for (const chain of config.chains) {
      assert.doesNotThrow(() => config.getClient({ chainId: chain.id }), `${chain.name} (${chain.id})`);
    }
    assert.ok(
      config.chains.some((chain) => chain.id === 1),
      "Ethereum remains available",
    );
    assert.ok(
      config.chains.some((chain) => chain.id === 8853),
      "Clique remains available",
    );
    assert.ok(!config.chains.some((chain) => chain.id === 5042), "Arc requires a custom RPC URL");

    const customChain = {
      id: 5042,
      name: "Arc with custom RPC",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: { default: { http: ["https://rpc.example.com"] } },
    };
    const customConfig = createWagmiConfig([customChain, ...config.chains]);
    assert.equal(customConfig.getClient({ chainId: 5042 }).transport.url, "https://rpc.example.com");
  } finally {
    await server.close();
  }
});
