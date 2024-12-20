import React, { useEffect } from "react";

const ResourceMenu = ({ onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.warn("Telegram WebApp API недоступен");
      return;
    }

    // Настраиваем главную кнопку Telegram
    tg.MainButton.text = "ОК";
    tg.MainButton.color = "#4caf50"; // Зелёный цвет
    tg.MainButton.show(); // Показываем кнопку

    // Обработка нажатия на кнопку
    const handleClick = () => {
      tg.MainButton.hide();
      onClose(); // Закрываем меню ресурса
    };

    tg.MainButton.onClick(handleClick);

    // Убираем обработчик при размонтировании
    return () => {
      tg.MainButton.offClick(handleClick);
    };
  }, [onClose]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <p>Описание показателя или ресурса</p>
    </div>
  );
};

export default ResourceMenu;
