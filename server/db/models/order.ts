import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare userId: CreationOptional<number | null>;
  declare email: CreationOptional<string | null>;
  declare items: object;
  declare total: string;
  declare status: "ожидает" | "проведен" | "отменен";

  static associate({ User }: any) {
    this.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}

export default (sequelize: Sequelize) => {
  Order.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
