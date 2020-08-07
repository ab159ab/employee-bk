function createDiv(name, image, date) {
  const div = document.getElementById("all-users");
  const clone = div.cloneNode(true); // true means clone all childNodes and all event handlers
  clone.id = `${name}-users`;
  document.body.appendChild(clone);
  const username = document.querySelector(`#${clone.id} #username`);
  username.setAttribute("id", name);
  // username.textContent = `User name: ${name}`;
  const imagedate = document.querySelector(`#${clone.id} #date`);
  imagedate.id = `${name}-date`;
  // imagedate.textContent = date;
  const img = document.querySelector(`#${clone.id} #imageSrc`);
  img.id = `${name}-image`;
  // img.src = base64 + image;
  clone.style.display = "block";
}
