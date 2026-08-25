export async function up(
  queryInterface,
  Sequelize
) {

  await queryInterface.createTable(
    "cafes",
    {

      id: {
        type:
          Sequelize.UUID,

        defaultValue:
          Sequelize.literal(
            "gen_random_uuid()"
          ),

        primaryKey: true
      },

      osm_id: {
        type:
          Sequelize.BIGINT,

        unique: true
      },

      osm_type: {
        type:
          Sequelize.STRING(20)
      },

      name: {
        type:
          Sequelize.STRING(200),

        allowNull: false
      },

      address: {
        type:
          Sequelize.TEXT
      },

      city: {
        type:
          Sequelize.STRING(100),

        defaultValue:
          "Yogyakarta"
      },

      district: {
        type:
          Sequelize.STRING(120)
      },

      latitude: {
        type:
          Sequelize.DECIMAL(10, 7),

        allowNull: false
      },

      longitude: {
        type:
          Sequelize.DECIMAL(10, 7),

        allowNull: false
      },

      phone: {
        type:
          Sequelize.STRING(80)
      },

      website: {
        type:
          Sequelize.TEXT
      },

      opening_hours: {
        type:
          Sequelize.TEXT
      },

      cuisine: {
        type:
          Sequelize.STRING(150)
      },

      wheelchair: {
        type:
          Sequelize.STRING(50)
      },

      internet: {
        type:
          Sequelize.STRING(50)
      },

      outdoor_seating: {
        type:
          Sequelize.STRING(50)
      },

      source: {
        type:
          Sequelize.STRING(30),

        defaultValue:
          "OpenStreetMap"
      },

      osm_timestamp: {
        type:
          Sequelize.DATE
      },

      created_at: {
        type:
          Sequelize.DATE,

        allowNull: false,

        defaultValue:
          Sequelize.literal("NOW()")
      },

      updated_at: {
        type:
          Sequelize.DATE,

        allowNull: false,

        defaultValue:
          Sequelize.literal("NOW()")
      }
    }
  );


  await queryInterface.addIndex(
    "cafes",
    ["name"]
  );


  await queryInterface.addIndex(
    "cafes",
    ["district"]
  );


  await queryInterface.addIndex(
    "cafes",
    ["latitude", "longitude"]
  );

}


export async function down(
  queryInterface
) {

  await queryInterface.dropTable(
    "cafes"
  );

}