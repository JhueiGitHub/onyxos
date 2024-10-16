import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return profile;
};
