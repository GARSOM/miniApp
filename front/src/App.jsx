// App.jsx
import React, { useEffect, useState } from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from './components/SquarePanel';
import SyndicatePanel from "./components/SyndicatePanel";
import wheel from './assets/icons/wheel.webp';
import money from './assets/icons/money.webp';
import material from './assets/icons/material.webp';
import human from './assets/icons/human.webp';
import energy from './assets/icons/energy.webp';
import sklad from './assets/icons/sklad.webp';
import facture from './assets/icons/facture.webp';
import infrastucture from './assets/icons/infrastucture.webp';
import Registration from "./components/Registration";
import { registerUser, checkUserRegistration, getCompanyInfo } from './api'; // Импорт функций API

const App = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#ffffff", // Стандартный белый фон
    textColor: "#000000", // Стандартный чёрный текст
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);

  const indicators = [
    { icon: wheel, name: "Логистика", value: 42, description: "Влияет на время продажи товара" },
    { icon: money, name: "Деньги", value: 42, description: "Ресурс для покупки и использования других ресурсов" },
    { icon: material, name: "Материалы", value: 42, description: "Необходим для производства товара" },
    { icon: human, name: "Работники", value: 42, description: "Количество работников определяет максимальное количество одновременно производимых товаров" },
    { icon: energy, name: "Энергия", value: 42, description: "Необходима для запуска производства товара" },
    { icon: sklad, name: "Склад", value: 42, description: "Определяет максимальное количество производства товаров" },
    { icon: facture, name: "Производство", value: 42, description: "Влияет на время производства товара" },
    { icon: infrastucture, name: "Инфраструктура", value: 42, description: "Влияет на потребление ресурсов для производства" },
  ];
  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg && tg.id) {
      checkUserRegistration(tg.id)
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
  }, [isRegistered]); // Добавлен isRegistered в зависимости, чтобы обновления отражались без перезагрузки.

  const handleRegister = async (registrationData) => {
    try {
      const response = await registerUser(registrationData);
      console.log("Регистрация успешна:", response.data);
      alert("Регистрация прошла успешно!");
      setIsRegistered(true);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Не удалось зарегистрироваться. Попробуйте снова.");
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: "100vh",
        padding: "20px",
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
