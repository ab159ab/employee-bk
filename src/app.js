const fs = require("fs");
const WebSocket = require("ws").Server;
const mime = require("mime");
const path = require("path");
const opn = require("opn");
const { json } = require("body-parser");
const userLogs = require("./components/userLogs");
const getTimedNames = require("./components/date");
const check = require("./components/checkUser");

const wssClient = new WebSocket({ port: 9000 });
const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  let number;
  let userName;
  userLogs.logInTime(new Date());
  // opn(`${__dirname}\\public\\index.html`);
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    userName = data.name;
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      ws.send("8000");
      if (data.image !== "image") {
        const currentDate = new Date();
        wssClient.on("connection", (websocket) => {
          const obj = { date: currentDate, image: data.image };
          websocket.send(JSON.stringify(obj));
        });
        const images = Buffer.from(data.image, "base64");
        const timedNames = getTimedNames.getTimedName(data.name);
        const p = path.join(__dirname, timedNames[1]);
        // fs.mkdirSync(timedNames[0], { recursive: true });
        // fs.writeFileSync(p, images, "utf8");
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
  ws.on("close", () => {
    userLogs.logOutTime(new Date(), userName);
    console.log(`[Server]: Connection is Closed with client: ${userName}`);
  });
});
