import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { IoCheckmarkOutline } from "react-icons/io5";
import { EASING, Y_TRANSFORM, BLUR } from '../utils/constants';
import './CTASections.scss';
import ThankYouOverlay from "./ThankyouOverlay";

type CTASection = {
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
};

const ctaSections: CTASection[] = [
  {
    title: "Web Design – Transform Your Online Presence",
    description: "Bring your vision to life with a high-impact, custom-designed website. Optimized for user experience, speed, and conversions.",
    price: "$2500",
    features: ["Custom UI/UX designs", "Mobile-first layouts", "SEO-friendly structure", "Optimized for conversions"],
    buttonText: "Start Your Project",
    customerNeed: `"I'm looking for a <span class="highlight-keyword">high-converting</span> website and I need it to be <span class="highlight-keyword">visually stunning</span> and <span class="highlight-keyword">responsive</span>."`
  },
  {
    title: "AI Modernization – Smarter Sites, Better Engagement",
    description: "Upgrade your website with AI-powered automation, chatbots, and personalization to maximize engagement and retention.",
    price: "Custom Pricing",
    features: ["AI-driven chatbots & automation", "Seamless API & platform integrations", "Boosts user interaction"],
    buttonText: "Get AI Integration",
    customerNeed: `"I'm looking for <span class="highlight-keyword">AI features</span> to <span class="highlight-keyword">automate user interactions</span> and I need them to work <span class="highlight-keyword">seamlessly</span> with my site."`
  },
  {
    title: "Custom Development – Scalable, Future-Ready Solutions",
    description: "Build powerful, high-performance web applications tailored to your business. Designed to scale and evolve with your needs.",
    price: "$5000",
    features: ["Cutting-edge technologies", "Scalable architecture", "Custom API integrations", "Site refactor & performance tuning", "CMS Integration"],
    buttonText: "Build Your Web App",
    customerNeed: `"I'm looking for a <span class="highlight-keyword">custom web app</span> and I need it to be <span class="highlight-keyword">scalable</span> and <span class="highlight-keyword">optimized for growth</span>."`
  },
  {
    title: "E-Commerce Design – Sell More, Grow Faster",
    description: "Launch an optimized online store designed for conversions. Secure payments, intuitive UX, and fast-loading storefronts.",
    price: "$3000",
    features: ["Custom storefronts", "Secure payments", "SEO-optimized product pages", "Performance-focused checkout", "CMS Integration"],
    buttonText: "Launch Your Store",
    customerNeed: `"I'm looking for a <span class="highlight-keyword">high-converting</span> e-commerce site and I need it to <span class="highlight-keyword">drive more sales</span> with an <span class="highlight-keyword">optimized experience</span>."`
  },
];

const fadeZoomVariants = {
  hidden: { opacity: 0, y: -Y_TRANSFORM },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: EASING,
      delay: i * 0.12 + 0.7,
    },
  }),
};

const CTASections: React.FC = ({ onOverlayToggle }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [exitDirection, setExitDirection] = useState<"left" | "right">("left");
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const sectionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  // Initialize refs for each section
  useEffect(() => {
    sectionRefs.current = Array(ctaSections.length)
      .fill(0)
      .map(() => React.createRef<HTMLDivElement>());
  }, []);

  // Add effect to blur the wave container when activeSection changes
  useEffect(() => {
    const waveContainer = document.querySelector('.wave-container') as HTMLElement;
    if (waveContainer) {
      if (activeSection !== null) {
        waveContainer.style.filter = BLUR;
        waveContainer.style.transition = 'filter 1s ease-in-out';
      } else {
        waveContainer.style.filter = BLUR;
        waveContainer.style.transition = 'filter 1s ease-in-out';
      }
    }
    console.log(activeSection);
    onOverlayToggle(activeSection);
  }, [activeSection]);

  const handleActivateSection = (index: number) => {
    // Set exit direction based on screen position (odd sections exit right, even exit left)
    setExitDirection(index % 2 === 0 ? "left" : "right");
    setActiveSection(index);
    setIsReturning(false);
  };

  const handleBackToServices = () => {
    setIsReturning(true);
    setActiveSection(null);
  };

  return (
    <div className="cta-sections">
      {ctaSections.map((cta, index) => {
        const ref = useRef(null);
        const isInView = useInView(ref, { 
          once: false,
          amount: 0.05 
        });
        
        const isActive = activeSection === index;
        const isEven = index % 2 === 0;

        const titleWords = cta.title.split(" ");
        const firstWord = titleWords[0] || "";
        const secondWord = titleWords[1] || "";
        const [, normalText] = cta.title.split(" – ");

        return (
          <motion.section
            ref={ref}
            key={index}
            className={`cta-section cta-section-${index} ${!isEven ? 'cta-section--reverse' : ''}`}
            data-effect={`cta-${index}`}
            style={{ height: "100vh", position: "relative", overflow: "hidden" }}
          >
            <AnimatePresence mode="wait">
              {isActive ? (
                <ThankYouOverlay customerNeed={cta?.customerNeed} selectedService={activeSection} handleBackToServices={handleBackToServices} />
              ) : (
                // Original content
                <motion.div
                  key={`original-content-${index}`}
                  className="cta-content"
                  initial={isReturning ? {} : { opacity: 0, x: exitDirection === "left" ? "100%" : "-100%" }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    transition: { duration: isReturning ? 0 : 0.5, ease: "easeOut" }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.92, 
                    filter: BLUR, 
                    transition: { duration: 1, ease: EASING }
                  }}                  
                >
                  <motion.h2 
                    className="cta-header" 
                    custom={1}
                    variants={fadeZoomVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <span className="cta-highlight">
                      <span className="cta-bold">{firstWord}</span>
                      <span className="cta-light">{secondWord}</span>
                    </span>
                    <br /> {normalText}
                  </motion.h2>
                  <motion.p 
                    className="cta-subheader" 
                    custom={2}
                    variants={fadeZoomVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    {cta.description}
                  </motion.p>
                  <motion.ul className="cta-list">
                    {cta.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        custom={i + 3}
                        variants={fadeZoomVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      >
                        <IoCheckmarkOutline /><span>{feature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.button
                    className="button"
                    custom={cta.features.length + 3}
                    variants={fadeZoomVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: (cta.features.length + 1) * 0.2 + 1.1 }}
                    onClick={() => handleActivateSection(index)}
                  >
                    {cta.buttonText}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        );
      })}
    </div>
  );
};

export default CTASections;