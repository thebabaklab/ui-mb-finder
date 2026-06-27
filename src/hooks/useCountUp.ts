import { useEffect, useState } from "react";

export const useCountUp = (end: number, duration = 2000) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.floor(progress * end);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, duration]);

  return value.toLocaleString();
};
