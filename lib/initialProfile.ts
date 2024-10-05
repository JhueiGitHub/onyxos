// lib/initialProfile.ts

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.user.create({
    data: {
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      folders: {
        create: [
          {
            name: "Desktop",
            path: "/Desktop",
          },
          {
            name: "Documents",
            path: "/Documents",
          },
          {
            name: "Downloads",
            path: "/Downloads",
          },
        ],
      },
    },
  });

  return newProfile;
};
