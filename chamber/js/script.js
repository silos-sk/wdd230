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

// DISCOVER PAGE //

// Last visit
const lvMessage = document.querySelector("#lastVisit");
const lv = localStorage.getItem("lastVisit");
const now = Date.now();

console.log(`Last visit: ${lv}`);
console.log(`Today: ${now}`);
//1000 milliseconds in 1 second, 60 seconds in 1 minute, 60 minutes in an hour, 24 hours in 1 day.
const msInDay = 1000 * 60 * 60 * 24;
console.log(`milliseconds in a day is ${msInDay}`);

let difference = Math.round((now - lv) / msInDay);

console.log(difference);

localStorage.setItem("lastVisit", Date.now());

if (lv == null) {
  lvMessage.textContent = `This is your first visit!`;
} else {
  lvMessage.textContent = `Last visit to this page: ${difference} days.`;
}

// LAZY LOAD IMAGES

// get all imgs with data-src attribute
const imagesToLoad = document.querySelectorAll("[data-src]");

// optional parameters being set or the IntersectionalObserver
const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 50px 0px",
};

const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};

// first check to see if Intersection Observer is supported
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });

  // Loop through each img and check status of load if necessary
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  // just load ALL images if not supported
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}

// JOIN PAGE CURRENT DATE AND TIME
const joinDate = document.querySelector("#joinDate");
joinDate.textContent = currentDate;

const time = new Date().toLocaleTimeString();

const joinTime = document.querySelector("#joinTime");
joinTime.textContent = time;
