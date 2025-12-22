// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Chỉ chạy 1 lần
          }
        });
      },
      { threshold: 0.1 } // Kích hoạt khi thấy 10% phần tử
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return elementRef;
};