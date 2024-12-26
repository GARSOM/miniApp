const express = require("express");
const db = require("./db");

const router = express.Router();

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
// Проверка регистрации пользователя
router.get("/check-registration", (req, res) => {
  const { tg_id } = req.query;

  const query = `SELECT * FROM players WHERE tg_id = ?`;
  db.get(query, [tg_id], (err, row) => {
    if (err) {
      console.error("Ошибка проверки регистрации:", err.message);
      res.status(500).json({ error: "Ошибка проверки регистрации" });
    } else if (row) {
      res.json({ registered: true }); // Пользователь найден
    } else {
      res.json({ registered: false }); // Пользователь не найден
    }
  });
});

module.exports = router;
