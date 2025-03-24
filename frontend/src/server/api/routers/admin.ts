import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pregenerateWallets } from "~/lib/backend/para";
import { encryptUserShare } from "~/lib/backend/encryption";

export const adminRouter = createTRPCRouter({
  pregenerateWallets: publicProcedure
    .input(z.array(z.any()))
    .mutation(async ({ ctx, input }) => {
      const wallets = await pregenerateWallets(input);

      await Promise.all(
        wallets.map(async (wallet) => {
          if (!wallet.userShare || !wallet.wallet) {
            return;
          }
          const updateOrCraeteData = {
            authStatus: false,
            userShare: encryptUserShare(wallet.userShare),
            walletId: wallet.wallet.id,
          };

          const post = await ctx.db.user.upsert({
            where: { fid: wallet.fid },
            update: updateOrCraeteData,
            create: {
              ...updateOrCraeteData,
              fid: wallet.fid,
            },
          });
        }),
      );
      return wallets.map((wallet) => {
        return {
          address: wallet.wallet ? wallet.wallet.address : undefined,
          fid: wallet.fid,
        };
      });
    }),
});
