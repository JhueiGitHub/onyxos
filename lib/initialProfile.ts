// lib/initialProfile.ts

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

export const initialProfile = async () => {
  const user = await currentUser();
  console.log("Current user:", user);

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });
  console.log("Existing profile:", profile);

  if (profile) {
    return profile;
  }

  console.log("Creating new profile...");
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
  console.log("New profile created:", newProfile);

  return newProfile;
};
