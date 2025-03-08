import React from "react";
import MiniContact from "./MiniContact";
import { CgMail, CgPin } from "react-icons/cg";
import { motion } from "framer-motion";
import { IoMailOutline, IoLocationOutline } from "react-icons/io5";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <motion.footer
      id="footer"
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="footer-container">
        <motion.div
          className="footer-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
          <h2>Get in Touch</h2>
          <p>Let's work together to bring your dream project to life.</p>
        </motion.div>
        <MiniContact />
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Atlanta, GA 
            <IoMailOutline />
            {/* <IoLocationOutline />  */}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >Privacy Policy | © 2024 Vertex Studios | All Rights Reserved
          </motion.p>
          
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
