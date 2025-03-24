# Para Pregen Wallet Demo

![Demo](images/Screenshot%20from%202025-03-24%2016-33-43.png)

## How It Works

1. Create a Para account
2. Log in and link your Warpcast account
3. Query your followers and pregenerate wallets for them
4. Mint an NFT for each follower

## Code Highlights

- frontend/src/app/\_components/auth/\*.tsx – Implements the Para and Warpcast authentcation flow
- frontend/src/app/\_components/Admin.tsx – Implements the "giveaway" workflow
- frontend/src/lib/backend/para - Implements the bulk wallet pre-generation

## Workflow

```bash
# 0. Create a frontend/.env file by copying the frontend/.env.example and fill in with the correct values

# 1. Start the hardhat node
cd hardhat/
yarn
npx hardhat node

# 2. Start the frontend and database in a separate terminal
cd frontend/
yarn
./start-databse.sh
yarn db:generate
yarn run dev

# 3. Open http://localhost:3000 and create the admin Para account

# 4. Sign in and link you Warpcast account

# 5. Fund the account
npx hardhat fund --to <ACCOUNT_ADDRESS> --network localhost

# 6. Pregenrate wallets and mint NFTs for the recipients
```
