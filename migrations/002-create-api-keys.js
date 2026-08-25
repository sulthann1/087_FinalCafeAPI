export async function up(
  queryInterface,
  Sequelize
) {

  await queryInterface.createTable(
    "api_keys",
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

      user_id: {
        type:
          Sequelize.UUID,

        allowNull: false,

        references: {
          model:
            "users",

          key:
            "id"
        },

        onDelete:
          "CASCADE"
      },

      name: {
        type:
          Sequelize.STRING(120),

        allowNull: false
      },

      key_hash: {
        type:
          Sequelize.STRING(64),

        allowNull: false,

        unique: true
      },

      key_prefix: {
        type:
          Sequelize.STRING(20),

        allowNull: false
      },

      last_used_at: {
        type:
          Sequelize.DATE
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
    "api_keys"
  );

}