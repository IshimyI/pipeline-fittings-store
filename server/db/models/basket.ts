import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Basket extends Model<InferAttributes<Basket>, InferCreationAttributes<Basket>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare productId: number;
  declare quantity: number;

  static associate({ User, Product }: any) {
    this.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });
    this.belongsTo(Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}

export default (sequelize: Sequelize) => {
  Basket.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
