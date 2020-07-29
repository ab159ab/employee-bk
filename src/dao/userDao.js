const db = require("../Database/db");

function saveSession(startSession, endSession, userId) {
  db.insert({
    start_session: startSession,
    end_session: endSession,
    user_id: userId,
  }).into("sessions")
    .then(() => {
      console.log("Data inserted");
    });
}
// save users
function saveUser(userName, startSession, endSession) {
  let userId = null;
  db.insert({ user_login: userName })
    .into("users").returning("uuid").then((id) => {
      console.log(id);
      userId = parseInt(id, 10);
      saveSession(startSession, endSession, userId);
    });
}

module.exports = { saveUser };
