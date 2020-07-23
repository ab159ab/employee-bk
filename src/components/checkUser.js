function checkUser(name) {
  const UserArray = [{ name: "User1" }, { name: "User2" }, { name: "User3" }];
  const value = UserArray.find((val) => val.name === name);
  if (value === undefined) {
    return 0;
  }
  return 1;
}
module.exports.checkUser = checkUser;
