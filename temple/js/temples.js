//--- TEMPLES --- //
const requestURL = "data/data.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (templesObject) {
    // console.table(templesObject); // temporary checking for valid response and data parsing
    const temples = templesObject["temples"];
    temples.forEach(displayTemples);
  });

function displayTemples(temple) {
  // Create elements to add to the document
  let card = document.createElement("div");
  let title = document.createElement("div");
  let h3 = document.createElement("h3");
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let para4 = document.createElement("p");
  let para5 = document.createElement("p");
  let para6 = document.createElement("p");
  let para7 = document.createElement("p");
  let para8 = document.createElement("p");
  let img = document.createElement("img");
  let icon = document.createElement("i");
  let body = document.querySelector("body");

  let dir = document.querySelector("#directory");
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let t_history = temple.history;
  let t_closure = temple.closure;

  // Extract first name of temple
  let arr_temple_name = temple.name.split(" ");
  let temple_id = arr_temple_name[0];
  // console.log(temple_id);

  // Change the textContent property of the elements to contain company info
  h3.textContent = `${temple.name}`;
  h3.setAttribute("id", `${temple_id}`);
  icon.setAttribute("class", "fa-solid fa-thumbs-up");
  icon.setAttribute("id", `${temple_id}`);
  para1.innerHTML = `<b>Address:</b> ${temple.address}`;
  para2.innerHTML = `<b>Phone:</b> ${temple.phone}`;
  para3.innerHTML = `Send email via temple <a href="${temple.email}" target="_blank">template</a> `;
  para4.innerHTML = `<b>Services:</b> ${temple.services}`;
  para5.innerHTML = `<b>Ordinance and Session:</b> ${temple.ordinance}`;
  img.setAttribute("src", `${temple.image}`);
  img.setAttribute("alt", `Image - ${temple.name}`);
  img.setAttribute("loading", "lazy");
  img.setAttribute("width", "420");
  img.setAttribute("height", "240");

  // Add/append the section(card)
  card.appendChild(img);
  img.style.width = "100%";
  card.appendChild(title);
  title.classList.add("temple_title");
  title.appendChild(h3);
  title.appendChild(icon);
  card.classList.add("temple_item");

  h3.style.fontWeight = "bold";
  card.appendChild(para1);
  card.appendChild(para2);
  card.appendChild(para3);
  card.appendChild(para4);
  card.appendChild(para5);
  card.appendChild(para6);
  card.appendChild(para7);

  // like icon - local storage (single item):: WORKING!
  function likedTempleIcon() {
    icon.classList.toggle("liked");
    if (icon.classList.contains("liked")) {
      para8.textContent = `Liked!`;
      title.appendChild(para8);
      localStorage.setItem("likedTemple", temple_id);
    }
  }

  icon.onclick = likedTempleIcon;

  const lt = localStorage.getItem("likedTemple");

  if (icon.id == lt) {
    icon.classList.add("liked");
    para8.textContent = "Liked";
    title.appendChild(para8);
  }

  // temple history : add <ul> + <li> for each history item
  let hx = "<ul>";
  t_history.forEach(function (item) {
    hx += "<li>" + item + "</li>";
  });

  hx += "</ul>";
  para6.innerHTML = `<b>Temple History:</b> ${hx}`;

  // temple closure : add <ul> + <li> for each temple closre item
  let closure = "<ul>";
  t_closure.forEach(function (item) {
    closure += "<li>" + item + "</li>";
  });

  closure += "</ul>";
  para7.innerHTML = `<b>Temple Closure:</b> ${closure}`;

  // add card to div with .dir class
  document.querySelector("div.dir").appendChild(card);
}
