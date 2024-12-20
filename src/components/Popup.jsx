import React, { useEffect } from "react";

const Popup = ({ icon, name, description, onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      // Настраиваем главную кнопку Telegram
      tg.MainButton.text = "OK";
      tg.MainButton.color = "#4caf50"; // Зелёный цвет
      tg.MainButton.textColor = "#ffffff";
      tg.MainButton.show();

      // Добавляем обработчик клика
      tg.MainButton.onClick(() => {
        onClose();
        tg.MainButton.hide(); // Скрываем кнопку после закрытия
      });
    }

    return () => {
      if (tg) {
        tg.MainButton.hide(); // Убираем кнопку при размонтировании
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
