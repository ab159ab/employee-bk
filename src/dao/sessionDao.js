const knex = require("../Database/db");

async function getUserSession() {
  let data = "";
  data = await knex.raw(`select u.user_login as username,
   s.start_session as start,
   s.end_session as end
    from sessions s inner join users u on u.uuid = s.user_id`).then((retdata) => {
    const jsonData = JSON.stringify(retdata.rows);
    return jsonData;
  });
  // console.log(data);
  return data;
}
module.exports = { getUserSession };
