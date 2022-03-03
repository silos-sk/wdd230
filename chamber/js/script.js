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

// DIRECTORY
const requestURL = "data/data.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject); // temporary checking for valid response and data parsing
    const companies = jsonObject["companies"];
    companies.forEach(displayCompanies);
  });

function displayCompanies(company) {
  // Create elements to add to the document
  let card = document.createElement("section");
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let link = document.createElement("a");
  let img = document.createElement("img");
  let dir = document.querySelector("#directory");
  let classDir = document.querySelector(".dir");
  let dir1 = document.querySelectorAll(".dir1");
  let dir1Even = document.querySelectorAll(".dir1:nth-child(even)");
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  // Change the textContent property of the elements to contain company info
  para1.textContent = `${company.name}`;
  para2.textContent = `${company.address}`;
  para3.textContent = `${company.phone}`;
  link.textContent = `${company.website}`;
  link.setAttribute("href", `http://${company.website}`);
  img.setAttribute("src", `${company.logo}`);
  img.setAttribute("alt", `${company.name}`);
  
  // Default view (grid)
  function defaultView() {
    // Add/append the section(card)
    card.appendChild(img);
    card.appendChild(para1);
    para1.classList.add("hidden");
    card.appendChild(para2);
    card.appendChild(para3);

    card.appendChild(link);
    card.classList.add("dir1");

    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector("div.dir").appendChild(card);
    if (vw >= 1024) {
      classDir.classList.add("dir-lrg");
    }
  }

  // Call defaultView function
  defaultView();

  // Grid and List View Layout Buttons + Event Listeners
  const gridViewbtn = document.querySelector(".fa-table-cells");
  const listViewbtn = document.querySelector(".fa-list");

  listViewbtn.addEventListener("click", function () {
    listView();
  });
  gridViewbtn.addEventListener("click", function () {
    defaultView();
    listViewRemove();
  });

  // List View changes
  function listView() {
    para1.classList.remove("hidden");
    para1.style.fontWeight = "bold";
    img.classList.add("hidden");

    listViewbtn.classList.add("view-active");
    gridViewbtn.classList.remove("view-active");

    dir1Even.forEach(even => {
      even.classList.add("list-view");
      console.log(even);
    });

    card.style.border = 0;

    if (vw >= 560) {
      dir.classList.add("list-layout-med");
      dir1.forEach(section => {
        section.classList.add("list-col");
      });
      classDir.classList.remove("dir-lrg");
    } 
  }

  // Back to default changes
  function listViewRemove() {
    para1.classList.add("hidden");
    img.classList.remove("hidden");
    listViewbtn.classList.remove("view-active");
    gridViewbtn.classList.add("view-active");
    dir1Even.forEach(even => {
      even.classList.remove("list-view");
    });
    card.style.border = null;

    if (vw >= 560) {
      dir.classList.remove("list-layout-med");
      dir1.forEach(section => {
        section.classList.remove("list-col");
      });
    }
  }
}
