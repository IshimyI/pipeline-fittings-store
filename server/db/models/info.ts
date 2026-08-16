import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class Info extends Model<InferAttributes<Info>, InferCreationAttributes<Info>> {
  declare id: CreationOptional<number>;
  declare title: CreationOptional<string | null>;
  declare content: CreationOptional<string | null>;
  declare actions: CreationOptional<string | null>;
  declare company_first: CreationOptional<string | null>;
  declare company_second: CreationOptional<string | null>;
  declare section: string;

  static associate(_models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Info.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
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
