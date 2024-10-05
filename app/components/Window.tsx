import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

interface WindowProps {
  appId: string;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ appId, onClose }) => {
  const [AppComponent, setAppComponent] = useState<React.ComponentType | null>(
    null
  );

  useEffect(() => {
    const loadApp = async () => {
      try {
        const module = await import(`../apps/${appId}/App`);
        setAppComponent(() => module.default);
      } catch (error) {
        console.error(`Failed to load app: ${appId}`, error);
      }
    };

    loadApp();
  }, [appId]);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="mockup-window border border-[#292929] bg-[#010203] bg-opacity-69 w-[800px] h-[600px]">
        <div className="absolute top-0 left-0 flex gap-2 p-4">
          <button
            className="w-3 h-3 rounded-full bg-[#FF5F57]"
            onClick={onClose}
          />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="p-4 mt-8">
          {AppComponent ? <AppComponent /> : <div>Loading app...</div>}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
