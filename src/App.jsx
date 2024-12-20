import React from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from './components/SquarePanel'
import SyndicatePanel from "./components/SyndicatePanel";

import wheel from './assets/icons/wheel.webp'
import money from './assets/icons/money.webp'
import material from './assets/icons/material.webp'
import human from './assets/icons/human.webp'
import energy from './assets/icons/energy.webp'
import sklad from './assets/icons/sklad.webp'
import facture from './assets/icons/facture.webp'
import infrastucture from './assets/icons/infrastucture.webp'
const App = () => {
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

  return (
    <div >
      <IndicatorPanel indicators={indicators} />
      <SquarePanel />
      <CompanyInfo />
      <SyndicatePanel />

    </div>
  );
};

export default App;
