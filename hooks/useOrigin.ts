import { useState, useCallback } from "react";

interface Origin {
  x: number;
  y: number;
}

const useOrigin = () => {
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });

  const setOriginFromEvent = useCallback((event: React.MouseEvent) => {
    setOrigin({ x: event.clientX, y: event.clientY });
  }, []);

  return { origin, setOrigin, setOriginFromEvent };
};

export default useOrigin;
