# Para Pregen Wallet Demo

1. Log in with your warpcast account
2. Query your followers and pregenerate wallets for them
3. Mint an NFT for each
4. Users can claim their accounts with their Warpcast account

## Workflow

```bash
# 1. Start the hardhat node
cd hardhat/
yarn
npx hardhat node

# 2. Start the frontend in a separate terminal
cd frontend/
yarn
yarn run dev

# 3. Create the admin para account

# 4. Link you Warpcast account

# 5. Fund the account
npx hardhat fund --to <ACCOUNT_ADDRESS> --network localhost

# 6. Pregenrate wallets and mint NFTs for the recipients

# 7. Log in with a recipient Warpcast account

# 8. Claim wallet

# 9. Inspect NFT
```
