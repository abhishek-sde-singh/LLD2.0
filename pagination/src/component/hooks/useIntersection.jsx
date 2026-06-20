import { useState, useRef, useEffect } from "react";

const useIntersection = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default useIntersection;
