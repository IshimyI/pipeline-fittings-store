import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
  declare id: CreationOptional<number>;
  declare name: CreationOptional<string | null>;
  declare email: string;
  declare phone: CreationOptional<string | null>;
  declare message: string;

  static associate(_models: any) {}
}

export default (sequelize: Sequelize) => {
  Feedback.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
