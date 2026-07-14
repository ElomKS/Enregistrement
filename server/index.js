const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://enregistrement-static.onrender.com";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const CREATE_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_no VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    profession VARCHAR(150) NOT NULL,
    request TEXT DEFAULT '',
    created_at DATE DEFAULT CURRENT_DATE
  );
`;

const SEED_USERS = [
  { record_no: "0001", first_name: "Jorge", last_name: "Martinez", phone_number: "+33 6 12 34 56 78", profession: "Ingénieur structure", request: "Nécessite l'accès aux fichiers de projet archivés.", created_at: "2026-06-02" },
  { record_no: "0002", first_name: "Anya", last_name: "Kapoor", phone_number: "+33 6 98 76 54 32", profession: "Designer produit", request: "", created_at: "2026-06-14" },
  { record_no: "0003", first_name: "Lily", last_name: "Chen", phone_number: "+33 7 11 22 33 44", profession: "Analyste de données", request: "Souhaite une présentation du tableau de bord de reporting.", created_at: "2026-06-20" },
];

async function initDB() {
  await pool.query(CREATE_TABLE);
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM users");
  if (rows[0].count === 0) {
    for (const u of SEED_USERS) {
      await pool.query(
        `INSERT INTO users (record_no, first_name, last_name, phone_number, profession, request, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [u.record_no, u.first_name, u.last_name, u.phone_number, u.profession, u.request, u.created_at]
      );
    }
    console.log("Seeded initial users.");
  }
  console.log("Database ready.");
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", hasDbUrl: !!process.env.DATABASE_URL, hasFrontendUrl: !!process.env.FRONTEND_URL, nodeEnv: process.env.NODE_ENV });
});

app.use("/api/users", usersRouter);

initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
