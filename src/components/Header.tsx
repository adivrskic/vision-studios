import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, Y_TRANSFORM } from "../utils/constants";
import { useTheme } from '../context/ThemeContext'; // Adjust the import path
import {
  IoRadioOutline,
  IoRadioButtonOffOutline,
  IoMenuOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import "./Header.scss";

const Header = ({ onMenuToggle, hasLoadedOnce, onWaveToggle }) => {
  const [waveOn, setWaveOn] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleWaveToggle = () => {
    const newWaveState = !waveOn;
    setWaveOn(newWaveState);
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

  return (
    <motion.div
      className="header"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ delay: hasLoadedOnce ? 1 : 3.5, duration: 2, ease: EASING }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span 
        className="header-logo" 
        onClick={() => scrollToTop()}
        style={{ cursor: "pointer" }}
      >
        V
      </span>

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
          <AnimatePresence mode="wait">
            {waveOn ? (
              <motion.div
                key="wave-on"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: EASING }}
              >
                <IoRadioOutline />
              </motion.div>
            ) : (
              <motion.div
                key="wave-off"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
                transition={{ duration: 0.2, ease: EASING }}
              >
                <IoRadioButtonOffOutline />
              </motion.div>
            )}
          </AnimatePresence>
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
          transition={{ delay: 0.1, duration: 0.2, ease: EASING }}
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
