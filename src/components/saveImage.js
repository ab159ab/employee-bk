const WebSocket = require("ws").Server;
const path = require("path");
const fs = require("fs");
const getTimedNames = require("./date");
const wssClient = require("../app");

function saveImage(image, name) {
  if (image !== "image") {
    wssClient.client.on("connection", (websocket) => {
      websocket.send(image);
    });
    const images = Buffer.from(image, "base64");
    const timedNames = getTimedNames.getTimedName(name);
    const p = path.join(__dirname, timedNames[1]);
    fs.mkdir(timedNames[0], { recursive: true }, (err) => {
      if (err) throw err;
      fs.writeFile(p, images, () => {
        console.log("File saved!");
      });
    });
  } else {
    console.log("Image Not Received");
  }
}
module.exports.saveImage = saveImage;
