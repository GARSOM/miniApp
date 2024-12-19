import React, { useEffect } from "react";

const ResourceMenu = ({ onClose }) => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp; // Проверяем, существует ли Telegram API
    if (!tg) {
      console.warn("Telegram WebApp API недоступен");
      return;
    }

    // Настраиваем главную кнопку
    tg.MainButton.text = "ОК";
    tg.MainButton.color = "#36a3f7"; // Синий цвет кнопки
    tg.MainButton.show(); // Показываем кнопку

    // Обработка нажатия на кнопку
    const handleClick = () => {
      tg.MainButton.hide();
      onClose(); // Закрываем попап
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
