// components/Window.tsx
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import useGenieEffect from "@/hooks/useGenieEffect";
import useOrigin from "@/hooks/useOrigin";
import { Origin } from "@/types";

interface WindowProps {
  appName: string;
  onClose: () => void;
  origin: Origin;
}

export default function Window({ appName, onClose, origin }: WindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const { genieStyles, playGenieAnimation } = useGenieEffect(origin);

  const DynamicApp = dynamic(() => import(`@/app/apps/${appName}/App`), {
    loading: () => <p>Loading...</p>,
  });

  useEffect(() => {
    playGenieAnimation();
  }, []);

  const handleClose = () => {
    playGenieAnimation(true).then(onClose);
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute top-0 left-0 w-full h-full bg-white rounded-lg overflow-hidden shadow-lg"
      style={{
        ...genieStyles,
        originX: origin.x,
        originY: origin.y,
      }}
    >
      <div className="h-8 bg-gray-200 flex items-center px-2">
        <div className="flex space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500"
            onClick={handleClose}
          ></button>
          <button className="w-3 h-3 rounded-full bg-yellow-500"></button>
          <button
            className="w-3 h-3 rounded-full bg-green-500"
            onClick={() => setIsFullscreen(!isFullscreen)}
          ></button>
        </div>
        <div className="flex-grow text-center text-sm font-medium">
          {appName}
        </div>
      </div>
      <div className="h-[calc(100%-2rem)] overflow-auto">
        <DynamicApp />
      </div>
    </motion.div>
  );
}
