const fs = require('fs');
const { json } = require('body-parser');
const WebSocket = require('ws').Server;
const mime = require('mime');

const wss = new WebSocket({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    const data = JSON.parse(message);
    console.log(data.name);
    let imageBuffer = new Buffer(data.image, "base64");
    let fileName = "image.png";
    try {
      fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
    } catch (e) {
      next(e);
    }
  });

  ws.send('8000')

});
