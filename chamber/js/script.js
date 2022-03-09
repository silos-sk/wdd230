const page = window.location.pathname;

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

//--- HEADER DATE DISPLAY --- //
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

// Footer Date Display
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

//--- LAZY LOAD IMAGES ---//

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

//===== PAGE SPECIFIC SCRIPT ======//

switch (page) {
  //--- DISCOVER PAGE ---//
  case "/chamber/discover.html":
    // Last Visit
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
    break;

  //--- JOIN PAGE CURRENT DATE AND TIME ---//
  case "/chamber/join.html":
    const joinDate = document.querySelector("#joinDate");
    joinDate.textContent = currentDate;

    const time = new Date().toLocaleTimeString();

    const joinTime = document.querySelector("#joinTime");
    joinTime.textContent = time;
    break;

  //--- DIRECTORY --- //
  case "/chamber/directory.html":
    const requestURL =
      "https://silos-sk.github.io/wdd230/chamber/data/data.json";

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

      // LIST VIEW changes
      function listView() {
        // Show company Name
        para1.classList.remove("hidden");
        para1.style.fontWeight = "bold";

        // Hide company logo
        img.classList.add("hidden");

        // Set list view btn to active and remove from grid view btn
        listViewbtn.classList.add("view-active");
        gridViewbtn.classList.remove("view-active");

        // Set even rows with coloured background
        dir1Even.forEach((even) => {
          even.classList.add("list-view");
        });

        // Set last row to have coloured background
        dir.lastElementChild.classList.add("list-view");

        // Remove border for each company
        card.style.border = 0;

        // If medium and above viewport
        if (vw >= 560) {
          // Change layout of companies to list in one column
          dir.classList.add("list-layout-med");

          // Display details for each company to display to four columns
          dir1.forEach((section) => {
            section.classList.add("list-col");
          });

          // Display details for last company row to four columns
          dir.lastElementChild.classList.add("list-col");
          classDir.classList.remove("dir-lrg");
        }
      }

      // Back to default changes
      function listViewRemove() {
        // Hide company name
        para1.classList.add("hidden");

        // Show company image
        img.classList.remove("hidden");

        // Set grid view btn to active and remove from list view btn
        listViewbtn.classList.remove("view-active");
        gridViewbtn.classList.add("view-active");

        // Remove coloured background for even row companies
        dir1Even.forEach((even) => {
          even.classList.remove("list-view");
        });

        // Remove coloured background for last row
        dir.lastElementChild.classList.remove("list-view");

        // Revert border for each company card
        card.style.border = null;

        // If medium viewport and above
        if (vw >= 560) {
          // Remove column layout and back to grid
          dir.classList.remove("list-layout-med");

          // Remove four column details layout for each company
          dir1.forEach((section) => {
            section.classList.remove("list-col");
          });

          // Remove column layout and back to grid for last company row
          dir.lastElementChild.classList.remove("list-col");
        }
      }
    }
    break;
}
//--- HOME SPOTLIGHT --- //
const companiesURL = "https://silos-sk.github.io/wdd230/chamber/data/data.json";
const spot1name = document.querySelector("#spot1name");
const spot1img = document.querySelector("#spot1img");
const spot1slogan = document.querySelector("#spot1slogan");
const spot1email = document.querySelector("#spot1email");
const spot1phone = document.querySelector("#spot1phone");

const spot2name = document.querySelector("#spot2name");
const spot2img = document.querySelector("#spot2img");
const spot2slogan = document.querySelector("#spot2slogan");
const spot2email = document.querySelector("#spot2email");
const spot2phone = document.querySelector("#spot2phone");

fetch(companiesURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    // console.table(jsonObject); // temporary checking for valid response and data parsing
    const companies = jsonObject["companies"];
    let sortedCompanies = companies.sort(function () {
      return 0.5 - Math.random();
    });
    sortedCompanies.forEach(SpotlightCompanies);
  });

let goldMembers = {};
let silverMembers = {};

function SpotlightCompanies(company) {
  //Create list of gold members
  if (company.membership == "gold") {
    Object.assign(goldMembers, company);
  }

  //Create list of silver members
  if (company.membership == "silver") {
    Object.assign(silverMembers, company);
  }

  // Display gold member to spotlight1 section
  spot1name.textContent = goldMembers.name;
  spot1img.setAttribute("src", goldMembers.logo);
  spot1img.setAttribute("alt", goldMembers.name);
  spot1img.setAttribute("loading", "lazy");
  spot1slogan.textContent = `"${goldMembers.slogan}"`;
  spot1email.textContent = goldMembers.email;
  spot1phone.textContent = goldMembers.phone;

  // Display silver member to spotlight2 section
  spot2name.textContent = silverMembers.name;
  spot2img.setAttribute("src", silverMembers.logo);
  spot2img.setAttribute("alt", silverMembers.name);
  spot2img.setAttribute("loading", "lazy");
  spot2slogan.textContent = `"${silverMembers.slogan}"`;
  spot2email.textContent = silverMembers.email;
  spot2phone.textContent = silverMembers.phone;
}
