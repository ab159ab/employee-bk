const dbCrud = require("../dao/userDao");

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

function logOutTime(Date, userName) {
  const logObj = timeArray[0];
  logObj.username = userName;
  logObj.logOutState = "Logged Out";
  logObj.logoutDate = Date;
  console.log("User logged out");
  dbCrud.saveUser(userName, logObj.logInDate, logObj.logoutDate);
}

module.exports = {
  logInTime,
  logOutTime,
};
