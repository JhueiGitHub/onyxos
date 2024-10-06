// app/apps/stellar/App.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StellarLayout from './components/StellarLayout';
import { useStellarStore } from './hooks/useStellarStore';

export default function StellarApp() {
  const router = useRouter();
  const { initializeStore } = useStellarStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return <StellarLayout />;
}