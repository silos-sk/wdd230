let myDate = new Date();
let myYear = myDate.getFullYear;

document.getElementById("currentYear").textContent = myYear;

document.getElementById("lu").textContent =
  "Last Updated: " + document.lastModified;
