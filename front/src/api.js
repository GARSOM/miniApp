import axios from "axios";

const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const deleteUser = (tg_id) => {
  return api.delete("/delete", {
    data: { tg_id },
  });
};
