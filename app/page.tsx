// app/page.tsx
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import Desktop from "./components/Desktop";

const SetupPage = async () => {
  const profile = await initialProfile();

  return <Desktop />;
};

export default SetupPage;
