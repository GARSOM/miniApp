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

      });

    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        tg.MainButton.hide();
      }
    };
  }, []);

  return null;
};

export default MainButton;
