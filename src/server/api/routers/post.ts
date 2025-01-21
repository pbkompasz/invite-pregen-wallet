import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  addUser: publicProcedure
    .input(z.object({ phoneNumber: z.string().min(1), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          phoneNumber: input.phoneNumber,
        },
      });
    }),

  getUsers: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),
});
