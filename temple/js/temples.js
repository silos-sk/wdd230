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
  para3.innerHTML = `Send email via temple <a href="${temple.email}">template</a> `;
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

  // like icon

  function likedTemple() {
    icon.classList.toggle("liked");
    if (icon.classList.contains("liked")){
    setLocalLiked();
    }
    else{
      para8.remove();
    }
  }

  function setLocalLiked() {
      // const likedTemple = localStorage.getItem("likedTemple");
      let arr_likedTemples = [];
      arr_likedTemples.push(temple_id);

      let likedTemp = localStorage.getItem("likedTemp");

      // Stringify the array and store it
      localStorage.setItem("likedTemp", JSON.stringify(arr_likedTemples));

      // Parse the stringified array back from localStorage
      let likedTempRetrieved = JSON.parse(localStorage.getItem("likedTemp"));

      if (likedTemp == null) {
        icon.style.color = "white";
      } else {
        para8.textContent = "Liked";
        title.appendChild(para8);
        icon.style.color = "#2a2e32";
      }

      // Add an item
      likedTempRetrieved.push(likedTemp);

      // Stringify the new array and overwrite the key
      localStorage.setItem("likedTemp", JSON.stringify(likedTempRetrieved));
        
      //  // Get icon with liked class
      //   let temple_icon = document.querySelector('icon.liked');

        // Iterate retrieved array and append items
        likedTempRetrieved.forEach(item => {
          arr_likedTemples.push(item);
        });
      // console.log(arr_likedTemples);
  }

  icon.onclick = likedTemple;

  // temple history
  let hx = "<ul>";
  t_history.forEach(function (item) {
    hx += "<li>" + item + "</li>";
  });

  hx += "</ul>";
  para6.innerHTML = `<b>Temple History:</b> ${hx}`;

  // temple closure
  let closure = "<ul>";
  t_closure.forEach(function (item) {
    closure += "<li>" + item + "</li>";
  });

  closure += "</ul>";
  para7.innerHTML = `<b>Temple Closure:</b> ${closure}`;

  document.querySelector("div.dir").appendChild(card);
}
