import React, { useState } from "react";
import Popup from "./Popup";
const IndicatorPanel = ({ indicators }) => {
  const [selectedIcon, setSelectedIcon] = useState(null); // Состояние для хранения выбранной иконки

  const openPopup = (icon) => {
    setSelectedIcon(icon); // Открываем попап с конкретной иконкой
  };

  const closePopup = () => {
    setSelectedIcon(null); // Закрываем попап
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
