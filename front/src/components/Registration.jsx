import React, { useState, useEffect } from "react";

import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";

const Registration = ({ onRegister }) => {
  const [tgId, setTgId] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [selectedImage, setSelectedImage] = useState(img1);

  const images = [img1, img2, img3, img4, img5, img6];

  // Получение tg_id пользователя
  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg && tg.id) {
      setTgId(tg.id);
    }
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleRegister = () => {
    if (!companyName) {
      alert("Введите название компании!");
      return;
    }
    const registrationData = {
      tg_id: tgId,
      company_name: companyName,
      company_image: selectedImage,
    };
    onRegister(registrationData); // Передача данных в родительский компонент или на сервер
  };

  return (
    <div className="registration-container">
      <h1>Добро пожаловать!</h1>
      <p>Заполните информацию о вашем предприятии</p>

      {tgId && <p className="tg-id">Ваш Telegram ID: {tgId}</p>}

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
            className={`gallery-image ${selectedImage === image ? "selected" : ""
              }`}
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
