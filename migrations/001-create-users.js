export async function up(queryInterface, Sequelize) {

  await queryInterface.createTable(
    "users",
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

      name: {
        type:
          Sequelize.STRING(120),

        allowNull: false
      },

      email: {
        type:
          Sequelize.STRING(180),

        allowNull: false,

        unique: true
      },

      password_hash: {
        type:
          Sequelize.TEXT,

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
    "users"
  );

}