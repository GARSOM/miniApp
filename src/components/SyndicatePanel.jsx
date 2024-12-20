import React from "react";

const SyndicatePanel = () => {
  return (
    <div className="syndicate-panel">
      {/* Заголовок фабрики */}
      <p className="factory-title">ФАБРИКА (55%)</p>

      {/* СИНДИКАТ */}
      {/* <div className="syndicate-box">СИНДИКАТ "МОНОПОЛИЯ"</div> */}

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
       <div className="partners-box">ПАРТНЕРЫ - 10</div>
      {/* <div className="profile-box">ПРОФИЛЬ</div>  */}
    </div>
  );
};

export default SyndicatePanel;
