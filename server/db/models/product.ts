import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>;
  declare categoryId: number;
  declare name: string;
  declare image: string;
  declare price: string;
  declare availability: number;
  declare params: CreationOptional<object>;

  static associate({ Category, Basket }: any) {
    this.belongsTo(Category, { foreignKey: "categoryId" });
    this.hasMany(Basket, {
      foreignKey: "productId",
      as: "baskets",
    });
  }
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.STRING,
      availability: DataTypes.INTEGER,
      params: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
