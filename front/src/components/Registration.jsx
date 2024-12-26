import React, { useState, useEffect } from "react";
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";

const Registration = ({ onRegister }) => {
  // Состояния для хранения данных регистрации
  const [tgId, setTgId] = useState(null);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedImage, setSelectedImage] = useState(img1);

  // Массив доступных изображений
  const images = [img1, img2, img3, img4, img5, img6];

  // Получение данных пользователя из Telegram WebApp
  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg) {
      setTgId(tg.id);
      setUserName(tg.first_name || "");
    }
  }, []);

  // Обработчик выбора изображения
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  // Обработчик регистрации
  const handleRegister = () => {
    if (!companyName) {
      alert("Введите название компании!");
      return;
    }

    const registrationData = {
      tg_id: tgId, // Telegram ID пользователя
      name: userName, // Имя пользователя из Telegram
      company_name: companyName, // Название компании
      company_image: selectedImage, // Выбранное изображение компании
      registration_date: new Date().toISOString(), // Дата регистрации
    };
    console.log(registrationData)
    // Передача данных в родительский компонент
    onRegister(registrationData);
  };

  return (
    <div className="registration-container">
      <h1>Добро пожаловать!, {userName && <p className="user-name">{userName}</p>}</h1>
      <p>Заполните информацию о вашем предприятии</p>
      <input
        type="text"
        placeholder="Введите название компании"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="input-field"
      />

      <h3>Выбранное фото</h3>
      <img src={selectedImage} alt="Выбранное фото" className="selected-image" />

      <div className="image-gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Выбор ${index + 1}`}
            onClick={() => handleImageSelect(image)}
            className={`gallery-image ${selectedImage === image ? "selected" : ""}`}
          />
        ))}
      </div>

      <button onClick={handleRegister} className="register-button">
        Продолжить
      </button>
    </div>
  );
};

export default Registration;