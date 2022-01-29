// Footer date display
const date = new Date();
const year = date.getFullYear();
document.querySelector("#year").textContent = year;

document.getElementById("lu").textContent =
  " Last Updated: " + document.lastModified;
