function checkUser(name) {
  const UserArray = [{ name: "User1" }, { name: "User2" }, { name: "User3" }];
  const value = UserArray.find((val) => val.name === name);
  if (value && value.name === name) {
    return true;
  }
  return false;
}
module.exports = checkUser;
