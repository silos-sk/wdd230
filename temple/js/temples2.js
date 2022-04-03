//--- DIRECTORY --- //
const requestURL = "data/data.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (templesObject) {
    console.table(templesObject); // temporary checking for valid response and data parsing
    const temples = templesObject["temples"];
    temples.forEach(displayTemples);
  });

function displayTemples(temple) {
  // Create elements to add to the document
  let card = document.createElement("div");
  let h3 = document.createElement("h3");
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let para3 = document.createElement("p");
  let para4 = document.createElement("p");
  let para5 = document.createElement("p");
  let para6 = document.createElement("p");
  let para7 = document.createElement("p");
  let ul = document.createElemet("ul");
  let img = document.createElement("img");

  let dir = document.querySelector("#directory");
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let t_history = temple.history;
  let t_closure = temple.closure;

  // Change the textContent property of the elements to contain company info
  h3.textContent = `${temple.name}`;
  para1.innerHTML = `<b>Address:</b> ${temple.address}`;
  para2.innerHTML = `<b>Phone:</b> ${temple.phone}`;
  para3.innerHTML = `Send email via temple <a href="${temple.email}">template</a> `;
  para4.innerHTML = `<b>Services:</b> ${temple.services}`;
  para5.innerHTML = `<b>Ordinance and Session:</b> ${temple.ordinance}`;
  img.setAttribute("src", `${temple.image}`);
  img.setAttribute("alt", `Image - ${temple.name}`);
  img.setAttribute("loading", "lazy");
  img.setAttribute("width", "339");
  img.setAttribute("height", "212");

  // Default view (grid)
  // Add/append the section(card)
  card.appendChild(img);
  img.style.width = "100%";
  card.appendChild(h3);
  card.classList.add("temple_item");

  h3.style.fontWeight = "bold";
  card.appendChild(para1);
  card.appendChild(para2);
  card.appendChild(para3);
  card.appendChild(para4);
  card.appendChild(para5);
  card.appendChild(para6);
  card.appendChild(para7);

  para6.appendChild(ul);

  function createList(item, tag) {
    let li = document.createElement("li");

    li.textContent(item);
    tag.appendChild(li);
  }

  para6.innerHTML = `<b>Temple History</b>${t_history.forEach(
    createList(hx, para6)
  )}`;

  // para6.innerHTML = `<b>Temple Histor{y</b><br/><ul><li>${t_history[0]}</li>
  // <li>${t_history[1]}</li>
  // <li>${t_history[2]}</li>
  // <li>${t_history[3]}</li>
  // <li>${t_history[4]}</li>
  // </ul>`

  para7.innerHTML = `<b>Temple Closure</b><br/><ul><li>${t_closure[0]}</li>
<li>${t_closure[1]}</li>
<li>${t_closure[2]}</li>
<li>${t_closure[3]}</li>
<li>${t_closure[4]}</li>
</ul>`;

  document.querySelector("div.dir").appendChild(card);
}
