const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Создаём или подключаемся к базе данных
const dbPath = path.resolve(__dirname, "players.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
  } else {
    console.log("Подключение к базе данных успешно!");
  }
});

// Создаём таблицу players, если её ещё нет
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tg_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      registration_date TEXT NOT NULL,
      company_name TEXT NOT NULL,
      company_image TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Ошибка создания таблицы:", err.message);
      } else {
        console.log("Таблица players готова!");
      }
    }
  );
});

module.exports = db;
// Проверка регистрации пользователя
const isUserRegistered = (tgId, callback) => {
  db.get(`SELECT * FROM players WHERE tg_id = ?`, [tgId], (err, row) => {
    if (err) {
      console.error("Ошибка проверки регистрации:", err.message);
      callback(err, null);
    } else {
      callback(null, !!row); // Если пользователь найден, возвращается true
    }
  });
};

module.exports = { db, isUserRegistered };