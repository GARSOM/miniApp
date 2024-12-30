import axios from "axios";

const API_URL = "https://miniapp-production-f83c.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
});

export const initPlayer = async (telegramId) => {
  try {
    const response = await axios.post(`${API_URL}/init-player`, {
      params: { tg_id: telegramId }
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении информации о компании:", error);
    throw error;
  }
};

export const getCompanyInfo = async (tgId) => {
  try {
    const response = await axios.get(`${API_URL}/company-info`, {
      params: { tg_id: tgId },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении информации о компании:", error);
    throw error;
  }
};

// Проверка регистрации пользователя
export const checkUserRegistration = async (tgId) => {
  console.log("Переданный tg_id:", tgId); // Логируем tgId
  try {
    const response = await axios.get(`${API_URL}/check-registration`, {
      params: { tg_id: tgId },
    });
    console.log("Ответ от сервера:", response.data); // Логируем ответ сервера
    return response.data.registered; // Предполагается, что API возвращает { registered: true/false }
  } catch (error) {
    console.error("Ошибка при проверке регистрации:", error);
    throw error;
  }
};

// Регистрация пользователя
export const registerUser = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response;
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    throw error;
  }
};

// Удаление пользователя
export const deleteUser = async (tgId) => {
  try {
    const response = await api.delete("/delete", {
      data: { tg_id: tgId },
    });
    return response;
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    throw error;
  }
};
