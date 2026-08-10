"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      items: DataTypes.JSON,
      total: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("ожидает", "проведен", "отменен"),
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
