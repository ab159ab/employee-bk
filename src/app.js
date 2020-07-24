const WebSocket = require("ws").Server;
const opn = require("opn");
const path = require("path");
const check = require("./components/checkUser");
const saveImg = require("./components/saveImage");

const wssClient = new WebSocket({ port: 9000 });
const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  opn(path.join(__dirname, "public", "index.html"));
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      // setTimeout(() => {
      ws.send("Send Images");
      // }, 5000);
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
});

module.exports.client = wssClient;
