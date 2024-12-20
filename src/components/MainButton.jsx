import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.MainButton.show(); // Показываем главную кнопку
      // Настраиваем главную кнопку Telegram
      tg.MainButton.text = "Профиль";
      tg.MainButton.color = "#0088cc"; // Синий цвет
      tg.MainButton.textColor = "#ffffff";
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        console.log("Кнопка 'Профиль' нажата");
        tg.close(); // Закрываем Web App
      });

      // Настраиваем дополнительную кнопку Telegram
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        console.log("Кнопка 'Партнеры' нажата");
        // Здесь можно реализовать переход в меню партнеров
      });
    }

    return () => {
      if (tg) {
        tg.MainButton.hide();
        tg.BackButton.hide();
      }
    };
  }, []);

  return null; // Компонент не отображает ничего, работает через Telegram API
};

export default MainButton;
