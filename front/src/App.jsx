import React, { useEffect, useState } from "react";
import IndicatorPanel from "./components/IndicatorPanel";
import CompanyInfo from "./components/CompanyInfo";
import SquarePanel from "./components/SquarePanel";
import SyndicatePanel from "./components/SyndicatePanel";
import Registration from "./components/Registration";
import { registerUser, checkUserRegistration, getCompanyInfo } from "./api";

const App = () => {
  const [theme, setTheme] = useState({
    backgroundColor: "#ffffff", // Стандартный белый фон
    textColor: "#000000", // Стандартный чёрный текст
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      const themeParams = tg.themeParams || {};
      const bgColor =
        themeParams.bg_color === "#000000" ? "#333333" : themeParams.bg_color;
      setTheme({
        backgroundColor: bgColor || "#ffffff",
        textColor: themeParams.text_color || "#000000",
      });

      // Следим за изменением темы
      tg.onEvent("themeChanged", () => {
        const updatedThemeParams = tg.themeParams || {};
        const updatedBgColor =
          updatedThemeParams.bg_color === "#000000"
            ? "#333333"
            : updatedThemeParams.bg_color;
        setTheme({
          backgroundColor: updatedBgColor || "#ffffff",
          textColor: updatedThemeParams.text_color || "#000000",
        });
      });

      // Помечаем Telegram WebApp как готовый
      tg.ready();
    }
  }, []);

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
  }, []);

  const handleRegister = async (registrationData) => {
    try {
      await registerUser(registrationData);
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
      }}
    >
      {isRegistered ? (
        <>
          <IndicatorPanel />
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
