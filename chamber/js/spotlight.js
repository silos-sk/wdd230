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
  spot1img.setAttribute("alt", `Logo - ${goldMembers.name}`);
  spot1img.setAttribute("loading", "lazy");
  spot1slogan.textContent = `"${goldMembers.slogan}"`;
  spot1email.textContent = goldMembers.email;
  spot1phone.textContent = goldMembers.phone;

  // Display silver member to spotlight2 section
  spot2name.textContent = silverMembers.name;
  spot2img.setAttribute("src", silverMembers.logo);
  spot2img.setAttribute("alt", `Logo - ${silverMembers.name}`);
  spot2img.setAttribute("loading", "lazy");
  spot2slogan.textContent = `"${silverMembers.slogan}"`;
  spot2email.textContent = silverMembers.email;
  spot2phone.textContent = silverMembers.phone;
}
