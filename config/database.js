import "dotenv/config";
import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(
  process.env.POSTGRES_URL,
  {
    dialect: "postgres",

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    logging: console.log
  }
);