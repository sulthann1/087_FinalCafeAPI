export async function up(
  queryInterface,
  Sequelize
) {

  await queryInterface.createTable(
    "api_usage_logs",
    {

      id: {
        type:
          Sequelize.BIGINT,

        autoIncrement: true,

        primaryKey: true
      },

      api_key_id: {
        type:
          Sequelize.UUID,

        references: {
          model:
            "api_keys",

          key:
            "id"
        },

        onDelete:
          "SET NULL"
      },

      endpoint: {
        type:
          Sequelize.STRING(255),

        allowNull: false
      },

      method: {
        type:
          Sequelize.STRING(10),

        allowNull: false
      },

      status_code: {
        type:
          Sequelize.INTEGER,

        allowNull: false
      },

      created_at: {
        type:
          Sequelize.DATE,

        allowNull: false,

        defaultValue:
          Sequelize.literal("NOW()")
      }
    }
  );

}


export async function down(
  queryInterface
) {

  await queryInterface.dropTable(
    "api_usage_logs"
  );

}