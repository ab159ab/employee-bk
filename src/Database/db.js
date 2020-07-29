const knex = require("knex");
const config = require("../../configs/config");

const dbConfig = knex({
  client: config.db.client,
  connection: {
    user: config.db.user,
    password: config.db.password,
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
  },
});

module.exports = dbConfig;
