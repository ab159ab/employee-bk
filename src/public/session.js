const socket = new WebSocket("ws://localhost:7900");

function getMinutes(startDate, endDate) {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const totalMilliseconds = endTime - startTime;
  let minutes = totalMilliseconds / 60000;
  let roundOffMinutes = Math.round(minutes * 100) / 100
  return roundOffMinutes;
}
function getTotalMinutes(data){
    let totalMinutes = null;
    data.forEach(element => {
        totalMinutes += getMinutes(element.start_session,element.end_session);
    });
    let totalRoundOffMinutes = Math.round(totalMinutes * 100) / 100    
    return totalRoundOffMinutes;
}
function getHtml(data){
    let tableBody = "";
    let tableHead= `<thead>
                    <tr>
                        <th>User</th>
                        <th>Session(minutes)</th>
                    </tr>
                </thead>`;
    data.forEach(element => {
        let minutes = getMinutes(element.start_session,element.end_session);
        tableBody += `
            <tbody>
                <tr>
                    <td style="text-align: center;">${element.user_login}</td>
                    <td style="text-align: center;">${minutes}</td>
                </tr>
            </tbody>`
    });
    let table = tableHead +tableBody;
    console.log(table);
    return table;
}

function createDiv(name, data) {
  const div = document.getElementById("user-sessions");
  const clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = `${name}-users`;
  document.body.appendChild(clone);
  const table = document.querySelector(`#${clone.id} #user-session-table`);
  let html = getHtml(data);
  console.log(html);
  table.id = `${name}-session-table`;
  table.innerHTML = html;
  const totalSession = document.querySelector(`#${clone.id} #user-total` )
  totalSession.id =`${name}-total`;
  let totalMinutes =  getTotalMinutes(data);
  totalSession.textContent = `Total(minutes): ${totalMinutes}`;
  clone.style.display = "block";
}


// function totalSessionInMinutes() {

// }

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
  console.log(obj);
  // Group by color as key to the person array
  const dataGroupedByName = groupBy(obj, "user_login");

  console.log(dataGroupedByName);

  for (const username in dataGroupedByName) { 
    let userData = dataGroupedByName[username];
    createDiv(username,userData);
  }
};

socket.onclose = () => {
  console.log("[Client]: Connection closed");
};

window.addEventListener("beforeunload", () => {
  socket.close();
});
