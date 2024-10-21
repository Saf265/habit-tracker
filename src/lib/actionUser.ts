"use server";

import { prisma } from "./db";

export const getUser = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: clerkUserId,
    },
  });

  return user;
};
