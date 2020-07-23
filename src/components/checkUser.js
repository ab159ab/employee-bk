function checkUser(name) {
const UserArray = [{ name: "Ali" }, { name: "Ahmad" }, { name: "Asad" }];
  const value = UserArray.find((val) => val.name === name);
  if (value === undefined) {
    return 0;
  }
  return 1;
}
module.exports.checkUser = checkUser;