import { useEffect, useRef } from "react";

export function useMeasurePosition(update: (pos: any) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(ref.current) {
      update({
        height: ref.current.offsetHeight,
        top: ref.current.offsetTop
      });
    }
  });

  return ref;
}
