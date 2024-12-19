import React from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from './components/SquarePanel'
import SyndicatePanel from "./components/SyndicatePanel";
import ResourceMenu from './components/ResourceMenu'
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
    { icon: wheel, description: "Влияет на время продажи товара" },
    { icon: money, description: "Ресурс для покупки и использования других ресурсов"},
    { icon: material, description: "Необходим для производства товара"},
    { icon: human, description: "Количество работников определяет максимальное кол-во одновременно производимых товаров"},
    { icon: energy, description: "Необходим для запуска производства товара"},
    { icon: sklad, description: "Определяет максимальное количество производства товаров"},
    { icon: facture, description: "Влияет на время производства товара"},
    { icon: infrastucture, description: "Влияет на потребление ресурсов для производства"},
  ];

  return (
    <div >
      <IndicatorPanel indicators={indicators} />
      <SquarePanel />
      <CompanyInfo />
      <SyndicatePanel />
      <ResourceMenu />
    </div>
  );
};

export default App;
