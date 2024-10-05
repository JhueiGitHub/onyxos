import { useCallback } from "react";
import { animate, useMotionValue, MotionValue } from "framer-motion";

const useGenieEffect = () => {
  const scale = useMotionValue(1);
  const y = useMotionValue(0);

  const animateIcon = useCallback(
    (ref: React.RefObject<HTMLElement>, onComplete: () => void) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const startY = rect.top + rect.height / 2;
      const endY = window.innerHeight - 50; // Adjust based on your dock position

      const animation = animate(y, [0, endY - startY, 0], {
        duration: 0.5,
        onUpdate: (latest) => {
          if (element) {
            element.style.transform = `translateY(${latest}px) scale(${scale.get()})`;
          }
        },
      });

      const scaleAnimation = animate(scale, [1, 0.5, 1], {
        duration: 0.5,
      });

      Promise.all([animation, scaleAnimation]).then(() => {
        onComplete();
      });
    },
    [scale, y]
  );

  return { animateIcon };
};

export default useGenieEffect;
