console.log("working");

function updateClock() {
  const timeElement = document.getElementById("time");
  const dateElement = document.getElementById("date");

  const now = new Date();
  const hours = now.getHours() % 12 || 12; // whenever it is 0 as it is truthy and falsy it will alwasys return truthy value not 0.
  const minutes = now.getMinutes().toString().padStart(2, "0"); //01,02 --->10
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  timeElement.textContent = `${hours}:${minutes}:${seconds}:${ampm}`;

  const date = now.toLocaleDateString(undefined, options);

  dateElement.textContent = date;
}

setInterval(updateClock, 1000);

updateClock(); //this will call first when reloading the page.
//or
// window.onload(updateClock());
