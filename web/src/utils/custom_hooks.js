import { useRef, useEffect } from "react";

export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return function cleanupSetIsMounted() {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useUpdateEffect = (
  effect,
  dependencies = [],
  effectCleanupFunc = function noop() {}
) => {
  const isMounted = useIsMounted();
  const isInitialMount = useRef(false);

  useEffect(() => {
    if (isInitialMount.current) {
      effect();
    } else {
      isInitialMount.current = true;
    }
    return () => {
      effectCleanupFunc();
      if (!isMounted.current) {
        isInitialMount.current = false;
      }
    };
  }, dependencies);
};
