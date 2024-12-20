// import React, { useEffect, useState } from "react";
// import IndicatorPanel from "./components/IndicatorPanel";
// import CompanyInfo from "./components/CompanyInfo";
// import SquarePanel from './components/SquarePanel';
// import SyndicatePanel from "./components/SyndicatePanel";
// import wheel from './assets/icons/wheel.webp';
// import money from './assets/icons/money.webp';
// import material from './assets/icons/material.webp';
// import human from './assets/icons/human.webp';
// import energy from './assets/icons/energy.webp';
// import sklad from './assets/icons/sklad.webp';
// import facture from './assets/icons/facture.webp';
// import infrastucture from './assets/icons/infrastucture.webp';
// import MainButton from "./components/MainButton";
// const App = () => {
//   const [theme, setTheme] = useState({
//     backgroundColor: "#ffffff", // Стандартный белый фон
//     textColor: "#000000", // Стандартный чёрный текст
//   });

//   const indicators = [
//     { icon: wheel, name: "Логистика", value: 42, description: "Влияет на время продажи товара" },
//     { icon: money, name: "Деньги", value: 42, description: "Ресурс для покупки и использования других ресурсов" },
//     { icon: material, name: "Материалы", value: 42, description: "Необходим для производства товара" },
//     { icon: human, name: "Работники", value: 42, description: "Количество работников определяет максимальное количество одновременно производимых товаров" },
//     { icon: energy, name: "Энергия", value: 42, description: "Необходима для запуска производства товара" },
//     { icon: sklad, name: "Склад", value: 42, description: "Определяет максимальное количество производства товаров" },
//     { icon: facture, name: "Производство", value: 42, description: "Влияет на время производства товара" },
//     { icon: infrastucture, name: "Инфраструктура", value: 42, description: "Влияет на потребление ресурсов для производства" },
//   ];

//   useEffect(() => {
//     const tg = window.Telegram?.WebApp;
  
//     if (tg) {
//       console.log("Telegram WebApp API доступен");
//       tg.ready();
  
//     }

//   }, []);

//   return (
//     <div
//       style={{
//         backgroundColor: theme.backgroundColor,
//         color: theme.textColor,
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <IndicatorPanel indicators={indicators} />
//       <SquarePanel />
//       <CompanyInfo />
//       <SyndicatePanel />

//     </div>
//   );
// };

// export default App;
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("window.Telegram:", window.Telegram);
  
    const tg = window.Telegram?.WebApp;
    if (tg) {
      console.log("Telegram WebApp API доступен");
      console.log("tg объект:", tg);
      tg.ready();
    } else {
      console.warn("Telegram WebApp API не доступен");
      console.log("Полный объект window.Telegram:", window.Telegram);
    }
  }, []);

  return <div>Проверка Telegram WebApp API</div>;
};

export default App;
