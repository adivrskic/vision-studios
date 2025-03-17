import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASING, SLIDE_UP_ANIMATION, Y_TRANSFORM } from '../utils/constants';
import { IoCloseCircleOutline } from "react-icons/io5";
import "./Menu.scss";
import MiniContact from "./MiniContact";
import MiniServices from "./MiniServices";
import MiniAbout from "./MiniAbout";
import { ContactModel } from "./3dModels";

const fadeInUp = {
  hidden: { opacity: 0, y: Y_TRANSFORM },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } },
  exit: { opacity: 0, y: Y_TRANSFORM, transition: { duration: 0.4, ease: EASING } },
};

const scaleInFade = {
  hidden: { opacity: 0, },
  visible: { opacity: 1, scale: 1, transition: { duration: 5, ease: EASING } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: EASING } },
};

const Menu = ({ onClose }) => {
  const [activeMenu, setActiveMenu] = useState("contact");
  const [showModel, setShowModel] = useState(false);
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setShowModel(true), 1500); // Slight delay to allow UI to load first
    return () => clearTimeout(timeout);
  }, []);

  const handleCompletionUpdate = (percentage) => {
    setCompletion(percentage);
  };

  const renderActiveComponent = () => {
    switch (activeMenu) {
      case "about":
        return <MiniAbout />;
      case "contact":
        return <MiniContact onCompletionUpdate={handleCompletionUpdate} />;
      case "services":
        return <MiniServices />;
      default:
        return <MiniContact onCompletionUpdate={handleCompletionUpdate} />;
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeInUp} className="menu-container">
      <IoCloseCircleOutline className="menu-close" onClick={onClose} />
      <div className="menu">
        <div className="menu-content">
          <div className="menu-header-container">
            <h1 className="menu__header">Vision<span>Studios</span></h1>
            <p className="menu__subheader">
              Innovative web solutions, AI integrations, and seamless user experiences.
            </p>
            <nav className="menu-options">
              <button onClick={() => setActiveMenu("about")} className={activeMenu === "about" ? "selected" : ""}>
                About
              </button>
              <button onClick={() => setActiveMenu("contact")} className={activeMenu === "contact" ? "selected" : ""}>
                Contact
              </button>
              <button onClick={() => setActiveMenu("services")} className={activeMenu === "services" ? "selected" : ""}>
                Services
              </button>
            </nav>

          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeMenu} initial="hidden" animate="visible" exit="exit" variants={fadeInUp}>
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className="particle-scene-container"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={scaleInFade}
          layout
        >
          {showModel && 
            <ContactModel completion={completion} />
          }
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Menu;
