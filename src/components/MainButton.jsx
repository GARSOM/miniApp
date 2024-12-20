import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");
      tg.ready();

      tg.MainButton.text = "Профиль";
      tg.MainButton.color = "#0088cc";
      tg.MainButton.textColor = "#ffffff";
      tg.MainButton.show();

      tg.MainButton.onClick(() => {
        alert("Главная кнопка нажата");
      });

      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        alert("Кнопка 'Партнеры' нажата");
      });
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        tg.MainButton.hide();
        tg.BackButton.hide();
      }
    };
  }, []);

  return null;
};

export default MainButton;
