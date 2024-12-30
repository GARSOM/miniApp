import React, { useEffect, useState } from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from './components/SquarePanel';
import SyndicatePanel from "./components/SyndicatePanel";
import wheel from './assets/icons/wheel.webp';
import money from './assets/icons/money.webp';
import material from './assets/icons/material.webp';
import car from './assets/icons/car.webp';
import energy from './assets/icons/energy.webp';
import sklad from './assets/icons/sklad.webp';
import facture from './assets/icons/facture.webp';
import infrastucture from './assets/icons/infrastucture.webp';
import Registration from "./components/Registration";
import { registerUser, checkUserRegistration, getCompanyInfo, initPlayer, getPlayerResources } from './api'; // Импорт функций API
import axios from 'axios';

const App = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#ffffff", // Стандартный белый фон
    textColor: "#000000", // Стандартный чёрный текст
  });
  const [telegramId, setTelegramId] = useState(null); // Сохраняем telegramId
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [playerResources, setPlayerResources] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (tg && tg.id) {
      setTelegramId(tg.id);

      const loadData = async () => {
        try {
          const registered = await checkUserRegistration(tg.id);
          setIsRegistered(registered);

          if (registered) {
            console.log(playerResources.money)
            const companyData = await getCompanyInfo(tg.id);
            setCompanyInfo(companyData);

            // Загрузка ресурсов
            const resources = await getPlayerResources(tg.id);
            setPlayerResources(resources);
          } else {
            await initPlayer(tg.id);
            const resources = await getPlayerResources(tg.id);
            setPlayerResources(resources);
          }
        } catch (error) {
          console.error("Ошибка проверки регистрации или загрузки данных:", error);
          setIsRegistered(false);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    } else {
      setLoading(false);
    }
  }, []);
  const indicators = playerResources ? [
    { icon: wheel, name: "Логистика", value: playerResources.logistics, description: "Влияет на время продажи товара" },
    { icon: money, name: "Деньги", value: playerResources.money, description: "Ресурс для покупки и использования других ресурсов" },
     { icon: material, name: "Материалы", value: playerResources.material, description: "Необходим для производства товара" },
     { icon: facture, name: "Ленты конвеера", value: playerResources.production_lines, description: "Определяет количество одновременно производимых товаров" },
     { icon: energy, name: "Энергия", value: `${playerResources.current_energy} / ${playerResources.total_energy}`, description: "Необходима для запуска производства товара" },
     { icon: sklad, name: "Склад", value: `${playerResources.occupied_storage} / ${playerResources.total_storage}`, description: "Определяет максимальное количество производства товаров" },
     { icon: infrastucture, name: "Производство", value: playerResources.production, description: "Влияет на время производства товара" },
     { icon: car, name: "Транспорт ", value: playerResources.transport, description: "Определяет максимальное количество товаров на продажу" },
  ] : [];
  const handleRegister = async (registrationData) => {
    try {
      const response = await registerUser(registrationData);
      setIsRegistered(true);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: "100vh",
        padding: '10px'
      }}
    >
      {isRegistered ? (
        <>
          <IndicatorPanel indicators={indicators} />
          <SquarePanel />
          <CompanyInfo
            name={companyInfo?.company_name}
            image={companyInfo?.company_image}
          />
          <SyndicatePanel />
        </>
      ) : (
        <Registration onRegister={handleRegister} />
      )}
    </div>
  );
};

export default App;
