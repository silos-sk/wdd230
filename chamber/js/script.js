let completeDate = new Date();
const daysName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Header Date display
const day = daysName[completeDate.getDay()];
const todaysDate = completeDate.getDate();
const month = monthName[completeDate.getMonth()];
const year = completeDate.getFullYear();

const currentDate = `${day}, ${todaysDate} ${month} ${year}`;

document.querySelector("#currentDate").textContent = currentDate;

// Message Date
const dayNum = completeDate.getDay();
const message = document.querySelector("#message");

if (dayNum == 1 || dayNum == 2) {
  message.classList.add("show");
} else {
  message.classList.add("hide");
}

// Footer date display
document.querySelector("#year").textContent = year;

document.getElementById("lu").textContent =
  " Last Updated: " + document.lastModified;

// Hamburger Nav
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;