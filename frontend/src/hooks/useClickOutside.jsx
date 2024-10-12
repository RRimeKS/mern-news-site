import { useEffect, useRef } from "react";

export default function useClickOutside(callback) {
  const ref = useRef();

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [ref]);

  return ref;
}
