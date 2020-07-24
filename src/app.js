const WebSocket = require("ws").Server;
const check = require("./components/checkUser");
const saveImg = require("./components/saveImage")

const wss = new WebSocket({ port: 8080 });
wss.on("connection", (ws) => {
  let number;
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);
    const numbr = check.checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      setTimeout(()=>{
        ws.send("Send Images");
      },10000)
    } else {
      ws.send("404");
    }
saveImg.saveImage(data.image,data.name)
  });
});
