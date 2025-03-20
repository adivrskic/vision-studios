import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_UP_ANIMATION } from '../utils/constants';
import "./MiniContact.scss";

const STORAGE_KEY = "contactFormData";

const MiniContact = ({ onCompletionUpdate }) => {
  // Initialize state from localStorage if available
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      timeline: "",
      service: [],
    };
  });

  const [errors, setErrors] = useState({});
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const requiredFields = ["firstName", "lastName", "email", "message", "timeline"];

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (!submitted) { // Don't save if form was already submitted
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, submitted]);

  const validateField = (name, value, wasFocused) => {
    let error = "";
  
    if (["firstName", "lastName"].includes(name)) {
      if (!value.trim()) error = "This field is required.";
      else if (value.length > 25) error = "Must be 25 characters or fewer.";
    }
  
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value) && wasFocused) {
        error = "Invalid email format.";
      }
    }
  
    if (name === "phone") {
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (value && !phoneRegex.test(value)) error = "Invalid phone number.";
    }
  
    if (name === "message") {
      if (!value.trim()) error = "Message is required.";
      else if (value.length > 250) error = "Message must be under 250 characters.";
    }
  
    return error;
  };
  

  const [fieldStates, setFieldStates] = useState(() => {
    return Object.keys(formData).reduce((acc, key) => {
      acc[key] = { wasFocused: false };
      return acc;
    }, {});
  });
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setFieldStates(prev => ({
      ...prev,
      [name]: { wasFocused: true }
    }));
  
    // Revalidate the field on blur
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, formData[name], true),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prev) => {
      let newValue;
  
      if (type === "checkbox") {
        newValue = checked
          ? [...prev.service, value]
          : prev.service.filter((s) => s !== value);
      } else if (type === "radio" && name === "timeline") {
        // Keep the same value or deselect if clicking again
        newValue = prev.timeline === value ? "" : value;
      } else {
        newValue = value;
      }
  
      return { ...prev, [name]: newValue };
    });
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value, fieldStates[name]?.wasFocused),
    }));
  };
  
  const handleRadioClick = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name] === value ? "" : value
    }));
  };
  
  useEffect(() => {
    let validCount = requiredFields.filter((field) => formData[field] && !errors[field]).length;
    if (formData.service.length > 0) validCount++;

    const completion = Math.floor((validCount / (requiredFields.length + 1)) * 100);
    setCompletionPercentage(completion);

    if (typeof onCompletionUpdate === "function") {
      onCompletionUpdate(completion);
    }
  }, [formData, errors, onCompletionUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (completionPercentage === 100) {
      try {
        const response = await fetch("/.netlify/functions/send-contact-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          setSubmitted(true);
          // Clear stored form data after successful submission
          localStorage.removeItem(STORAGE_KEY);
        } else {
          const errorData = await response.json();
          console.error("Failed to send email:", errorData);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };
  
  // Reset button to clear saved form data
  const handleReset = () => {
    const emptyForm = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      timeline: "",
      service: [],
    };
    setFormData(emptyForm);
    localStorage.removeItem(STORAGE_KEY);
    setErrors({});
  };

  const getButtonStyle = () => {
    const isComplete = completionPercentage === 100;
    
    return {
      background: isComplete 
        ? 'var(--accent-primary)' 
        : 'transparent',
      color: isComplete ? '#fff' : '#ccc',
      opacity: isComplete ? 1 : 0.3,
      filter: `blur(${Math.max(0, (100 - completionPercentage) / 20)}px) grayscale(${100 - completionPercentage}%)`,
    };
  };

  const fieldStyles = {
    inputWrapper: {
      position: "relative",
      width: "100%",
    },
    floatingLabel: {
      position: "absolute",
      left: "0px",
      pointerEvents: "none",
      transition: "all 0.2s ease",
      fontSize: "12px",
      border: 'none',
      color: '#ccc',
      padding: 0,
      transformOrigin: 'left'
    },
    errorTooltip: {
      position: "absolute",
      bottom: "10px",
      right: 0,
      backgroundColor: "rgba(255, 77, 79, 0.6)",
      color: "white",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      zIndex: 10,
      whiteSpace: "nowrap",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" className="mini-contact">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
          key="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div custom={0} variants={SLIDE_UP_ANIMATION} initial="hidden" animate="visible">
            <div className="container">
              <div className="form-field">
                <div style={fieldStyles.inputWrapper}>
                  <input 
                    id="firstName"
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formData.firstName ? "has-value" : ""}
                    style={errors.firstName ? { borderColor: "#ff4d4f" } : {}}
                  />
                  <label 
                    htmlFor="firstName" 
                    style={{
                      ...fieldStyles.floatingLabel,
                      top: formData.firstName ? "-10px" : "50%",
                      transform: formData.firstName ? "translateY(0) scale(0.8)" : "translateY(-50%)",
                    }}
                  >
                    First Name
                  </label>
                  {errors.firstName && (
                    <div style={fieldStyles.errorTooltip}>
                      {errors.firstName}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-field">
                <div style={fieldStyles.inputWrapper}>
                  <input 
                    id="lastName"
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formData.lastName ? "has-value" : ""}
                    style={errors.lastName ? { borderColor: "#ff4d4f" } : {}}
                  />
                  <label 
                    htmlFor="lastName" 
                    style={{
                      ...fieldStyles.floatingLabel,
                      top: formData.lastName ? "-10px" : "50%",
                      transform: formData.lastName ? "translateY(0) scale(0.8)" : "translateY(-50%)",
                    }}
                  >
                    Last Name
                  </label>
                  {errors.lastName && (
                    <div style={fieldStyles.errorTooltip}>
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="form-field">
                <div style={fieldStyles.inputWrapper}>
                  <input 
                    id="email"
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formData.email ? "has-value" : ""}
                    style={errors.email ? { borderColor: "#ff4d4f" } : {}}
                  />
                  <label 
                    htmlFor="email" 
                    style={{
                      ...fieldStyles.floatingLabel,
                      top: formData.email ? "-10px" : "50%",
                      transform: formData.email ? "translateY(0) scale(0.8)" : "translateY(-50%)",
                    }}
                  >
                    Email
                  </label>
                  {errors.email && (
                    <div style={fieldStyles.errorTooltip}>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-field">
                <div style={fieldStyles.inputWrapper}>
                  <input 
                    id="phone"
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formData.phone ? "has-value" : ""}
                    style={errors.phone ? { borderColor: "#ff4d4f" } : {}}
                  />
                  <label 
                    htmlFor="phone" 
                    style={{
                      ...fieldStyles.floatingLabel,
                      top: formData.phone ? "0px" : "50%",
                      transform: formData.phone ? "translateY(0) scale(0.8)" : "translateY(-50%)",
                      color: '#ccc'
                    }}
                  >
                    Phone (optional)
                  </label>
                  {errors.phone && (
                    <div style={fieldStyles.errorTooltip}>
                      {errors.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div custom={1} variants={SLIDE_UP_ANIMATION} initial="hidden" animate="visible">
            <fieldset>
              <legend>What can we help with?</legend>
              {["Development", "Design", "AI", "Site Refactor", "SEO", "Custom App", "Landing Page", "Something Else"].map((option) => (
                <label key={option}>
                  <input type="checkbox" name="service" value={option} checked={formData.service.includes(option)} onChange={handleChange} />
                  {option}
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Timeline</legend>
              {["<1 month", "1-3 months", "3+ months"].map((option) => (
                <label key={option} className={formData.timeline === option ? "selected" : ""}>
                  <input
                    type="radio"
                    name="timeline"
                    value={option}
                    checked={formData.timeline === option}
                    onClick={handleRadioClick} 
                    readOnly
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          </motion.div>

          <motion.div custom={2} variants={SLIDE_UP_ANIMATION} initial="hidden" animate="visible">
            <div className="form-field">
              <div style={fieldStyles.inputWrapper}>
                <textarea 
                  id="message"
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={formData.message ? "has-value" : ""}
                  style={errors.message ? { borderColor: "#ff4d4f" } : {}}
                />
                  <label 
                  htmlFor="message" 
                  style={{
                    ...fieldStyles.floatingLabel,
                    top: formData.message ? "-10px" : "10px",
                    transform: formData.message ? "translateY(0) scale(0.8)" : "translateY(0)",
                  }}
                >
                  Tell us about your project...
                </label>
                {errors.message && (
                  <div style={{
                    ...fieldStyles.errorTooltip,
                    bottom: "auto",
                    top: "10px",
                    right: "10px",
                    left: "auto",
                    transform: "none"
                  }}>
                    {errors.message}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="button-container">
            <motion.button
              className="button"
              type="submit"
              disabled={completionPercentage < 100}
              custom={3}
              variants={SLIDE_UP_ANIMATION}
              initial="hidden"
              animate="visible"
              style={getButtonStyle()}
            >
              Send
            </motion.button>
          </div>
        </motion.form>
        ) : (
          <motion.div key="thank-you" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2>Thank You!</h2>
            <p>We've received your message and will get back to you soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MiniContact;