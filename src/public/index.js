const base64 = "data:image/png;base64,";
const socket = new WebSocket("ws://localhost:9000");

function createDiv(name, image, date) {
  const div = document.getElementById("all-users");
  const clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = `${name}-users`;
  document.body.appendChild(clone);
  const username = document.querySelector(`#${clone.id} #username`);
  username.setAttribute("id", name);
  username.textContent = `User name: ${name}`;
  const imagedate = document.querySelector(`#${clone.id} #date`);
  imagedate.id = `${name}-date`;
  imagedate.textContent = date;
  const img = document.querySelector(`#${clone.id} #imageSrc`);
  img.id = `${name}-image`;
  img.src = base64 + image;
  clone.style.display = "block";
}

function checkDiv(name, image, date) {
  const e = document.getElementById(`${name}-users`);
  if (e) {
    document.getElementById(`${name}`).textContent = `User name: ${name}`;
    document.getElementById(`${name}-date`).textContent = date;
    document.getElementById(`${name}-image`).src = base64 + image;
  } else {
    createDiv(name, image, date);
  }
}

socket.onopen = () => { console.log("hello there"); };
socket.onmessage = function (event) {
  const obj = JSON.parse(event.data);
  const fileInfo = obj.file.split("-");
  const username = fileInfo[0];
  const date = obj.file;
  console.log(`Recieved Data form server: ${obj.file}`);
  checkDiv(username, obj.image, date);
};

function getValue() {
  const time = document.getElementById("text").value;
  const internalTime = { name: "time", time };
  socket.send(JSON.stringify(internalTime));
  alert(time);
}

socket.onclose = () => {
  console.log("[Client]: Connection closed");
};

window.addEventListener("beforeunload", () => {
  socket.close();
});
