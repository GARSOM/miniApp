import React, { useEffect } from "react";

const Popup = ({ icon, name, description, onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");

      // Настраиваем главную кнопку Telegram для попапа
      tg.MainButton.text = "OK";
      tg.MainButton.color = "#4caf50"; // Зелёный цвет
      tg.MainButton.textColor = "#ffffff";
      tg.MainButton.show();

      // Обработчик нажатия кнопки "OK"
      tg.MainButton.onClick(() => {

        onClose();

        // Возвращаем кнопку к состоянию "Профиль"
        tg.MainButton.text = "Профиль";
        tg.MainButton.color = "#0088cc";
        tg.MainButton.textColor = "#ffffff";
        tg.MainButton.show();
      });
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        // Возвращаем кнопку к состоянию "Профиль" при закрытии попапа
        tg.MainButton.text = "Профиль";
        tg.MainButton.color = "#0088cc";
        tg.MainButton.textColor = "#ffffff";
        tg.MainButton.show();
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
