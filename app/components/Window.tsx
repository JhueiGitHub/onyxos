import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import useGenieEffect from "../../hooks/useGenieEffect";
import useOrigin from "../../hooks/useOrigin";

interface WindowProps {
  appName: string;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ appName, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);

  const { setOrigin } = useOrigin();
  const { genieEffect, isAnimating } = useGenieEffect();

  useEffect(() => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setOrigin({ x: rect.left, y: rect.top });
    }
  }, [setOrigin]);

  const handleClose = () => {
    genieEffect(windowRef.current, () => {
      onClose();
    });
  };

  return (
    <motion.div
      ref={windowRef}
      className="absolute top-0 left-0 w-full h-full bg-white rounded-lg overflow-hidden shadow-lg"
      style={{
        originX,
        originY,
        display: isAnimating ? "block" : "flex",
        flexDirection: "column",
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      {/* Window Top Bar */}
      <div className="h-8 bg-gray-200 flex items-center px-2">
        <div className="flex space-x-2">
          <button
            className="w-3 h-3 rounded-full bg-red-500"
            onClick={handleClose}
          />
          <button className="w-3 h-3 rounded-full bg-yellow-500" />
          <button
            className="w-3 h-3 rounded-full bg-green-500"
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>
        <div className="flex-grow text-center text-sm font-medium">
          {appName}
        </div>
      </div>

      {/* App Content */}
      <div className="flex-grow overflow-auto">
        <iframe
          src={`../apps/${appName}`}
          className="w-full h-full border-none"
          title={appName}
        />
      </div>
    </motion.div>
  );
};

export default Window;
