import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");

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
        console.warn("BottomButton не поддерживается. Используем fallback.");
        // Кастомная кнопка для веб-версии
        const button = document.createElement("button");
        button.innerText = "Профиль";
        button.style.position = "fixed";
        button.style.bottom = "20px";
        button.style.left = "50%";
        button.style.transform = "translateX(-50%)";
        button.style.padding = "10px 20px";
        button.style.backgroundColor = "#0088cc";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.onclick = () => alert("Кнопка 'Профиль' нажата (fallback)");
        document.body.appendChild(button);

        return () => {
          document.body.removeChild(button);
        };
      }
    } else {
      console.warn("Telegram WebApp API не доступен");
    }
  }, []);

  return null;
};

export default MainButton;
