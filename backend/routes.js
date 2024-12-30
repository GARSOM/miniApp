const express = require("express");
const db = require("./db");
const router = express.Router();

// Маршрут для инициализации ресурсов и показателей игрока
router.post("/api/init-player", async (req, res) => {
  const { player_id } = req.body;

  try {
    // Проверяем, существуют ли записи в таблицах
    const existingResources = await db.get("SELECT * FROM player_resources WHERE player_id = ?", [player_id]);
    const existingIndicators = await db.get("SELECT * FROM player_indicators WHERE player_id = ?", [player_id]);

    if (!existingResources) {
      // Добавляем ресурсы игрока
      await db.run(
        "INSERT INTO player_resources (player_id, money, production_lines, energy_total, energy_current, material) VALUES (?, 100, 1, 10, 10, 10)",
        [player_id]
      );
    }

    if (!existingIndicators) {
      // Добавляем показатели игрока
      await db.run(
        "INSERT INTO player_indicators (player_id, production, logistics, warehouse_total, warehouse_occupied, transport) VALUES (?, 3600, 1800, 1, 0, 1)",
        [player_id]
      );
    }

    res.status(200).json({ message: "Player initialized successfully" });
  } catch (error) {
    console.error("Ошибка при инициализации игрока:", error);
    res.status(500).json({ error: "Failed to initialize player" });
  }
});
router.get("/company-info", (req, res) => {
  const { tg_id } = req.query;
  const query = `SELECT company_name, company_image FROM players WHERE tg_id = ?`;

  db.get(query, [tg_id], (err, row) => {
    if (err) {
      console.error("Ошибка базы данных:", err.message);
      res.status(500).json({ error: "Ошибка базы данных" });
    } else if (!row) {
      res.status(404).json({ error: "Компания не найдена" });
    } else {
      res.json(row);
    }
  });
});

router.get("/check-registration", (req, res) => {
  const { tg_id } = req.query;
  if (!tg_id) {
    return res.status(400).json({ error: "tg_id не указан" });
  }

  db.isUserRegistered(tg_id, (err, registered) => {
    if (err) {
      return res.status(500).json({ error: "Ошибка базы данных" });
    }
    res.json({ registered });
  });
});
// Регистрация пользователя
router.post("/register", (req, res) => {
  const { tg_id, name, company_name, company_image } = req.body;
  const registration_date = new Date().toISOString();

  const query = `
    INSERT INTO players (tg_id, name, registration_date, company_name, company_image)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(
    query,
    [tg_id, name, registration_date, company_name, company_image],
    function (err) {
      if (err) {
        console.error("Ошибка регистрации:", err.message);
        res.status(500).json({ error: "Ошибка регистрации" });
      } else {
        res.json({ success: true, id: this.lastID });
      }
    }
  );
});

// Удаление пользователя
router.delete("/delete", (req, res) => {
  const { tg_id } = req.body;

  const query = `DELETE FROM players WHERE tg_id = ?`;
  db.run(query, [tg_id], function (err) {
    if (err) {
      console.error("Ошибка удаления:", err.message);
      res.status(500).json({ error: "Ошибка удаления" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Пользователь не найден" });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = router;
