import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASING, Y_TRANSFORM, TRANSITION_SPEED_REG, BLUR } from '../utils/constants';
import { validateEmail } from '../utils/helpers';
import { IoFlashOutline, IoPlaySkipForwardCircleOutline } from "react-icons/io5";
import "./ThankyouOverlay.scss";

const STORAGE_KEY = "contactFormData";

const ThankYouOverlay: React.FC<{ selectedService: number | null; handleBackToServices: () => void; customerNeed: string }> = ({ 
  selectedService, 
  handleBackToServices,
  customerNeed
}) => {
  const [typingProgress, setTypingProgress] = useState(0);
  const [plainText, setPlainText] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.email) {
          setEmail(parsedData.email);
          setIsEmailValid(validateEmail(parsedData.email));
        }
      }
    } catch (error) {
      console.error("Error loading saved contact data:", error);
    }
  }, []);

  useEffect(() => {
    if (selectedService === null || !customerNeed) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = customerNeed;

    const visibleText = tempDiv.textContent || "";
    setPlainText(visibleText);
    setTypingProgress(0);

    let index = 0;
    const interval = setInterval(() => {
      if (index < visibleText.length && !skipTyping) {
        setTypingProgress(index + 1);
        index++;
      } else {
        clearInterval(interval);
        setTypingProgress(visibleText.length);
        setTimeout(() => setShowContent(true), 1);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [selectedService, customerNeed, skipTyping]);

  const createMaskedHTML = () => {
    if (!customerNeed || !plainText) return "";
  
    if (typingProgress >= plainText.length) {
      return `${customerNeed}<span class="typing-cursor">|</span>`;
    }
  
    const textNodes = [];
    let inTag = false;
    let currentTextNode = "";
  
    for (let i = 0; i < customerNeed.length; i++) {
      const char = customerNeed[i];
  
      if (char === "<") {
        if (currentTextNode) {
          textNodes.push({ type: "text", content: currentTextNode });
          currentTextNode = "";
        }
        inTag = true;
        textNodes.push({ type: "tag-start", content: "<" });
      } else if (char === ">") {
        inTag = false;
        textNodes.push({ type: "tag-end", content: ">" });
      } else if (inTag) {
        textNodes[textNodes.length - 1].content += char;
      } else {
        currentTextNode += char;
      }
    }
  
    if (currentTextNode) {
      textNodes.push({ type: "text", content: currentTextNode });
    }
  
    let maskedHTML = "";
    let textContentSoFar = 0;
  
    for (const node of textNodes) {
      if (node.type === "text") {
        const nodeText = node.content;
        if (textContentSoFar >= typingProgress) {
          continue;
        } else if (textContentSoFar + nodeText.length <= typingProgress) {
          maskedHTML += nodeText;
        } else {
          const visiblePortion = nodeText.substring(0, typingProgress - textContentSoFar);
          maskedHTML += visiblePortion;
        }
        textContentSoFar += nodeText.length;
      } else {
        maskedHTML += node.content;
      }
    }
  
    maskedHTML += `<span class="typing-cursor">|</span>`;
  
    return maskedHTML;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));

    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...parsedData,
          email: newEmail
        }));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: newEmail }));
      }
    } catch (error) {
      console.error("Error saving email to localStorage:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isEmailValid) return;
  
    const formData = {
      email,
      service: selectedService,
      message: customerNeed,
    };
  
    try {
      const response = await fetch("/.netlify/functions/send-contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Email sent successfully");
        alert("Thank you! We'll get back to you soon.");
      } else {
        console.error("Failed to send email");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Network error. Please try again later.");
    }
  };
  

  if (selectedService === null) return null;

  return (
    <motion.div
      className="thank-you-overlay"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        scale: 1.08, 
        filter: BLUR, 
        transition: { duration: 1, ease: EASING }
      }}       
      transition={{ duration: TRANSITION_SPEED_REG, ease: EASING }}
    >
      <motion.h2 className="thank-you-overlay__quote">
        <span dangerouslySetInnerHTML={{ __html: createMaskedHTML() }} />
      </motion.h2>
      {showContent && (
        <>
          <motion.div
            className="thank-you-overlay__content"
            initial={{ opacity: 0, y: Y_TRANSFORM }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: TRANSITION_SPEED_REG, delay: 0.12, ease: EASING }}
          >
            <p className="thank-you-overlay__text">
              If this sounds like you, simply enter your email. We would love to bring your dream project to life, and will get back with you as soon as we can!
            </p>
            <motion.div
              className="thank-you-overlay__email-container"
              initial={{ opacity: 0, y: Y_TRANSFORM }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: TRANSITION_SPEED_REG, delay: 0.24, ease: EASING }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="thank-you-overlay__email-input"
              />
              <button
                className={`button ${isEmailValid ? "valid-email" : ""}`}
                onClick={handleSubmit}
                disabled={!isEmailValid}
              >
                <IoFlashOutline /><span>Send</span>
              </button>
            </motion.div>
          </motion.div>
          <motion.button
            className="thank-you-overlay__close"
            onClick={handleBackToServices}
            initial={{ opacity: 0, y: Y_TRANSFORM }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: TRANSITION_SPEED_REG, delay: 0.36, ease: EASING }}
          >
            Or Browse More Services
          </motion.button>
        </>
      )}
      {!showContent && (
        <motion.span
          className="thank-you-overlay__skip-button"
          onClick={() => setSkipTyping(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: TRANSITION_SPEED_REG, delay: 0.12, ease: EASING }}
        >
          <IoPlaySkipForwardCircleOutline />
        </motion.span>
      )}
    </motion.div>
  );
};

export default ThankYouOverlay;
