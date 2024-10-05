"use client";

import { useState } from "react";
import Dock from "./Dock";
import Window from "./Window";

const Desktop = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);

  const openApp = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((app) => app !== appId));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source src="/media/BlackWaves.mp4" type="video/mp4" />
      </video>

      {/* Open Windows */}
      {openApps.map((appId) => (
        <Window key={appId} appId={appId} onClose={() => closeApp(appId)} />
      ))}

      {/* Dock */}
      <Dock openApp={openApp} />
    </div>
  );
};

export default Desktop;
