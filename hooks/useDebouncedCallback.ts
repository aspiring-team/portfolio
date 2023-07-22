import { useCallback, useRef } from "react";

const useDebouncedCallback = (f: (...args: any[]) => void, wait: number) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: any[]) => {
      const later = () => {
        clearTimeout(timeout.current ?? undefined);
        f(...args);
      };

      clearTimeout(timeout.current ?? undefined);
      timeout.current = setTimeout(later, wait);
    },
    [f, wait]
  );
};

export { useDebouncedCallback };
