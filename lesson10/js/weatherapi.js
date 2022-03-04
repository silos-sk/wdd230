const apiURL =
  "https://api.openweathermap.org/data/2.5/find?q=Fairbanks&units=imperial&appid=6a8e47c47709fc9a90e95c0d8af1e420";

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);
    document.querySelector('#current-temp').textContent = jsObject.list[0].main.temp;

    const iconsrc= `https://openweathermap.org/img/w/${jsObject.list[0].weather[0].icon}.png`;
    const desc = jsObject.list[0].weather[0].description;
    document.querySelector('#icon-src').textContent = iconsrc;
    document.querySelector('#weathericon').setAttribute('src', iconsrc);
    document.querySelector('#weathericon').setAttribute('alt', desc);
    document.querySelector('figcaption').textContent = desc;
  });

  
