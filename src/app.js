const fs = require("fs");
const WebSocket = require("ws").Server;
const mime = require("mime");
const path = require("path");
const opn = require("opn");
const getTimedNames = require("./components/date");
const check = require("./components/checkUser");

const wssClient = new WebSocket({ port: 9000 });
const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  let number;
  // opn(`${__dirname}\\public\\index.html`);
  opn(path.join(__dirname, "public", "index.html"));
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      setTimeout(() => {
        ws.send("Send Images");
      }, 5000);

      if (data.image !== "image") {
        wssClient.on("connection", (websocket) => {
          websocket.send(data.image);
        });
        const images = Buffer.from(data.image, "base64");
        const timedNames = getTimedNames.getTimedName(data.name);
        const p = path.join(__dirname, timedNames[1]);
        fs.mkdir(timedNames[0], { recursive: true }, (err) => {
          if (err) throw err;
          fs.writeFile(p, images, (error) => {
            if (err) throw err;
            console.log("File saved!");
          });
        });
      }
    } else {
      ws.send("404");
    }
  });
});
