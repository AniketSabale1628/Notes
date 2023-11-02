// Popup.js
import React, { useEffect } from 'react';

const Popup = ({ show, onClose, children }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClose();
    }
  };
  useEffect(() => {
    if (show) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [show, onClose]);
  return (
    show && (
      <div className="popup-overlay">
        <div className="popup">
          <button onClick={onClose} className="close-button">
          Create
          </button>
          {children}
        </div>
      </div>
    )
  );
};

export default Popup;
