// This file uses the DB environment variable for all environments
require("dotenv").config();

module.exports = {
  development: { use_env_variable: "DB" },
  test: { use_env_variable: "DB" },
  production: { use_env_variable: "DB" },
};
