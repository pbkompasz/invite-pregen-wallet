import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const giveawayRouter = createTRPCRouter({
  getGiveaways: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const giveaways = await ctx.db.giveaway.findMany({
        where: {
          recipient: input,
        },
      });

      return giveaways ?? [];
    }),

  createGiveaway: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const giveaways = await ctx.db.giveaway.findMany({
        where: {
          recipient: input,
        },
      });

      return giveaways ?? [];
    }),
});
