const express = require("express");
const db = require("./db");

const router = express.Router();
router.get("/check-registration", (req, res) => {
  const { tg_id } = req.query;
  if (!tg_id) {
    return res.status(400).json({ error: "tg_id не указан" });
  }
  const query = `SELECT * FROM players WHERE tg_id = ?`;
  db.get(query, [tg_id], (err, row) => {
    if (err) {
      console.error("Ошибка базы данных:", err.message);
      res.status(500).json({ error: "Ошибка базы данных" });
    } else if (row) {
      res.json({ registered: true });
    } else {
      res.json({ registered: false });
    }
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
