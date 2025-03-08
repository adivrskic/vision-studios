import { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero";
import BackgroundWave from "./components/BackgroundWave";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CTASections from "./components/CTASections";
import { EASING } from './utils/constants';
import "./styles/styles.scss";

const App = () => {
  const [showWave, setShowWave] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeEffect, setActiveEffect] = useState("hero"); // Track current section
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWaveOn, setIsWaveOn] = useState(true);
  const [isOverlayOn, setIsOverlayOn] = useState(false);

  const preloadContactModel = () => {
    import("./components/Menu"); // Dynamically import the component in advance
  };

  useEffect(() => {
    preloadContactModel();
  }, []); // Runs once when the component mounts

  useEffect(() => {
    if (!hasLoadedOnce) {
      setHasLoadedOnce(true);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWave(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleOverlayToggle = (v) => { 
    setIsOverlayOn(v === null ? false : true);
  }

  console.log(isOverlayOn)

  useEffect(() => {
    let lastTimeout = null; // Debounce updates

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            section: entry.target,
            effect: entry.target.getAttribute("data-effect"),
            intersectionRatio: entry.intersectionRatio,
          }))
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio); // Sort by visibility

        if (visibleSections.length > 0) {
          const mostVisible = visibleSections[0].effect || "default";

          if (lastTimeout) clearTimeout(lastTimeout);
          lastTimeout = setTimeout(() => {
            setActiveEffect(mostVisible);
          }, 10);
        }
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    const sections = document.querySelectorAll("[data-effect]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (lastTimeout) clearTimeout(lastTimeout);
    };
  }, []);

  const handleWaveToggle = () => {
    setIsWaveOn(!isWaveOn);
  }

  return (
    <>
      {/* Background Wave Effect */}
      <motion.div
        initial={{ opacity: 0, scale:1.2, filter: "blur(16px)" }}
        animate={{
          opacity: showWave ? 1 : 0,
          scale: showWave ? 1 : 1.2,
          filter: showWave ? (isMenuOpen ? "blur(7px)" : "blur(0)") : "blur(16px)",
        }}
        transition={{ duration: 2, ease: EASING }}
        className="wave-container"
      >
        <BackgroundWave progress={progress} isMenuOpen={isMenuOpen} activeEffect={activeEffect} isWaveOn={isWaveOn && !isOverlayOn} />
      </motion.div>

      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="menu-container"
          >
            <Menu onClose={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with Fade Effect */}
      <motion.div
        key="content"
        className="page-container"
        animate={{ opacity: isMenuOpen ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          key="header"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOverlayOn ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Header 
            onMenuToggle={() => setIsMenuOpen(true)} 
            hasLoadedOnce={hasLoadedOnce} 
            onWaveToggle={() => handleWaveToggle()} 
            onThemeToggle={() => handleThemeToggle()}
          />
        </motion.div>
        <section className="content-container" data-effect="hero">
          <Hero setProgress={setProgress} hasLoadedOnce={hasLoadedOnce} />
        </section>

        <section className="content-container">
          <CTASections onOverlayToggle={(v) => handleOverlayToggle(v)} />
        </section>

        {/* <section className="content-container" data-effect="portfolio">
          <Portfolio />
        </section> */}

        <section className="content-container" data-effect="services">
          <Services />
        </section>

        <section className="content-container" data-effect="footer">
          <Footer />
        </section>
      </motion.div>
    </>
  );
};

export default App;
