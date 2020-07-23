const fs = require("fs");
const WebSocket = require("ws").Server;
const mime = require("mime");
const path = require("path");
const getTimedNames = require("./components/date");
const check = require("./components/checkUser");

const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  let number;
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      ws.send("8000");
      if(data.image !== "image"){
        const images = Buffer.from(data.image, "base64");
        const timedNames = getTimedNames.getTimedName(data.name);
        const p = path.join(__dirname, timedNames[1]);
        // fs.mkdirSync(timedNames[0], { recursive: true });
        // fs.writeFileSync(p, images, "utf8");
        fs.mkdir(timedNames[0], { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFile(p, images, (err) => {
            if (err) throw err;
            console.log('File saved!');
          });
        });
      }
    } else {
      ws.send("404");
    }
  });
});
