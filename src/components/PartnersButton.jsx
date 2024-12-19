import React from "react";

const PartnersButton = () => {
  const handleSendData = () => {
    const tg = window.Telegram.WebApp;

    // Отправляем данные обратно в Telegram
    tg.sendData(JSON.stringify({ action: "open_partners" }));
  };

  return (
    <button onClick={handleSendData} style={{ padding: "10px 20px" }}>
      Партнеры
    </button>
  );
};

export default PartnersButton;
