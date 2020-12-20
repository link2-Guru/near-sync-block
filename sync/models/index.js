"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const dbConfig = require(__dirname + "/../src/config");
const db = {};

const sequelizeLegacySyncBackend = new Sequelize(
  dbConfig.legacySyncDatabase.database,
  dbConfig.legacySyncDatabase.username,
  dbConfig.legacySyncDatabase.password,
  {
    ...dbConfig.legacySyncDatabase
  }
);

const sequelizeLegacySyncBackendReadOnly = new Sequelize(
  dbConfig.legacySyncDatabase.database,
  dbConfig.legacySyncDatabase.username,
  dbConfig.legacySyncDatabase.password,
  {
    ...dbConfig.legacySyncDatabase,
    dialectOptions: {
      ...dbConfig.legacySyncDatabase.dialectOptions,
      // Set SQLITE_OPEN_READONLY mode. Read more:
      // * http://www.sqlite.org/c3ref/open.html
      // * http://www.sqlite.org/c3ref/c_open_autoproxy.html
      mode: 1,
    },
    logging: false,
  }
);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(
      path.join(__dirname, file)
    )(sequelizeLegacySyncBackend, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeLegacySyncBackend = sequelizeLegacySyncBackend;
db.sequelizeLegacySyncBackendReadOnly = sequelizeLegacySyncBackendReadOnly;
db.Sequelize = Sequelize;

db.resetDatabase = function resetDatabase({ saveBackup }) {
  
};

module.exports = db;
