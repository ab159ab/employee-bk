const path = require("path");
const fs = require("fs");
const getTimedNames = require("./date");

function saveImage(image, name) {
  if (image !== "image") {
    const images = Buffer.from(image, "base64");
    const timedNames = getTimedNames.getTimedName(name);
    const p = path.join(__dirname, timedNames[1]);
    fs.mkdir(timedNames[0], { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(p, images, () => {
        console.log("File saved!");
      });
    });
    return timedNames[2];
  }
  console.log("Image Not Received");
  return null;
}
module.exports.saveImage = saveImage;
