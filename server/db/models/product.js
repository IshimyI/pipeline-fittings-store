"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      this.belongsTo(Category, { foreignKey: "categoryId" });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
      availability: DataTypes.STRING,
      params: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
