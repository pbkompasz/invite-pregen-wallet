import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Para as ParaServer, Environment } from "@getpara/server-sdk";

const paraServer = new ParaServer(
  Environment.BETA,
  process.env.NEXT_PUBLIC_PARA_API_KEY,
);

export const adminRouter = createTRPCRouter({
  addFollower: publicProcedure
    .input(z.object({ phoneNumber: z.string().min(1), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          username: input.name,
        },
      });
      return user.id;
    }),

  addAdmin: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
        userShare: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.create({
        data: {
          phoneNumber: input.phoneNumber,
          userId: input.userId,
          email: input.email,
          userShare: input.userShare,
          address: input.address,
        },
      });
      return admin.id;
    }),

  getFollowers: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  saveFollowerWallets: publicProcedure
    .input(
      z.object({ id: z.number(), walletId: z.string(), userShare: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      // const post = await ctx.db.user.update({
      //   where: { id: input.id },
      //   data: { walletId: input.walletId, userShare: input.userShare },
      // });
      // return post ?? null;
    }),
});
