import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");

      // Проверка BottomButton
      if (tg.BottomButton) {
        console.log("BottomButton доступен");
        tg.BottomButton.setParams({
          text: "Профиль",
          color: "#0088cc", // Синий цвет
          textColor: "#ffffff", // Белый текст
          isVisible: true,
          isEnabled: true,
        });

        tg.BottomButton.onClick(() => {
          console.log("BottomButton нажата");
          alert("Кнопка BottomButton 'Профиль' нажата!");
        });
      } else {
        console.warn("BottomButton не доступен в вашем клиенте");
      }

      // Проверка SecondaryButton
      if (tg.SecondaryButton?.isSupported()) {
        console.log("SecondaryButton доступен");
        tg.SecondaryButton.setParams({
          text: "Партнеры",
          color: "#4caf50", // Зеленый цвет
          textColor: "#ffffff", // Белый текст
          isVisible: true,
          isEnabled: true,
        });

        tg.SecondaryButton.onClick(() => {
          console.log("SecondaryButton нажата");
          alert("Кнопка SecondaryButton 'Партнеры' нажата!");
        });
      } else {
        console.warn("SecondaryButton не доступен в вашем клиенте");
      }
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        // Скрываем кнопки при размонтировании
        tg.BottomButton?.hide();
        if (tg.SecondaryButton?.isSupported()) {
          tg.SecondaryButton?.hide();
        }
      }
    };
  }, []);

  return null;
};

export default MainButton;
