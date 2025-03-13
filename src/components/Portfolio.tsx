import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASING } from '../utils/constants'; // Assuming you have constants for easing
import './Portfolio.scss';

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideshowRef = useRef(null);
  const slideCount = 3;
  const debounceTimeoutRef = useRef(null);

  const fadeZoomVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: EASING,
        delay: i * 0.12 + 1,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: EASING
      }
    }
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: EASING
      }
    },
    exit: {
      opacity: 0,
      x: -60,
      transition: {
        duration: 0.5,
        ease: EASING
      }
    }
  };

  const rightContentVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: EASING,
        delay: 0.3 // Delay to create sequence after left content appears
      }
    },
    exit: {
      opacity: 0,
      x: 60,
      transition: {
        duration: 0.5,
        ease: EASING
      }
    }
  };

  // Glow animation variants
  const glowVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: EASING,
        delay: 0.5
      }
    },
    pulse: {
      opacity: [0.5, 0.7, 0.5],
      scale: [0.95, 1.05, 0.95],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Luxury digital agency projects data
  const projects = [
    {
      id: 1,
      title: "Karastan Rugs - Luxury Rug Seller",
      description: "A bespoke digital experience for a high-end fashion retailer, featuring immersive product visualization and personalized client journeys.",
      client: "Mohawk Industries",
      deliverables: "Brand Strategy, UX Design, Full-Stack Development, 3D Product Rendering",
      impact: "156% increase in average order value, 43% improvement in customer retention",
    },
    {
      id: 2,
      title: "Sereno — Wellness Retreat Platform",
      description: "An elevated digital platform for an exclusive wellness retreat network, featuring immersive location exploration and seamless booking experiences.",
      client: "Sereno Retreats International",
      deliverables: "Digital Brand Identity, Interactive Mapping, Reservation System, Content Strategy",
      impact: "89% booking conversion rate, 2.4M unique visitors in first quarter",
      awards: "FWA Experience of the Month, CSS Design Awards Winner"
    },
    {
      id: 3,
      title: "Atelier — Architectural Portfolio",
      description: "A minimalist yet powerful showcase for an award-winning architectural studio, highlighting their design philosophy through interactive case studies.",
      client: "Atelier Moderne Architecture",
      deliverables: "Visual Identity System, 3D Visualization, Interactive Case Studies, Custom CMS",
      impact: "7 new high-profile client acquisitions, 300% increase in international inquiries",
      awards: "Communication Arts Excellence Award, Dezeen Awards Shortlist"
    }
  ];

  // Handle mouse wheel scrolling with debounce
  useEffect(() => {
    const handleWheel = (e) => {
      // If we're already transitioning, don't do anything
      if (isTransitioning) return;
      // Only prevent default and control slideshow if:
      // 1. Scrolling down and not at the last slide, OR
      // 2. Scrolling up and not at the first slide
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atFirstSlide = currentSlide === 0;
      const atLastSlide = currentSlide === slideCount - 1;

      // If we should control the slideshow
      if ((scrollingDown && !atLastSlide) || (scrollingUp && !atFirstSlide)) {
        e.preventDefault();

        // Clear any existing timeout
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }

        // Set a new timeout
        debounceTimeoutRef.current = setTimeout(() => {
          if (scrollingDown) {
            handleSlideChange(currentSlide + 1);
          } else if (scrollingUp) {
            handleSlideChange(currentSlide - 1);
          }
        }, 500); // 500ms debounce
      }
    };

    const slideshow = slideshowRef.current;
    if (slideshow) {
      slideshow.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (slideshow) {
        slideshow.removeEventListener('wheel', handleWheel);
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [currentSlide, isTransitioning]);

  const handleSlideChange = (newIndex) => {
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Increased to account for all animations
  };

  return (
    <div ref={slideshowRef} className="portfolio-slideshow">
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          index === currentSlide && (
            <motion.div
              key={project.id}
              className="slide active"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeZoomVariants}
            >
              {/* Left side - Project info */}
              <motion.div
                className="slide-content-left"
                variants={leftContentVariants}
              >
                <div>
                  <h2 className="project-title">
                    <div className="project-counter">
                      <span>{index + 1}/3</span>
                    </div>{project.title}</h2>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-details">
                  <div className="detail-item">
                    <span className="detail-label">Client</span>
                    <p>{project.client}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Deliverables</span>
                    <p>{project.deliverables}</p>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Impact</span>
                    <p>{project.impact}</p>
                  </div>
                </div>
                {/* Pagination */}
                <div className="pagination">
                  {Array.from({ length: slideCount }).map((_, index) => (
                    <button
                      key={index}
                      className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => handleSlideChange(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Right side - Tall Scrollable Image with Glow Effect */}
              <motion.div
                className="slide-content-right"
                variants={rightContentVariants}
              >
                <div className="tall-image-wrapper">
                  {/* Glowing background circle */}
                  <motion.div 
                    className="glow-circle"
                    variants={glowVariants}
                    initial="hidden"
                    animate={["visible", "pulse"]}
                  ></motion.div>
                  
                  {/* Tall image container */}
                  <div className="tall-image-container">
                    <img src="assets/images/battleandbrew.jpg" alt="Project Tall Image" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;