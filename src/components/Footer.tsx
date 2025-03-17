import React from "react";
import MiniContact from "./MiniContact";
import { motion } from "framer-motion";
import { EASING, Y_TRANSFORM } from '../utils/constants';
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <motion.footer
      id="footer"
      className="footer"
      initial={{ opacity: 0, y: Y_TRANSFORM }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASING }}
    >
      <div className="footer-container">
        <motion.div
          className="footer-header"
          initial={{ opacity: 0, y: Y_TRANSFORM }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASING  }}>
          <h2>Get in Touch</h2>
          <p>Let's work together to bring your dream project to life.</p>
        </motion.div>
        <MiniContact />
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: Y_TRANSFORM }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASING  }}
        >
          <motion.div
            initial={{ opacity: 0, y: Y_TRANSFORM }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Atlanta, GA 
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: Y_TRANSFORM}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >© 2025 Vision Studios | All Rights Reserved
          </motion.p>
          
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
