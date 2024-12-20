import React, { useEffect } from "react";

const MainButton = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
  
    if (tg) {
      tg.ready();
      console.log("Telegram WebApp API доступен");
  
      // BottomButton
      if (tg.BottomButton) {
        tg.BottomButton.setParams({
          text: "Профиль",
          color: "#0088cc",
          textColor: "#ffffff",
          isVisible: true,
          isEnabled: true,
        });
        tg.BottomButton.onClick(() => {
          console.log("BottomButton нажата");
        });
      } else {
        console.warn("BottomButton не поддерживается");
      }
  
      // SecondaryButton
      if (tg.SecondaryButton?.isSupported?.()) {
        tg.SecondaryButton.setParams({
          text: "Партнеры",
          color: "#4caf50",
          textColor: "#ffffff",
          isVisible: true,
          isEnabled: true,
        });
        tg.SecondaryButton.onClick(() => {
          console.log("SecondaryButton нажата");
        });
      } else {
        console.warn("SecondaryButton не поддерживается");
      }
    } else {
      console.warn("Telegram WebApp API не доступен");
    }
  }, []);
  

  return null;
};

export default MainButton;
