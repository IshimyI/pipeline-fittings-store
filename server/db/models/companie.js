"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Companie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Companie.init(
    {
      name: DataTypes.STRING,
      imgSrc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Companie",
    }
  );
  return Companie;
};
