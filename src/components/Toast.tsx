import React, { useState, useEffect } from 'react';
import { IoStar } from 'react-icons/io5';  // If you're using react-icons
import './Toast.scss';  // Add this CSS file for styling

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Hide the toast after 3 seconds
      }, 3000); // Duration to show the toast (3 seconds)

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null; // Don't render if show is false

  return (
    <div className="toast-container">
      <div className="toast">
        <FaStar className="toast-icon" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
