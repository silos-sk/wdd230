//-- CURRENT WEATHER --//

const apiURL =
  "//api.openweathermap.org/data/2.5/onecall?lat=38.9807&lon=-77.1003&units=imperial&appid=6a8e47c47709fc9a90e95c0d8af1e420";

fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    // console.log(weatherInfo);

    let city = weatherInfo.current;
    let city_weather = city.weather;
    let city_humidity = city.humidity;

    // console.log(`${city_weather[0].description}`);

    // City Temperature
    let temp = city.temp;
    let wholeTemp = Math.round(temp);
    document.querySelector("#temp").textContent = wholeTemp;

    // Weather Image
    const iconsrc = `//openweathermap.org/img/wn/${city_weather[0].icon}@2x.png`;

    // Weather Forecast
    const desc = city_weather[0].description;
    const descWords = desc.split(" ");

    // Capitalize each first letter of weather forecast
    for (let i = 0; i < descWords.length; i++) {
      descWords[i] = descWords[i][0].toUpperCase() + descWords[i].substr(1);
    }

    // Add weather image and forecast to html page
    document.querySelector("#weathericon").setAttribute("src", iconsrc);
    document.querySelector("#weathericon").setAttribute("alt", desc);
    document.querySelector(".forecast").textContent = descWords.join(" ");

    // Get humidity and add to html page
    let humidity = city_humidity;
    document.querySelector("#humidity").textContent = humidity;

    // Weather Alert
    const weather_alert = document.querySelector("#weather_alert");

    // If City has weather alert
    if (weatherInfo.alerts == true) {
      let city_alerts_desc = weatherInfo.alerts[0].description;

      // console.log(city_alerts_desc);
      alerts_desc = city_alerts.description.replaceAll("...", "</br>");
      alerts_clean = alerts_desc.replaceAll("*", "<hr>");

      // Add Weather Alert to HTML
      weather_alert.innerHTML = `<div id="close_btn"><h3>${city_alerts.event}</h3><i class="fa fa-window-close" aria-hidden="true"></i></div><div class="mssg" >${alerts_clean}<p><i>Source: ${city_alerts.sender_name}</i></p></div>`;

      // Close button to close alert
      let close_btn = document.querySelector("#close_btn");
      close_btn.addEventListener("click", closeText);

      // Show Weather alert on top of page
      weather_alert.classList.add("show");

      // Function to close weather alert section
      function closeText() {
        weather_alert.classList.add("hide");
      }
    } else {
      // if city has not weather alert, hide alert section
      weather_alert.classList.add("hide");
    }
  });
