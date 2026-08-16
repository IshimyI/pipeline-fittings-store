import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Companie extends Model<InferAttributes<Companie>, InferCreationAttributes<Companie>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare imgSrc: string;

  static associate(_models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Companie.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
