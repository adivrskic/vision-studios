import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from '../utils/constants';
import "./MiniAbout.scss";;

const MiniAbout = () => {
  const paragraphs = [
    "Vision Studios is a forward-thinking creative development agency specializing in cutting-edge web solutions, AI-driven integrations, and immersive digital experiences.",
    "We merge technology and design to build seamless, high-performance platforms that empower modern businesses and creators. Our team is dedicated to crafting bespoke solutions that elevate brands, enhance user interactions, and push the boundaries of digital innovation.",
    "At Vision Studios, we believe in the power of creativity and technology to shape the future. Our mission is to transform ideas into reality—blending technical expertise with artistic vision to create digital experiences that are not only functional but truly unforgettable.",
  ];

  return (
    <div className="mini-about">
      {paragraphs.map((text, i) => (
        <motion.p key={i} custom={i} initial="hidden" animate="visible" variants={SLIDE_UP_ANIMATION}>
          {text}
        </motion.p>
      ))}
    </div>
  );
};

export default MiniAbout;
