// app/apps/stellar/page.tsx
import { Suspense } from "react";
import StellarLayout from "./components/StellarLayout";
import Loading from "./loading";

export default function StellarPage() {
  return (
    <Suspense fallback={<Loading />}>
      <StellarLayout />
    </Suspense>
  );
}
