import { useState } from "react";
import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION } from '../utils/constants';
import "./MiniServices.scss";

const MiniServices = () => {

  const services = [
    { 
      title: "AI Integrations", 
      description: [
        "Automate tasks with AI.",
        "Gain actionable insights.",
        "Enhance personalization.",
      ],
    },
    { 
      title: "Custom Development", 
      description: [
        "Robust web applications.",
        "Scalable and maintainable codebase.",
        "Seamless user interactions.",
      ],
    },
    { 
      title: "E-commerce Solutions", 
      description: [
        "Automate tasks with AI.",
        "Gain actionable insights.",
        "Enhance personalization.",
      ],
    },
    { 
      title: "SEO Optimization", 
      description: [
        "Higher search rankings.",
        "Faster website performance.",
        "Enhanced user engagement.",
      ],
    },
    { 
      title: "Web Design", 
      description: [
        "Visually stunning, responsive designs.",
        "Tailored to your brand identity.",
        "Optimized for modern user experience.",
      ],
    },
  ];

  return (
    <motion.div
      className="mini-services"
    >
      {services.map((service, index) => {
        return (
          <motion.div
            key={index}
            custom={index}
            className="service-item"
            variants={SLIDE_UP_ANIMATION}
          >
            <motion.span>
              {service.title}
            </motion.span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MiniServices;
