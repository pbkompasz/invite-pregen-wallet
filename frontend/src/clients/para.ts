import Para, { Environment, WalletType } from "@getpara/react-sdk";
import { WarpcastProfile } from "~/app/_components/admin";
import { createAppClient, viemConnector } from "@farcaster/auth-client";
import { ParaEthersSigner } from "@getpara/ethers-v6-integration";
import { ethers, TransactionRequest } from "ethers";

const para = new Para(Environment.BETA, process.env.NEXT_PUBLIC_PARA_API_KEY);

const provider = new ethers.JsonRpcProvider(
  "https://ethereum-sepolia-rpc.publicnode.com/",
);
// @ts-expect-error Types
const ethersSigner = new ParaEthersSigner(para, provider);

const CONTRACT_ADDRESS = "0xF60A37338f0F6283C4110956e460872E73457A91";
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "giveaway",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const pregenerateWallets = async (followers: WarpcastProfile[]) => {
  const hasWallets = await Promise.all(
    followers.map(async (follower) => {
      return await para.hasPregenWallet({
        pregenIdentifier: String(follower.fid),
        pregenIdentifierType: "CUSTOM_ID",
      });
    }),
  );

  const resp = await Promise.all(
    followers.map(async (follower, index) => {
      const { fid } = follower;
      if (hasWallets[index]) {
        console.log(
          `${follower.displayName ?? follower.profile.username} already has pregenrated wallet`,
        );
        return false;
      }
      return {
        wallet: await para.createPregenWallet({
          type: WalletType.EVM,
          pregenIdentifier: String(fid),
          pregenIdentifierType: "CUSTOM_ID",
        }),
        // userShare: await para.getUserShare(),
        fid,
      };
    }),
  );
  // .filter((f) => !!f),
  console.log(resp);
  const wallets = await para.getPregenWallets();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    ethersSigner,
  );

  await Promise.all(
    wallets.map(async (wallet) => {
      // Mint Giveaway NFT
      // @ts-ignore
      const signedTx = await contract.giveaway(wallet.address);
    }),
  );
  // TODO User share

  // Create user w/ walletShare
};

const appClient = createAppClient({
  relay: "https://relay.farcaster.xyz",
  ethereum: viemConnector(),
});

export const verifyWarpcastSignature = async (warpcastParams: {
  nonce: string;
  domain: string;
  message: string;
  signature: `0x${string}`;
}) => {
  const { nonce, domain, message, signature } = warpcastParams;
  // Verify SIWE signature
  const resp = await appClient.verifySignInMessage({
    nonce,
    domain,
    message,
    signature,
  });
  if (!resp.success || resp.isError) {
    console.log("Error verifying SIWE signature");
    return {
      isValid: false,
      fid: "",
    };
  }
  const regex = /fid\/(\d+)|Issued At:\s([0-9T:.Z-]+)/g;
  let match, fid, expiresAt;
  while ((match = regex.exec(message)) !== null) {
    if (match[1]) {
      console.log("FID:", match[1]);
      fid = match[1];
    }
    if (match[2]) {
      console.log("Issued At:", match[2]);
      expiresAt = match[2];
    }
  }
  if (expiresAt && new Date() > new Date(expiresAt)) {
    return {
      isValid: false,
      fid: String(fid),
    };
  }
  return {
    isValid: true,
    fid: String(fid),
  };
};

export default para;
