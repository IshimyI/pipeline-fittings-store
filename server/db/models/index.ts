import { Sequelize } from "sequelize";
import "dotenv/config";
import initUser from "./user";
import initCategory from "./category";
import initProduct from "./product";
import initBasket from "./basket";
import initOrder from "./order";
import initFeedback from "./feedback";
import initNews from "./news";
import initCompanie from "./companie";
import initInfo from "./info";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../database.js")[process.env.NODE_ENV || "development"];

// The original index.js dynamically required every .js file in this
// directory — that pattern doesn't survive a mixed dev(tsx, reads .ts)/
// prod(compiled dist, reads .js) setup, so each model is imported directly
// here instead. Same resulting `db` shape (db.User, db.Product, ..., plus
// db.sequelize/db.Sequelize) as before.
let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db: Record<string, any> = {
  User: initUser(sequelize),
  Category: initCategory(sequelize),
  Product: initProduct(sequelize),
  Basket: initBasket(sequelize),
  Order: initOrder(sequelize),
  Feedback: initFeedback(sequelize),
  News: initNews(sequelize),
  Companie: initCompanie(sequelize),
  Info: initInfo(sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
