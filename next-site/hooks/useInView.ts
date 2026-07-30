"use client";

import { useEffect, useRef, useState } from "react";

// Lazily flips to true once the target enters the viewport (with rootMargin lead-in), then stops observing.
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView, rootMargin]);

  return { ref, isInView };
}
