const WebSocket = require("ws").Server;
const opn = require("opn");
<<<<<<< HEAD
const { json } = require("body-parser");
const userLogs = require("./components/userLogs");
=======
const path = require("path");
>>>>>>> 28095b6edb103597798e7384395e18000b0e43ee
const getTimedNames = require("./components/date");
const check = require("./components/checkUser");
const saveImg = require("./components/saveImage");

const wssClient = new WebSocket({ port: 9000 });
const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
<<<<<<< HEAD
  let number;
  let userName;
  userLogs.logInTime(new Date());
  // opn(`${__dirname}\\public\\index.html`);
=======
  opn(path.join(__dirname, "public", "index.html"));
>>>>>>> 28095b6edb103597798e7384395e18000b0e43ee
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    userName = data.name;
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
<<<<<<< HEAD
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
=======
      setTimeout(() => {
        ws.send("Send Images");
      }, 5000);
>>>>>>> 28095b6edb103597798e7384395e18000b0e43ee
    } else {
      ws.send("404");
    }
    if (data.image !== "image") {
      wssClient.on("connection", (websocket) => {
        websocket.send(data.image);
      });
    }
    saveImg.saveImage(data.image, data.name);
  });
  ws.on("close", () => {
    userLogs.logOutTime(new Date(), userName);
    console.log(`[Server]: Connection is Closed with client: ${userName}`);
  });
});
