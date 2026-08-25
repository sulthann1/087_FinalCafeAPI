import { sequelize } from "../config/database.js";

import User from "./User.js";
import ApiKey from "./ApiKey.js";
import Cafe from "./Cafe.js";
import ApiUsageLog from "./ApiUsageLog.js";


User.initModel(sequelize);
ApiKey.initModel(sequelize);
Cafe.initModel(sequelize);
ApiUsageLog.initModel(sequelize);


// User → API Keys

User.hasMany(
  ApiKey,
  {
    foreignKey:
      "userId",

    as:
      "apiKeys",

    onDelete:
      "CASCADE"
  }
);


ApiKey.belongsTo(
  User,
  {
    foreignKey:
      "userId",

    as:
      "user"
  }
);


// API Key → Usage Logs

ApiKey.hasMany(
  ApiUsageLog,
  {
    foreignKey:
      "apiKeyId",

    as:
      "usageLogs",

    onDelete:
      "SET NULL"
  }
);


ApiUsageLog.belongsTo(
  ApiKey,
  {
    foreignKey:
      "apiKeyId",

    as:
      "apiKey"
  }
);


export {
  sequelize,
  User,
  ApiKey,
  Cafe,
  ApiUsageLog
};