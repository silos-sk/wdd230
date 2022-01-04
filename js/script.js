let date = new Date();
let year = date.getFullYear();

document.getElementById("year").textContent = year;

document.getElementById("lu").textContent =
  "Last Updated: " + document.lastModified;
