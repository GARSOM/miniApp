import axios from "axios";

const API_URL = "https://miniapp-production-f83c.up.railway.app/api";

const api = axios.create({
  baseURL: API_URL,
});

// Проверка регистрации пользователя
export const checkUserRegistration = async (tgId) => {
  try {
    const response = await api.get("/check-registration", {
      params: { tg_id: tgId },
    });
    return response.data.registered; // Ожидается, что сервер возвращает { registered: true/false }
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
