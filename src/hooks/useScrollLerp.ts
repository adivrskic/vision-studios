// src/hooks/useScrollLerp.ts
import { useEffect } from 'react';
import { gsap } from 'gsap';

const useScrollLerp = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    sections.forEach((section: Element) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        }
      });
    });
  }, []);
};

export default useScrollLerp;
