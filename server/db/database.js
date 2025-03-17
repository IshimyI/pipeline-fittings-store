require("dotenv").config(); // Загружаем переменные окружения

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "123",
    database: process.env.DB_NAME || "krioarmatura",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "5433",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "123",
    database: process.env.DB_NAME || "krioarmatura",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || "5432",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  },
};
