import {
  DataTypes,
  Model
} from "sequelize";

export default class Cafe extends Model {

  static initModel(sequelize) {

    Cafe.init(

      {
        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true
        },

        osmId: {
          type: DataTypes.BIGINT,
          unique: true,

          field:
            "osm_id"
        },

        osmType: {
          type: DataTypes.STRING(20),

          field:
            "osm_type"
        },

        name: {
          type: DataTypes.STRING(200),
          allowNull: false
        },

        address: {
          type: DataTypes.TEXT
        },

        city: {
          type: DataTypes.STRING(100),
          defaultValue:
            "Yogyakarta"
        },

        district: {
          type: DataTypes.STRING(120)
        },

        latitude: {
          type: DataTypes.DECIMAL(10, 7),
          allowNull: false
        },

        longitude: {
          type: DataTypes.DECIMAL(10, 7),
          allowNull: false
        },

        phone: {
          type: DataTypes.STRING(80)
        },

        website: {
          type: DataTypes.TEXT
        },

        openingHours: {
          type: DataTypes.TEXT,

          field:
            "opening_hours"
        },

        cuisine: {
          type: DataTypes.STRING(150)
        },

        wheelchair: {
          type: DataTypes.STRING(50)
        },

        internet: {
          type: DataTypes.STRING(50)
        },

        outdoorSeating: {
          type: DataTypes.STRING(50),

          field:
            "outdoor_seating"
        },

        source: {
          type: DataTypes.STRING(30),
          defaultValue:
            "OpenStreetMap"
        },

        osmTimestamp: {
          type: DataTypes.DATE,

          field:
            "osm_timestamp"
        }
      },

      {
        sequelize,

        modelName:
          "Cafe",

        tableName:
          "cafes",

        underscored: true,

        timestamps: true,

        createdAt:
          "created_at",

        updatedAt:
          "updated_at"
      }

    );

    return Cafe;
  }
}