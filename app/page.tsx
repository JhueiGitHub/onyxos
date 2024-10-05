import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { initialProfile } from "@/lib/initialProfile";
import Desktop from "@os/components/Desktop";

const prisma = new PrismaClient();

export default async function SetupPage() {
  const profile = await initialProfile();

  if (!profile) {
    return redirect("/setup");
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Desktop />
    </main>
  );
}
