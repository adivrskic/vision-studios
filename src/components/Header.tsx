import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, Y_TRANSFORM } from "../utils/constants";
import { useTheme } from '../context/ThemeContext'; // Adjust the import path
import {
  IoRadioOutline,
  IoRadioButtonOffOutline,
  IoMenuOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoStar
} from "react-icons/io5";
import "./Header.scss";

const Header = ({ onMenuToggle, hasLoadedOnce, onWaveToggle }) => {
  const [waveOn, setWaveOn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showStarCounter, setShowStarCounter] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // This would be replaced with your actual state management
  const [starCount, setStarCount] = useState(0);
  const totalStars = 3;
  const handleWaveToggle = () => {
    const newWaveState = !waveOn;
    setWaveOn(newWaveState);
  
    const svgElement = document.getElementById("wave-animation");
  
    if (svgElement) {
      if (newWaveState) {
        svgElement.unpauseAnimations(); // Resume animation
      } else {
        svgElement.pauseAnimations(); // Pause animation
      }
    }
  
    onWaveToggle(newWaveState);
  };
  

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme(newTheme);
  };

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".page-container");
    scrollContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Show star counter when logo is hovered
  useEffect(() => {
    if (logoHovered) {
      setShowStarCounter(true);
    }
  }, [logoHovered]);
  
  // Hide star counter when header is no longer hovered and logo is not hovered
  useEffect(() => {
    if (!isHovered && !logoHovered) {
      setShowStarCounter(false);
    }
  }, [isHovered, logoHovered]);

  

  return (
    <motion.div
      className="header"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: window?.innerWidth < 960 ? 1 : 0.3, scale: 1 }}
      transition={{ delay: hasLoadedOnce ? 1 : 3.5, duration: 2, ease: EASING }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="logo-container" style={{ position: "relative" }}>
        <motion.span 
          className="header-logo" 
          onClick={() => scrollToTop()}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{ cursor: "pointer" }}
        >
          V
        </motion.span>
        
        {/* Star counter positioned to the lower right of the logo */}

      </div>

      <motion.div className="header-buttons">
        <IoMenuOutline onClick={onMenuToggle} />

        {/* Wave Toggle (Appears with opacity + y transform on hover) */}
        <motion.div
          className="wave-toggle"
          onClick={handleWaveToggle}
          variants={{
            hidden: { opacity: 0, y: Y_TRANSFORM },
            hover: { opacity: 1, y: 0 },
          }}
          animate={isHovered ? "hover" : "hidden"}
          transition={{ duration: 0.2, ease: EASING }}
        >
<svg 
  id="wave-animation"
  width="30" 
  height="30" 
  viewBox="0 0 30 30" 
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <path 
      id="sign-wave" 
      stroke={theme === "dark" ? "#fff" : "#333"} 
      fill="none" 
      strokeWidth="2" 
      d="M0 15 C 7.5 5, 12 5, 22.5 15 C 30 25, 37.5 25, 45 15" 
    />
  </defs>

  <g>
    <use href="#sign-wave" />
    <use href="#sign-wave" x="45" />

    {waveOn && (
      <animateTransform 
        attributeName="transform" 
        type="translate" 
        from="0 0" 
        to="-45 0" 
        dur="5s" 
        repeatCount="indefinite"
      />
    )}
  </g>
</svg>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          className="theme-toggle"
          onClick={handleThemeToggle}
          variants={{
            hidden: { opacity: 0, y: Y_TRANSFORM },
            hover: { opacity: 1, y: 0 },
          }}
          animate={isHovered ? "hover" : "hidden"}
          // transition={{ delay: 0.1, duration: 0.2, ease: EASING }}
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: EASING }}
              >
                <IoSunnyOutline />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: EASING }}
              >
                <IoMoonOutline />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Header;