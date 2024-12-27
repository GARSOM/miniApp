import React, { useState, useEffect } from "react";
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";
import Popup from "./Popup"; // Импортируем Popup

const Registration = ({ onRegister }) => {
  const [tgId, setTgId] = useState(null);
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [selectedImage, setSelectedImage] = useState(img1);
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  // Проверьте, что массив `images` корректно инициализирован
  const images = [img1, img2, img3, img4, img5, img6];

  useEffect(() => {
    if (!images || !Array.isArray(images)) {
      console.error("Ошибка: массив images не определён или пустой.");
    }
  }, [images]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tg) {
      setTgId(tg.id);
      setUserName(tg.first_name || "");
    }
  }, []);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleRegister = () => {
    if (!companyName) {
      setPopup({
        isOpen: true,
        title: "Ошибка",
        message: "Введите название компании!",
      });
      return;
    }

    if (companyName.length < 4) {
      setPopup({
        isOpen: true,
        title: "Ошибка",
        message: "Название должно состоять хотя бы из 4 символов.",
      });
      return;
    }

    const isValidName = /^[a-zA-Z0-9]+$/.test(companyName);
    if (!isValidName) {
      setPopup({
        isOpen: true,
        title: "Ошибка",
        message: "Название предприятия должно содержать только буквы и/или цифры.",
      });
      return;
    }

    const registrationData = {
      tg_id: tgId,
      name: userName,
      company_name: companyName,
      company_image: selectedImage,
      registration_date: new Date().toISOString(),
    };

    onRegister(registrationData);
  };

  return (
    <div className="registration-container">
      <h1 className="welcome-header">Добро пожаловать, {userName}</h1>
      <input
        type="text"
        placeholder="Введите название компании"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="input-field"
      />
      <img src={selectedImage} alt="Выбранное фото" className="selected-image" />

      <div className="image-gallery">
        {images?.length ? (
          images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Выбор ${index + 1}`}
              onClick={() => handleImageSelect(image)}
              className={`gallery-image ${selectedImage === image ? "selected" : ""}`}
            />
          ))
        ) : (
          <p>Изображения не найдены</p>
        )}
      </div>

      <button onClick={handleRegister} className="register-button">
        Продолжить
      </button>

      {popup.isOpen && (
        <Popup
          title={popup.title}
          message={popup.message}
          onClose={() => setPopup({ ...popup, isOpen: false })}
        />
      )}
    </div>
  );
};

export default Registration;
