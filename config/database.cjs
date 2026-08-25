require("dotenv").config();

module.exports = {
  development: {
    url: process.env.POSTGRES_URL,

    dialect: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    logging: false
  },

  test: {
    url: process.env.POSTGRES_URL,

    dialect: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    logging: false
  },

  production: {
    url: process.env.POSTGRES_URL,

    dialect: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    logging: false
  }
};