const requestURL =
  "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json";

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject); // temporary checking for valid response and data parsing
    const prophets = jsonObject["prophets"];
    prophets.forEach(displayProphets);
  });

function displayProphets(prophet) {
  // Create elements to add to the document
  let card = document.createElement("section");
  let h2 = document.createElement("h2");
  let para1 = document.createElement("p");
  let para2 = document.createElement("p");
  let img = document.createElement("img");
  // Change the textContent property of the h2 element to contain the prophet's full name
  h2.textContent = `${prophet.name} ${prophet.lastname}`;
  para1.textContent = `Birth Date: ${prophet.birthdate}`;
  para2.textContent = `Birth Place: ${prophet.birthplace}`;
  img.setAttribute("src", `${prophet.imageurl}`);
  img.setAttribute(
    "alt",
    `${prophet.name} ${prophet.lastname} - ${prophet.order}`
  );

  // Add/append the section(card) with the h2 element
  card.appendChild(h2);
  card.appendChild(para1);
  card.appendChild(para2);
  card.appendChild(img);
  // Add/append the existing HTML div with the cards class with the section(card)
  document.querySelector("div.cards").appendChild(card);
}
