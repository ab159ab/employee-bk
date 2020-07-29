const db = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    password: "cq123",
    host: "localhost",
    port: 5432,
    database: "employee",
  },
});

module.exports = db;
