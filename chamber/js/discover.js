//--- DISCOVER PAGE ---//
// Last Visit
const lvMessage = document.querySelector("#lastVisit");
const lv = localStorage.getItem("lastVisit");
const now = Date.now();

// console.log(`Last visit: ${lv}`);
// console.log(`Today: ${now}`);
//1000 milliseconds in 1 second, 60 seconds in 1 minute, 60 minutes in an hour, 24 hours in 1 day.
const msInDay = 1000 * 60 * 60 * 24;
// console.log(`milliseconds in a day is ${msInDay}`);

let difference = Math.round((now - lv) / msInDay);

// console.log(difference);

localStorage.setItem("lastVisit", Date.now());

if (lv == null) {
  lvMessage.textContent = `This is your first visit!`;
} else {
  lvMessage.textContent = `Last visit to this page: ${difference} days.`;
}
