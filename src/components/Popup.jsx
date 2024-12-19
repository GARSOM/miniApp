import React from "react";

const Popup = ({ icon, description, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <img src={icon} alt="popup-icon" className="popup-icon" />
        <p className="popup-description">{description}</p>
        <button className="popup-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
