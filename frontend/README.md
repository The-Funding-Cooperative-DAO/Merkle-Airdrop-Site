# frontend

Accompanies Merkle Airdrop Smart Contract which calculates proof in state/token.ts, using addresses from config.ts.

Allows users to connect their wallet and claim airdrops, given they are part of the Merkle tree.

## Run + deploy

The frontend is built to be fully configurable and ready-to-go in under 10 minutes of dev time. Steps to customize and deploy:

1. Modify `config.ts:L9` with exact config from `generator/config.json`
2. Copy environment variables (`cp .env.sample .env.local`) and modify parameters
3. Update the `logo.png` (recommended: 250x250) and `meta.png` (recommended: 1200x637) in `public/`
4. Then, `npm install` (install dependencies) and `npm run dev` to run development build
