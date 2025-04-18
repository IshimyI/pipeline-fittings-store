"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info.init(
    {
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      actions: DataTypes.TEXT,
      company_first: DataTypes.TEXT,
      company_second: DataTypes.TEXT,
      section: DataTypes.STRING,
    },

    {
      sequelize,
      modelName: "Info",
    }
  );
  return Info;
};
