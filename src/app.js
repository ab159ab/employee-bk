const fs = require("fs");
// const { json } = require('body-parser');
const WebSocket = require("ws").Server;
const mime = require("mime");

const wss = new WebSocket({ port: 8080 });
const UserArray = [{ name: "Ali" }, { name: "Ahmad" }, { name: "Asad" }];
const currentDate = new Date();
const day = `${currentDate.getMonth() + 1 < 10 ? "0" : ""}${currentDate.getMonth() + 1}`;
const month = `${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const timeStamp = currentDate.getTime();

function checkUser(name) {
  const value = UserArray.find((val) => val.name === name);
  if (value === undefined) {
    return 0;
  }

  return 1;
}
// console.log(`${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}`);
// let number = 10;
const ImgaesDir = `./images/${year}/${month}/${day}`;
wss.on("connection", (ws) => {
  let number;
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);

    const numbr = checkUser(data.name);
    console.log(numbr);
    // timeStamp = 100000;
    // console.log(timeStamp);
    if (numbr === 1) {
      ws.send("2000");
    } else {
      ws.send("404");
    }
    // let imageBuffer = new Buffer(data.image, "base64");
    const fileName = `${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}`;
    try {
      fs.mkdirSync(ImgaesDir, { recursive: true });
      // fs.writeFileSync("./images" + fileName, imageBuffer, 'utf8');
    } catch (e) {
      console.log(e);
    }
  });
});
