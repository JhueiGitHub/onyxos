import { useCallback, useState } from "react";
import { animate, useMotionValue } from "framer-motion";

const useGenieEffect = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scale = useMotionValue(1);

  const genieEffect = useCallback(
    (element: HTMLElement | null, onComplete: () => void) => {
      if (!element) return;

      setIsAnimating(true);

      const rect = element.getBoundingClientRect();
      const elementAspectRatio = rect.width / rect.height;

      animate(scale, 0, {
        duration: 0.5,
        onUpdate: (latest) => {
          if (element) {
            element.style.width = `${rect.width * latest}px`;
            element.style.height = `${
              (rect.width * latest) / elementAspectRatio
            }px`;
          }
        },
        onComplete: () => {
          setIsAnimating(false);
          onComplete();
        },
      });
    },
    [scale]
  );

  return { genieEffect, isAnimating };
};

export default useGenieEffect;
