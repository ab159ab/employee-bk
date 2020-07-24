const WebSocket = require("ws").Server;
const opn = require("opn");
const { json } = require("body-parser");
const { Socket } = require("dgram");
const getTimedNames = require("./components/date");
const check = require("./components/checkUser");
const saveImg = require("./components/saveImage");

const wssClient = new WebSocket({ port: 9000 });
wssClient.on("connection", (websocket) => {
  console.log("connection opened on port 9000");
});
const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  let number;
  let userName;
  let isClosed = false;
  opn(`${__dirname}\\public\\index.html`);
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    userName = data.name;
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      setTimeout(() => {
        ws.send("Send Images");
      }, 5000);
    } else {
      ws.send("404");
    }
    if (data.image !== "image") {
      wssClient.clients.forEach((client) => {
        const obj = { date: new Date(), image: data.image };
        client.send(JSON.stringify(obj));
        console.log(client);
      });
    }
    saveImg.saveImage(data.image, data.name);
  });
  ws.on("close", () => {
    isClosed = true;
    console.log(`[Server]: Connection is Closed with client: ${userName}`);
  });
});
