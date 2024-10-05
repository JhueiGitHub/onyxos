"use client";

import { useState } from "react";
import Dock from "./Dock";
import Window from "./Window";

const Desktop: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);

  const openApp = (appName: string) => {
    if (!openApps.includes(appName)) {
      setOpenApps([...openApps, appName]);
    }
  };

  const closeApp = (appName: string) => {
    setOpenApps(openApps.filter((app) => app !== appName));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Animated Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/media/BlackWaves.mp4" type="video/mp4" />
      </video>

      {/* App Windows */}
      {openApps.map((appName) => (
        <Window
          key={appName}
          appName={appName}
          onClose={() => closeApp(appName)}
        />
      ))}

      {/* Dock */}
      <Dock openApp={openApp} />
    </div>
  );
};

export default Desktop;
