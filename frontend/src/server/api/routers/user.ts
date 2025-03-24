import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Para as ParaServer, Environment } from "@getpara/server-sdk";
import { verifyWarpcastSignature } from "~/lib/backend/warpcast";

const paraServer = new ParaServer(
  Environment.BETA,
  process.env.NEXT_PUBLIC_PARA_API_KEY,
);

export const userrRouter = createTRPCRouter({
  get: publicProcedure.input(z.number())
  .query(async ({ ctx, input}) => {
    const user = await ctx.db.user.findFirst({
      where: {
        fid: input,
      },
    })

    return user;
  }),


  claimWallet: publicProcedure
    .input(
      z.object({
        nonce: z.string(),
        domain: z.string(),
        message: z.string(),
        signature: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { isValid, fid } = await verifyWarpcastSignature({
        nonce: input.nonce,
        domain: input.domain,
        message: input.message,
        signature: input.signature as `0x${string}`,
      });
      if (!isValid) {
        return false;
      }
      const share = await ctx.db.user.findFirst({
        where: {
          fid,
        },
      });
      return share?.userShare;
    }),
});
