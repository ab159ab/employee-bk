const knex = require("../Database/db");

async function getUserSession() {
  let data = "";
  data = await knex.select("user_login", "start_session", "end_session").from("sessions")
    .innerJoin("users", "sessions.user_id", "users.uuid");
  // console.log(Promise.resolve(data));
  return data;
}
module.exports = { getUserSession };
