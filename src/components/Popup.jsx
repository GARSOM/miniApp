import React, { useEffect } from "react";

const Popup = ({ icon, name, description, onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");
      // Настраиваем главную кнопку Telegram
      tg.Ok.text = "OK";
      tg.Ok.color = "#4caf50"; // Зелёный цвет
      tg.Ok.textColor = "#ffffff";
      tg.Ok.show();

      // Добавляем обработчик клика
      tg.Ok.onClick(() => {
        console.log("Кнопка 'OK' нажата");
        onClose();
      });
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    // Очищаем кнопку при размонтировании
    return () => {
      if (tg) {
        tg.Ok.hide();
        console.log("Ok скрыта при размонтировании");
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
