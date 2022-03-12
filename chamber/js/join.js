//--- JOIN PAGE CURRENT DATE AND TIME ---//

const joinDate = document.querySelector("#joinDate");
joinDate.textContent = currentDate;

const time = new Date().toLocaleTimeString();

const joinTime = document.querySelector("#joinTime");
joinTime.textContent = time;
