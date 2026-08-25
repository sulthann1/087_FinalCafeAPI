import {
  DataTypes,
  Model
} from "sequelize";

export default class ApiKey extends Model {

  static initModel(sequelize) {

    ApiKey.init(

      {
        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true
        },

        userId: {
          type: DataTypes.UUID,
          allowNull: false,

          field:
            "user_id"
        },

        name: {
          type: DataTypes.STRING(120),
          allowNull: false
        },

        keyHash: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true,

          field:
            "key_hash"
        },

        keyPrefix: {
          type: DataTypes.STRING(20),
          allowNull: false,

          field:
            "key_prefix"
        },

        lastUsedAt: {
          type: DataTypes.DATE,

          field:
            "last_used_at"
        }
      },

      {
        sequelize,

        modelName:
          "ApiKey",

        tableName:
          "api_keys",

        underscored: true,

        timestamps: true,

        createdAt:
          "created_at",

        updatedAt: false
      }

    );

    return ApiKey;
  }
}