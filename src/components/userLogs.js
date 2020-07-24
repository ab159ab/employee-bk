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
}
function logOutTime(Date, userName) {
  const logObj = timeArray[0];
  logObj.username = userName;
  logObj.logOutState = "Logged Out";
  logObj.logoutDate = Date;

  // calculate session time
  console.log(logObj);
  // Save this object to postgre database
}

// const userLogs = require("./components/userLogs");
// userLogs.logInTime(new Date());
// userLogs.logOutTime(new Date(), userName);
module.exports = {
  logInTime,
  logOutTime,
};
