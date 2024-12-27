import React from "react";

const Popup = ({ icon, title, message, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        {icon && <img src={icon} alt="popup-icon" className="popup-icon" />}
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="telegram-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
