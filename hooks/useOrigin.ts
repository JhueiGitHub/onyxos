// hooks/useOrigin.ts
import { useState, useCallback } from "react";

interface Origin {
  x: number;
  y: number;
}

export default function useOrigin() {
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });

  const updateOrigin = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    setOrigin({
      x: clientX / innerWidth,
      y: clientY / innerHeight,
    });
  }, []);

  return { origin, updateOrigin };
}
