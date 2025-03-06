import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Para as ParaServer, Environment } from "@getpara/server-sdk";
// import { verifyWarpcastSignature } from "~/clients/para";

const paraServer = new ParaServer(
  Environment.BETA,
  process.env.NEXT_PUBLIC_PARA_API_KEY,
);

export const userrRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ fid: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          fid: input.fid,
        },
      });

      return user;
    }),

  createUser: publicProcedure
    .input(
      z.object({
        fid: z.string().optional(),
        username: z.string(),
        did: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          username: input.username,
          did: input.did,
          fid: input.fid,
        },
      });
      return user;
    }),

  createGiveaways: publicProcedure.mutation(async ({ ctx }) => {
    const post = await ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
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
      // const { isValid, fid } = await verifyWarpcastSignature({
      //   nonce: input.nonce,
      //   domain: input.domain,
      //   message: input.message,
      //   signature: input.signature as `0x${string}`,
      // });
      // if (!isValid) {
      //   return false;
      // }
      // const share = await ctx.db.user.findFirst({
      //   where: {
      //     fid,
      //   },
      // });
      // return share?.userShare;
    }),
});
