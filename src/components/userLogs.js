const db = require("../Database/db");

const timeArray = [];
const logTime = {
  loginState: null,
  username: null,
  logInDate: null,
  logOutState: null,
  logoutDate: null,
  sessionTime: null,
};

function logInTime(Date) {
  logTime.loginState = "Logged In";
  logTime.logInDate = Date;
  timeArray.push(logTime);
  console.log("User logged in");
}

// save sessions
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

function logOutTime(Date, userName) {
  const logObj = timeArray[0];
  logObj.username = userName;
  logObj.logOutState = "Logged Out";
  logObj.logoutDate = Date;
  console.log("User logged out");
  saveUser(userName, logObj.logInDate, logObj.logoutDate);
}

module.exports = {
  logInTime,
  logOutTime,
};
