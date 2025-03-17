import { motion } from "framer-motion";
import { SLIDE_UP_ANIMATION, MINI_SERVICES } from '../utils/constants';
import "./MiniServices.scss";

const MiniServices = () => {
  return (
    <motion.div
      className="mini-services"
    >
      {MINI_SERVICES?.map((service, index) => {
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
