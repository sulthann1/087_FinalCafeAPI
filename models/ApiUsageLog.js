import {
  DataTypes,
  Model
} from "sequelize";

export default class ApiUsageLog
  extends Model {

  static initModel(sequelize) {

    ApiUsageLog.init(

      {
        id: {
          type: DataTypes.BIGINT,
          autoIncrement: true,
          primaryKey: true
        },

        apiKeyId: {
          type: DataTypes.UUID,

          field:
            "api_key_id"
        },

        endpoint: {
          type: DataTypes.STRING(255),
          allowNull: false
        },

        method: {
          type: DataTypes.STRING(10),
          allowNull: false
        },

        statusCode: {
          type: DataTypes.INTEGER,
          allowNull: false,

          field:
            "status_code"
        }
      },

      {
        sequelize,

        modelName:
          "ApiUsageLog",

        tableName:
          "api_usage_logs",

        underscored: true,

        timestamps: true,

        createdAt:
          "created_at",

        updatedAt: false
      }

    );

    return ApiUsageLog;
  }
}