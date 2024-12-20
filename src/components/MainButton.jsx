import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");
      tg.ready();

      // Настраиваем главную кнопку (BottomButton)
      tg.BottomButton.setParams({
        text: "Профиль",
        color: "#0088cc", // Синий цвет
        textColor: "#ffffff", // Белый текст
        isVisible: true,
        isEnabled: true,
      });

      // Обработчик нажатия для BottomButton
      tg.BottomButton.onClick(() => {
        console.log("Кнопка 'Профиль' нажата");
      });

      // Проверяем поддержку SecondaryButton
      if (tg.SecondaryButton?.isSupported()) {
        console.log("SecondaryButton поддерживается");

        // Настраиваем дополнительную кнопку (SecondaryButton)
        tg.SecondaryButton.setParams({
          text: "Партнеры",
          color: "#4caf50", // Зелёный цвет
          textColor: "#ffffff", // Белый текст
          isVisible: true,
          isEnabled: true,
        });

        // Обработчик нажатия для SecondaryButton
        tg.SecondaryButton.onClick(() => {
          console.log("Кнопка 'Партнеры' нажата");
        });
      } else {
        console.warn("SecondaryButton не поддерживается");
      }
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        tg.BottomButton.hide(); // Скрываем главную кнопку при размонтировании
        if (tg.SecondaryButton?.isSupported()) {
          tg.SecondaryButton.hide(); // Скрываем дополнительную кнопку
        }
      }
    };
  }, []);

  return null;
};

export default MainButton;
