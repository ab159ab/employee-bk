function getTimedName(name) {
  const currentDate = new Date();
  const day = `${currentDate.getMonth() + 1 < 10 ? "0" : ""}${currentDate.getMonth() + 1}`;
  const month = `${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const timeStamp = currentDate.getTime();
  const imgaesDir = `images/${name}/${year}/${month}/${day}/`;
  const fileName = `${name}-${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}.png`;
  const imgPath = `../images/${name}/${year}/${month}/${day}/${fileName}`;
  return [imgaesDir, imgPath];
}
module.exports.getTimedName = getTimedName;
