import Para, {
  Environment,
  Wallet,
  WalletEntity,
  WalletType,
} from "@getpara/server-sdk";
import { WarpcastProfile } from "./warpcast";

const para = new Para(Environment.BETA, process.env.NEXT_PUBLIC_PARA_API_KEY);

export const pregenerateWallets = async (
  followers: WarpcastProfile[],
): Promise<
  {
    wallet: Wallet | WalletEntity | undefined;
    fid: number;
    userShare: string | null;
  }[]
> => {
  const hasWallets = await Promise.all(
    followers.map(async (follower) => {
      return await para.hasPregenWallet({
        pregenIdentifier: String(follower.fid),
        pregenIdentifierType: "CUSTOM_ID",
      });
    }),
  );

  let resp = await Promise.all(
    followers.map(async (follower, index) => {
      const { fid } = follower;
      if (hasWallets[index]) {
        console.log(
          `${follower.displayName ?? follower.profile.username} already has pregenrated wallet`,
        );
      }
      return {
        wallet: !hasWallets[index]
          ? await para.createPregenWallet({
              type: WalletType.EVM,
              pregenIdentifier: String(fid),
              pregenIdentifierType: "CUSTOM_ID",
            })
          : (
              await para.getPregenWallets({
                pregenIdentifier: String(fid),
                pregenIdentifierType: "CUSTOM_ID",
              })
            )[0],
        fid,
        userShare: await para.getUserShare(),
      };
    }),
  );

  return resp;
};
