import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkOutline, IoTimerOutline } from "react-icons/io5";
import { services, EASING, Y_TRANSFORM } from '../utils/constants';
import "./Services.scss";

const Services: React.FC = () => {
  return (
    <div id="services" className="services-container">
      <div className="services-header">
        <h2 className="text-4xl font-bold text-center mb-8">Our Services</h2>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Premium web solutions, combining cutting-edge technology, creativity, and performance-driven strategies.
        </p>
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 1,
              delay: 2
            },
          },
        }}
      >
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </motion.div>
    </div>
  );
};


const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="service-card p-6 bg-white shadow-lg rounded-lg relative overflow-hidden"
      initial={{ opacity: 0, y: Y_TRANSFORM }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: EASING }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {service.badge && (
        <div className="service-card__badge">
          <div className="service-card__badge-icon">{service.badgeIcon()}</div> 
          <span>{service.badge}</span>
        </div>
      )}
      
      <h3 className="service-card__header mb-3">{service.title}</h3>
      <p className="service-card__description mb-4">{service.description}</p>
      
      <div className="service-card__timeframe">
        <IoTimerOutline className="mr-1" />
        <span>{service.timeframe}</span>
      </div>

      <div className="border-t border-b border-gray-100 py-4 mb-4">
        <ul className="mb-2 space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">
              <IoCheckmarkOutline className="text-green-600 flex-shrink-0" /> {feature}
            </li>
          ))}
        </ul>
      </div>


      <motion.button 
        className="button"
        // whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: "smooth" })}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
};

export default Services;
