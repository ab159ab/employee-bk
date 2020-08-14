const socket = new WebSocket("ws://localhost:7900");

function getMinutes(startDate, endDate) {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const totalMilliseconds = endTime - startTime;
  const minutes = totalMilliseconds / 60000;
  const roundOffMinutes = Math.round(minutes * 100) / 100;
  return roundOffMinutes;
}
function getTime(date) {
  const event = new Date(date);
  const time = event.toLocaleTimeString();
  return time;
}
function getTotalMinutes(data) {
  let totalMinutes = null;
  data.forEach((element) => {
    totalMinutes += getMinutes(element.start_session, element.end_session);
  });
  const totalRoundOffMinutes = Math.round(totalMinutes * 100) / 100;
  return totalRoundOffMinutes;
}

function getHtml(data) {
  let tableBody = "";
  const tableHead = `<thead>
                    <tr>
                        <th>User</th>
                        <th>Start Time </th>
                        <th>End Time </th>
                        <th>Session(minutes)</th>
                    </tr>
                </thead>`;
  data.forEach((element) => {
    const minutes = getMinutes(element.start_session, element.end_session);
    const startTime = getTime(element.start_session);
    const endTime = getTime(element.end_session);
    tableBody += `
            <tbody>
                <tr>
                    <td style="text-align: center;">${element.user_login}</td>
                    <td style="text-align: center;">${startTime}</td>
                    <td style="text-align: center;">${endTime}</td>
                    <td style="text-align: center;">${minutes}</td>
                </tr>
            </tbody>`;
  });

  const table = tableHead + tableBody;
  console.log(table);
  return table;
}

function createDiv(name, data) {
  const div = document.getElementById("user-sessions");
  const clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = `${name}-users`;
  document.body.appendChild(clone);
  const table = document.querySelector(`#${clone.id} #user-session-table`);
  const html = getHtml(data);
  console.log(html);
  table.id = `${name}-session-table`;
  table.innerHTML = html;
  const totalSession = document.querySelector(`#${clone.id} #user-total`);
  totalSession.id = `${name}-total`;
  const totalMinutes = getTotalMinutes(data);
  totalSession.textContent = `Total(minutes): ${totalMinutes}`;
  clone.style.display = "block";
}

const groupBy = (array, key) => array.reduce((result, currentValue) => {
  const resultAssigned = { ...result };
  (resultAssigned[currentValue[key]] = resultAssigned[currentValue[key]] || [])
    .push(
      currentValue,
    );
  return resultAssigned;
}, {});

socket.onopen = () => { console.log("hello there"); };

socket.onmessage = function (event) {
  const obj = JSON.parse(event.data);

  const dataGroupedByName = groupBy(obj, "user_login");

  const keys = Object.keys(dataGroupedByName);
  const values = Object.values(dataGroupedByName);
  for (let i = 0; i < keys.length; i += 1) {
    const userData = values[i];
    createDiv(keys[i], userData);
  }
};

socket.onclose = () => {
  console.log("[Client]: Connection closed");
};

window.addEventListener("beforeunload", () => {
  socket.close();
});
