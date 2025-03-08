import { motion } from "framer-motion";
import { EASING } from '../utils/constants';
import { useTheme } from '../context/ThemeContext'; // Adjust the import path
import './LoadingBar.scss';

const LoadingBar = () => {
  const { theme } = useTheme();

  return (
    <div className={`loading-bar-container ${theme === 'light' ? 'light' : 'dark'}`}>
      <div className="loading-bar">
        <motion.div
          className="loading"
          initial={{ width: 0 }}
          animate={{ width: `100%` }}
          transition={{ duration: 2, ease: EASING }}
        />
      </div>
    </div>
  );
};

export default LoadingBar;
