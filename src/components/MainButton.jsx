import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");

      // BottomButton
      if (tg.BottomButton) {
        console.log("BottomButton доступен");
        tg.BottomButton.setParams({
          text: "Профиль",
          color: "#0088cc",
          textColor: "#ffffff",
          isVisible: true,
          isEnabled: true,
        });

        tg.BottomButton.onClick(() => {
          alert("Кнопка 'Профиль' нажата");
        });
      } else {
        console.warn("BottomButton не поддерживается");
      }

      // SecondaryButton
      if (tg.SecondaryButton) {
        console.log("SecondaryButton доступен");
        try {
          if (tg.SecondaryButton.isSupported?.()) {
            tg.SecondaryButton.setParams({
              text: "Партнеры",
              color: "#4caf50",
              textColor: "#ffffff",
              isVisible: true,
              isEnabled: true,
            });

            tg.SecondaryButton.onClick(() => {
              alert("Кнопка 'Партнеры' нажата");
            });
          } else {
            console.warn("SecondaryButton не поддерживается");
          }
        } catch (error) {
          console.error("Ошибка при проверке SecondaryButton:", error);
        }
      } else {
        console.warn("SecondaryButton отсутствует в вашем клиенте");
      }
    } else {
      console.warn("Telegram WebApp API не доступен");
    }

    return () => {
      if (tg) {
        tg.BottomButton?.hide();
        tg.SecondaryButton?.hide?.();
      }
    };
  }, []);

  return null;
};

export default MainButton;
