import React from "react";

const Popup = ({ icon, name, description, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <img src={icon} alt="popup-icon" className="popup-icon" />
        <h2 className="popup-name">{name}</h2>
        <p className="popup-description">{description}</p>
        <button className="telegram-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
