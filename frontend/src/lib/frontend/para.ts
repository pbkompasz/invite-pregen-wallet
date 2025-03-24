import Para, { Environment, WalletType } from "@getpara/react-sdk";
import { ParaEthersSigner } from "@getpara/ethers-v6-integration";
import { ethers, TransactionRequest } from "ethers";

const para = new Para(Environment.BETA, process.env.NEXT_PUBLIC_PARA_API_KEY);

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
const ethersSigner = new ParaEthersSigner(para, provider);

const CONTRACT_ADDRESS = "0xF60A37338f0F6283C4110956e460872E73457A91";
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address[]",
        name: "recipients",
        type: "address[]",
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

export const mintNFTs = async (addresses: string[]) => {
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    ethersSigner,
  );

  if (!contract) return;

  // @ts-expect-error
  const tx = await contract.giveaway(addresses);
  await tx.wait();
  return tx.hash
};

export default para;
