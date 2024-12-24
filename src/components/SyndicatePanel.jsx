import React from "react";

const SyndicatePanel = () => {
  return (
    <div className="syndicate-panel">
      {/* Заголовок фабрики */}
      <p className="factory-title">ФАБРИКА (55%)</p>
      {/* Синдикат 'Монополия' */}
      <div className="syndicate-block">
        Синдикат "Монополия"
      </div>
      {/* Прогресс бары */}
      <div className="progress-container">
        <div className="progress-bar purple">
          <span>3 Товара через 5 минут</span>
          <div className="progress-fill" style={{ width: "50%" }}></div>
        </div>
        <div className="progress-bar green">
          <span>3 Товара через 30 минут</span>
          <div className="progress-fill" style={{ width: "80%" }}></div>
        </div>
      </div>

      {/* Кнопки */}
      <div className="buttons-container">
        <button
          className="telegram-button"

        >
          Партнеры
        </button>
        <button
          className="telegram-button"
        // onClick={() => alert("Кнопка 'Профиль' нажата!")}
        >
          Профиль
        </button>
      </div>
    </div>
  );
};

export default SyndicatePanel;
