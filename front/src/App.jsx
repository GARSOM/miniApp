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
import { registerUser, checkUserRegistration, getCompanyInfo, initPlayer } from './api'; // Импорт функций API
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

  const indicators = [
    { icon: wheel, name: "Логистика", value: 42, description: "Влияет на время продажи товара" },
    { icon: money, name: "Деньги", value: 42, description: "Ресурс для покупки и использования других ресурсов" },
    { icon: material, name: "Материалы", value: 42, description: "Необходим для производства товара" },
    { icon: facture, name: "Ленты конвеера", value: 42, description: "Определяет количество одновременно производимых товаров" },
    { icon: energy, name: "Энергия", value: 42, description: "Необходима для запуска производства товара" },
    { icon: sklad, name: "Склад", value: 42, description: "Определяет максимальное количество производства товаров" },
    { icon: infrastucture, name: "Производство", value: 42, description: "Влияет на время производства товара" },
    { icon: car, name: "Транспорт ", value: 42, description: "Определяет максимальное количество товаров на продажу" },
  ];

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg && tg.id) {
      setTelegramId(tg.id);
      checkUserRegistration(tg.id)
      initPlayer(telegramId)
        .then((registered) => {
          setIsRegistered(registered);
          if (registered) {
            return getCompanyInfo(tg.id);
          }
        })
        .then((data) => {
          if (data) {
            setCompanyInfo(data);
          }
        })
        .catch((err) => {
          console.error("Ошибка проверки регистрации или загрузки данных компании:", err);
          setIsRegistered(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []); // Зависимость пустая, так как инициализация происходит один раз.

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
