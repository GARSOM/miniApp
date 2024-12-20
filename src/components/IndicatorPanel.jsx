import React, { useState } from "react";
import Popup from "./Popup";

const IndicatorPanel = ({ indicators }) => {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const openPopup = (indicator) => {
    setSelectedIndicator(indicator);
  };

  const closePopup = () => {
    setSelectedIndicator(null);
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
      {selectedIndicator && (
        <Popup
          icon={selectedIndicator.icon}
          name={selectedIndicator.name}
          description={selectedIndicator.description}
          onClose={closePopup}
        />
      )}
      <button className="development-button">Развитие</button>
    </div>
  );
};

export default IndicatorPanel;
