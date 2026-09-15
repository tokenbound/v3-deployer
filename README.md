This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

## Development

Use Node.js 20.19+ (or 22.12+) and pnpm 8.15.9:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

For WalletConnect support, set `VITE_WC_PROJECT_ID` in `.env.local` to your WalletConnect project ID before starting Vite. Without it, the app supports installed browser wallets only.

Run `pnpm build` to type-check and create a production build. Deployment buttons send real transactions on the connected wallet's selected chain; use a testnet for testing.
