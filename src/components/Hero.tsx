import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import LoadingBar from "./LoadingBar";
import { EASING } from "../utils/constants";
import "./Hero.scss";

const Hero = ({ hasLoadedOnce, setProgress, setIsButtonHovered }: { hasLoadedOnce: boolean, setProgress: (value: number) => void }) => {
  const [isLoading, setIsLoading] = useState(!hasLoadedOnce);
  const progressRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!hasLoadedOnce) {
      setTimeout(() => setIsLoading(false), 2500);
    }
  }, [hasLoadedOnce]);


  const handleButtonPress = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleButtonRelease = () => {
    if (progressRef?.current < 100) {
      progressRef.current = 0;
      setProgress(0);
    }

    if (intervalRef?.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="hero">
      {isLoading ? (
        <LoadingBar />
      ) : (
        <>
          <motion.h1
            className="hero-header"
            initial={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 1.6 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)", scale: 1 }}
            transition={{ delay: 0.25, duration: 2.5, ease: EASING }}
          >
            Vision<span>Studios</span>
          </motion.h1>
          <motion.p
            className="hero-subheader"
            initial={{ opacity: 0, y: 20, filter: "blur(9px)", scale: 1.6 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)", scale: 1 }}
            transition={{ delay: 0.25, duration: 2.5, ease: EASING }}
          >
            A web design studio crafting cutting-edge digital experiences that redefine creativity, interactivity, and innovation.
          </motion.p>
          <motion.div
            className="hero-button-container"
            initial={{ opacity: 0, y: "-50%", x: "-50%", scale: 1.2  }}
            animate={{ opacity: 1, y: "-50%", x: "-50%", scale: 1 }}
            transition={{ delay: 1, duration: 2, ease: EASING }}
          >
            <button
              className="button button--alt"
              onMouseDown={handleButtonPress}
              onMouseUp={handleButtonRelease}
              onTouchStart={handleButtonPress}
              onTouchEnd={handleButtonRelease}
              // onMouseEnter={() => setIsButtonHovered(true)} // Notify App.tsx
              // onMouseLeave={() => setIsButtonHovered(false)} // Reset hover state
            >
              Browse Our Services
            </button>
            <span>Or Scroll Down</span>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Hero;
