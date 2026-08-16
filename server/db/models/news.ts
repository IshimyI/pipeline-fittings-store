import {
  Model,
  DataTypes,
  type Sequelize,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class News extends Model<InferAttributes<News>, InferCreationAttributes<News>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare image: CreationOptional<string | null>;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static associate(_models: any) {
    // define associations here if needed in the future
  }
}

export default (sequelize: Sequelize) => {
  News.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "News",
      tableName: "news",
    }
  );

  return News;
};
