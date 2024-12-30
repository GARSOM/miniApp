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
// Создаём таблицу player_resources, если её ещё нет
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS player_resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      money INTEGER DEFAULT 100,
      production_lines INTEGER DEFAULT 1,
      energy_total INTEGER DEFAULT 10,
      energy_current INTEGER DEFAULT 10,
      material INTEGER DEFAULT 10,
      FOREIGN KEY (player_id) REFERENCES players(id)
    )`,
    (err) => {
      if (err) {
        console.error("Ошибка создания таблицы player_resources:", err.message);
      } else {
        console.log("Таблица player_resources готова!");
      }
    }
  );
});

// Создаём таблицу player_indicators, если её ещё нет
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS player_indicators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_id INTEGER NOT NULL,
      production INTEGER DEFAULT 3600, -- 60 минут
      logistics INTEGER DEFAULT 1800, -- 30 минут
      warehouse_total INTEGER DEFAULT 1,
      warehouse_occupied INTEGER DEFAULT 0,
      transport INTEGER DEFAULT 1,
      FOREIGN KEY (player_id) REFERENCES players(id)
    )`,
    (err) => {
      if (err) {
        console.error("Ошибка создания таблицы player_indicators:", err.message);
      } else {
        console.log("Таблица player_indicators готова!");
      }
    }
  );
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

// Проверка регистрации пользователя
db.isUserRegistered = (tgId, callback) => {
  db.get(`SELECT * FROM players WHERE tg_id = ?`, [tgId], (err, row) => {
    if (err) {
      console.error("Ошибка проверки регистрации:", err.message);
      callback(err, null);
    } else {
      callback(null, !!row); // Если пользователь найден, возвращается true
    }
  });
};

module.exports = db;
