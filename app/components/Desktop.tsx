// components/Desktop.tsx
"use client";

import { useState } from "react";
import Dock from "./Dock";
import Window from "./Window";
import useOrigin from "@/hooks/useOrigin";

export default function Desktop() {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const { origin, updateOrigin } = useOrigin();

  const handleOpenApp = (appName: string, event: React.MouseEvent) => {
    if (!openApps.includes(appName)) {
      updateOrigin(event.nativeEvent);
      setOpenApps([...openApps, appName]);
    }
  };

  const handleCloseApp = (appName: string) => {
    setOpenApps(openApps.filter((app) => app !== appName));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/media/BlackWaves.mp4" type="video/mp4" />
      </video>

      {/* App windows */}
      {openApps.map((appName) => (
        <Window
          key={appName}
          appName={appName}
          onClose={() => handleCloseApp(appName)}
          origin={origin}
        />
      ))}

      {/* Dock */}
      <Dock onOpenApp={handleOpenApp} />
    </div>
  );
}
