import React from "react";

const PartnersButton = () => {
  const handleSendData = () => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      // Отправляем данные в Telegram
      tg.sendData(JSON.stringify({ action: "open_partners" }));
    } else {
      console.warn("Telegram WebApp API недоступен");
    }
  };

  return (
    <button onClick={handleSendData} style={{ padding: "10px 20px" }}>
      Партнеры
    </button>
  );
};

export default PartnersButton;
