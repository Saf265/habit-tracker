import { prisma } from "@/lib/db";

export const addUserToDatabase = async (
  clerkUserId: string,
  name: string,
  email: string,
  image: string
) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        clerkUserId,
      },
      update: {
        name,
        email,
        image,
      },
      create: {
        clerkUserId,
        name,
        email,
        image,
      },
    });

    return user;
  } catch (err) {
    console.log(`Error`, err);
    throw Error;
  }
};
