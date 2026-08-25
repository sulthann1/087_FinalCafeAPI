import {
  DataTypes,
  Model
} from "sequelize";

export default class User extends Model {

  static initModel(sequelize) {

    User.init(

      {
        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true
        },

        name: {
          type: DataTypes.STRING(120),
          allowNull: false
        },

        email: {
          type: DataTypes.STRING(180),
          allowNull: false,
          unique: true,

          validate: {
            isEmail: true
          }
        },

        passwordHash: {
          type: DataTypes.TEXT,
          allowNull: false,

          field:
            "password_hash"
        }
      },

      {
        sequelize,

        modelName: "User",

        tableName: "users",

        underscored: true,

        timestamps: true,

        createdAt:
          "created_at",

        updatedAt: false
      }

    );

    return User;
  }
}