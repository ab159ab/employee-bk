function checkUser(name) {
  const UserArray = [{ name: "User1" }, { name: "User2" }, { name: "User3" }];
  const value = UserArray.find((val) => val.name === name).name;
  if (name === value) {
    return true;
  }

  return false;
}
module.exports = checkUser;
