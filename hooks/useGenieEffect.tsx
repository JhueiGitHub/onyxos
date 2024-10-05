// hooks/useGenieEffect.ts
import { useSpring, useTransform, MotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Origin {
  x: number;
  y: number;
}

export default function useGenieEffect(origin: Origin) {
  const scale = useSpring(0, { stiffness: 300, damping: 30 });
  const opacity = useTransform(scale, [0, 1], [0, 1]);

  const [isClosing, setIsClosing] = useState(false);

  const genieStyles = {
    scale,
    opacity,
  };

  const playGenieAnimation = (reverse: boolean = false) => {
    return new Promise<void>((resolve) => {
      setIsClosing(reverse);
      const duration = 0.5;

      if (reverse) {
        scale.set(1);
      }

      scale.set(reverse ? 0 : 1);
      scale.onChange(() => {
        if (scale.get() === (reverse ? 0 : 1)) {
          setIsClosing(false);
          resolve();
        }
      });
    });
  };

  useEffect(() => {
    if (!isClosing) {
      scale.set(0);
    }
  }, [isClosing, scale]);

  return { genieStyles, playGenieAnimation };
}