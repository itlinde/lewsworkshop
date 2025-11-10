import { useEffect, useRef } from "react";

// custom hook so clicking out of the bead menu closes it 
function useClickOutside(onOutside, enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (e) => {
      const el = ref.current;
      if (el && !el.contains(e.target)) {
        onOutside?.(e);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return (() => document.removeEventListener("pointerdown", handlePointerDown));
  }, [onOutside, enabled]);

return ref;
}

export default useClickOutside;