const WebSocket = require("ws").Server;
const open = require("open");
const checkUser = require("./components/checkUser");
const saveImage = require("./components/saveImage");
const userLogs = require("./components/userLogs");
const config = require("../configs/config");

const { milliSeconds } = config;
let { inactivityTime } = config;
let newTime = config.inactivityTime;
let screenShotInterval = (config.screenShotIntervalSeconds) * milliSeconds;
const wssClient = new WebSocket({ port: config.browserClientPort });
wssClient.on("connection", (websocket) => {
  websocket.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.name === "InacivtiyTime") {
      newTime = data.time;
    }
    if (data.name === "ScreenshotTime") {
      screenShotInterval = (data.time) * milliSeconds;
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
  setInterval(() =>{ 
    if (newTime !== inactivityTime) {
      const messageObject = {
        internalTime: newTime,
        imageStatus: "send",
      };
      ws.send(JSON.stringify(messageObject));
      inactivityTime = newTime;
    }
  } , milliSeconds);
  
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    userName = data.name;
    if (checkUser(userName)) {
    
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
