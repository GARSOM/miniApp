import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      console.warn("Telegram WebApp API не доступен");
      return;
    }

    tg.ready();

    // Настройка главной кнопки
    tg.MainButton.text = "Профиль";
    tg.MainButton.color = "#0088cc";
    tg.MainButton.textColor = "#ffffff";
    tg.MainButton.show();

    tg.MainButton.onClick(() => {
      console.log("Кнопка 'Профиль' нажата");
      tg.close();
    });
  }, []);

  return null;
};

export default MainButton;
