//--- DIRECTORY --- //
const requestURL = "https://silos-sk.github.io/wdd230/chamber/data/data.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    // console.table(jsonObject); // temporary checking for valid response and data parsing
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
  img.setAttribute("alt", `Logo - ${company.name}`);
  img.setAttribute("loading", "lazy");
  img.setAttribute("width", "100");
  img.setAttribute("height", "75");

  // Default view (grid)
  function defaultView() {
    // Add/append the section(card)
    card.appendChild(img);
    card.appendChild(para1);
    // para1.classList.add("hidden");
    para1.style.fontWeight = "bold";
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
    // para1.classList.remove("hidden");

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
    // para1.classList.add("hidden");

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
