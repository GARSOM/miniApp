import React, { useEffect } from "react";

const Popup = ({ icon, name, description, onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");

      // Настройка кнопки "OK" для попапа
      tg.MainButton.setParams({
        text: "OK",
        color: "#4caf50",
        textColor: "#ffffff",
        isVisible: true,
        isEnabled: true,
      });

      tg.MainButton.onClick(() => {
        onClose(); // Закрытие попапа
      });
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        // Скрываем кнопку при закрытии попапа
        tg.MainButton.hide();
      }
    };
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <img src={icon} alt="popup-icon" className="popup-icon" />
        <h2 className="popup-name">{name}</h2>
        <p className="popup-description">{description}</p>
      </div>
    </div>
  );
};

export default Popup;
