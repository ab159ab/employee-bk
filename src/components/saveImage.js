const path = require("path");
const fs = require("fs");
const getTimedName = require("./date");

function saveImage(image, name) {
  if (image !== "image") {
    const images = Buffer.from(image, "base64");
    const timedNames = getTimedName(name);
    const p = path.join(__dirname, timedNames.imgPath);
    fs.mkdir(timedNames.imgaesDir, { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(p, images, () => {
        console.log("File saved!");
      });
    });
    return timedNames.fileName;
  }
  console.log("Image Not Received");
  return null;
}
module.exports = saveImage;
