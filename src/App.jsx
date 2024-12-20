import React, { useEffect, useState } from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from './components/SquarePanel';
import SyndicatePanel from "./components/SyndicatePanel";
import ResourceMenu from './components/ResourceMenu';
import PartnersButton from './components/PartnersButton';
import wheel from './assets/icons/wheel.webp';
import money from './assets/icons/money.webp';
import material from './assets/icons/material.webp';
import human from './assets/icons/human.webp';
import energy from './assets/icons/energy.webp';
import sklad from './assets/icons/sklad.webp';
import facture from './assets/icons/facture.webp';
import infrastucture from './assets/icons/infrastucture.webp';

const App = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#ffffff", // Стандартный белый фон
    textColor: "#000000", // Стандартный чёрный текст
  });

  const indicators = [
    { icon: wheel, value: 42, description: "Влияет на время продажи товара" },
    { icon: money, value: 42, description: "Ресурс для покупки и использования других ресурсов" },
    { icon: material, value: 42, description: "Необходим для производства товара" },
    { icon: human, value: 42, description: "Количество работников определяет максимальное кол-во одновременно производимых товаров" },
    { icon: energy, value: 42, description: "Необходим для запуска производства товара" },
    { icon: sklad, value: 42, description: "Определяет максимальное количество производства товаров" },
    { icon: facture, value: 42, description: "Влияет на время производства товара" },
    { icon: infrastucture, value: 42, description: "Влияет на потребление ресурсов для производства" },
  ];

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      // Инициализация Telegram Web App API
      tg.ready();

      // Настройка главной кнопки Telegram
      tg.MainButton.text = "Закрыть";
      tg.MainButton.show();

      // Адаптация темы из Telegram
      const themeParams = tg.themeParams;
      setTheme({
        backgroundColor: themeParams.bg_color || "#ffffff",
        textColor: themeParams.text_color || "#000000",
      });

      // Обработка клика на главную кнопку
      const handleClose = () => {
        tg.close();
      };

      tg.MainButton.onClick(handleClose);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        tg.MainButton.offClick(handleClose);
      };
    } else {
      console.warn("Telegram Web App API не доступен.");
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <IndicatorPanel indicators={indicators} />
      <SquarePanel />
      <CompanyInfo />
      <SyndicatePanel />
      <ResourceMenu />
      <PartnersButton />
    </div>
  );
};

export default App;
