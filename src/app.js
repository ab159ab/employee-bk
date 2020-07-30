const WebSocket = require("ws").Server;
const open = require("open");
const { json } = require("body-parser");
const { Socket } = require("dgram");
const getTimedNames = require("./components/date");
const checkUser = require("./components/checkUser");
const saveImage = require("./components/saveImage");
const userLogs = require("./components/userLogs");
const config = require("../configs/config");

let  inactivityTime  = config.inactivityTime;
let screenShotInterval = config.screenShotIntervalSeconds;
const wssClient = new WebSocket({ port: config.browserClientPort });
wssClient.on("connection", (websocket) => {
  websocket.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.name === "InacivtiyTime") {
      inactivityTime = data.time;
    }
    if (data.name === "ScreenshotTime") {
      screenShotInterval = (data.time) * 1000;
    }
  });
  console.log("connection opened on port 9000");
});

const wss = new WebSocket({ port: config.javaClientPort });

wss.on("connection", (ws) => {
  let userName;
  let isClosed = false;
  const sessionStart = new Date().toISOString();
  userLogs.logInTime(sessionStart);
  open(`${__dirname}\\public\\index.html`);
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    userName = data.name;
    const isPresent = checkUser(data.name);
    if (isPresent === true) {
      const messageObject = {
        internalTime: inactivityTime,
        imageStatus: "send",
      };
      setTimeout(() => {
        ws.send(JSON.stringify(messageObject));
      }, screenShotInterval);
    } else {
      ws.send("404");
    }
    if (data.image !== "image") {
      const fileName = saveImage(data.image, data.name);
      wssClient.clients.forEach((client) => {
        const obj = { file: fileName, image: data.image };
        client.send(JSON.stringify(obj));
      });
    }
  });
  ws.on("close", () => {
    const sessionEnd = new Date().toISOString();
    isClosed = true;
    console.log(`[Server]: Connection is Closed with client: ${userName}`);
    userLogs.logOutTime(sessionEnd, userName);
  });
});
