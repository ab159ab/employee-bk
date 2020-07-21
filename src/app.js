const fs = require('fs');
// const { json } = require('body-parser');
const WebSocket = require('ws').Server;
const mime = require('mime');

const wss = new WebSocket({ port: 8080 });
const UserArray = [{name:'Ali'},{name:'Ahmad'},{name:'Asad'}];
let currentDate = new Date();
let day = `${currentDate.getMonth()+1 < 10 ? '0' : ''}${currentDate.getMonth()+1}`;
let month = `${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}`;
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let timeStamp = currentDate.getTime();
// console.log(`${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}`);
// let number = 10;
const ImgaesDir = `./images/${year}/${month}/${day}`;
wss.on('connection', function connection(ws) {
let number;
ws.on('message', function (message) {
    const data = JSON.parse(message);
     console.log(data.name);
    
let numbr = checkUser(data.name);
console.log(numbr);
// timeStamp = 100000;
// console.log(timeStamp);
if(numbr === 1){
  ws.send("2000")
}
else{
  ws.send("404")
}
// let imageBuffer = new Buffer(data.image, "base64");
let fileName = `${year}-${month}-${day}-${hours}${minutes}-${seconds}-${timeStamp}`;
try {
  fs.mkdirSync(ImgaesDir,{recursive: true});
// fs.writeFileSync("./images" + fileName, imageBuffer, 'utf8');
} catch (e) {
console.log(e);
}
  });
});

function checkUser(name){
  let value = UserArray.find(val => val.name === name);
    if(value === undefined){
      return 0;
    }
    else{
      return 1;
    }
}
// let chk = checkUser('Ali')
//  console.log(chk);
// console.log(timeStamp)