import React, { useState } from "react";
import Popup from "./Popup";

const IndicatorPanel = ({ indicators }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const openPopup = (icon) => {
    setSelectedIcon(icon);
  };

  const closePopup = () => {
    setSelectedIcon(null);
  };

  return (
    <div className="indicator-panel">
      <div className="icon-container">
        {indicators.map((indicator, index) => (
          <div
            key={index}
            className="icon-box"
            onClick={() => openPopup(indicator)}
          >
            <img src={indicator.icon} alt={`icon-${index}`} />
            <div className="indicator-value">{indicator.value}</div>
          </div>
        ))}
      </div>
      {selectedIcon && (
        <Popup
          icon={selectedIcon.icon}
          description={selectedIcon.description}
          onClose={closePopup}
        />
      )}
      <button className="development-button">Развитие</button>
    </div>
  );
};

export default IndicatorPanel;
