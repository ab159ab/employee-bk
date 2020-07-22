const fs = require("fs");
const WebSocket = require("ws").Server;
const mime = require("mime");
const { decodeBase64 } = require("bcryptjs");
const path = require("path");

const wss = new WebSocket({ port: 8080 });
const UserArray = [{ name: "Ali" }, { name: "Ahmad" }, { name: "Asad" }];

function checkUser(name) {
  const value = UserArray.find((val) => val.name === name);
  if (value === undefined) {
    return 0;
  }

  return 1;
}
wss.on("connection", (ws) => {
  let number;
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log(data.name);

    const numbr = checkUser(data.name);
    console.log(numbr);
    if (numbr === 1) {
      ws.send("8000");
    } else {
      ws.send("404");
    }
    // if (data.image != null) {
    //   try {

      const currentDate = new Date();
      const day = `${currentDate.getMonth() + 1 < 10 ? "0" : ""}${currentDate.getMonth() + 1}`;
      const month = `${currentDate.getDate() < 10 ? "0" : ""}${currentDate.getDate()}`;
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const timeStamp = currentDate.getTime();
    const images = Buffer.from(data.image, "base64");
    const ImgaesDir = `images/${data.name}/${year}/${month}/${day}/`;
    const fileName = `${data.name}-${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}.png`;
    const p = path.join(__dirname, `../images/${data.name}/${year}/${month}/${day}/${fileName}`);
    fs.mkdirSync(ImgaesDir, { recursive: true });
    fs.writeFileSync(p, images, "utf8");

    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
  });
});
// console.log(ImgaesDir)
