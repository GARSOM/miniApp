import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      console.log("Telegram WebApp API доступен");
      tg.ready();
      tg.MainButton.text = "Тестовая кнопка";
      tg.MainButton.show();
      tg.MainButton.onClick(() => alert("Кнопка работает!"));
    } else {
      console.warn("Telegram WebApp API не доступен");
    }
  }, []);

  return <div>Проверка Telegram WebApp API</div>;
};

export default App;
