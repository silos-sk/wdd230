//-- CURRENT WEATHER --//

const apiURL =
  "//api.openweathermap.org/data/2.5/onecall?lat=38.9807&lon=-77.1003&units=imperial&appid=6a8e47c47709fc9a90e95c0d8af1e420";

fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    console.log(weatherInfo);

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

    // Capitalize First letter of words for the forecast
    function capitalizeFirst(word){
      split_word = word.split(" ");
    
      // Capitalize each first letter of weather forecast
     for (let i = 0; i < split_word.length; i++) {
       split_word[i] = split_word[i][0].toUpperCase() + split_word[i].substr(1);
     }

     // Join and return split capitalize words
     let joined_word = split_word.join(" ");
     return joined_word
    }

    let main_desc = capitalizeFirst(desc);

    // Add weather image and forecast to html page
    document.querySelector("#weathericon").setAttribute("src", iconsrc);
    document.querySelector("#weathericon").setAttribute("alt", desc);
    document.querySelector(".forecast").textContent = main_desc;

    // Get humidity and add to html page
    let humidity = city_humidity;
    document.querySelector("#humidity").textContent = humidity;

    // Weather Alert
    const weather_alert = document.querySelector("#weather_alert");

    // If City has weather alert
    if (weatherInfo.alerts == true) {
      // let city_alerts_desc = weatherInfo.alerts[0].description;

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

    // ----------- 3 DAY FORECAST ------------- //
    let city_daily = weatherInfo.daily;
    let city_d1 = city_daily[0].temp.day;
    let city_d2 = city_daily[1].temp.day;
    let city_d3 = city_daily[2].temp.day;
    console.log(city_d1)


    //----- FORECAST 1 ---//
    
    // FORECAST 1 Temperature
    let d1_temp = Math.round(city_d1);
    document.querySelector("#temp_1").textContent = d1_temp;

    // Forecast Weather Image 
    const iconsrc_1 = `//openweathermap.org/img/wn/${city_daily[0].weather[0].icon}@2x.png`;

     // Weather Forecast
     const desc1 = city_daily[0].weather[0].description;

     let forecast1_desc = capitalizeFirst(desc1);

    // Add weather image and forecast to html page
    document.querySelector("#weathericon_1").setAttribute("src", iconsrc_1);
    document.querySelector("#weathericon_1").setAttribute("alt", forecast1_desc);
    document.querySelector(".forecast_1").textContent = forecast1_desc;

    //----- FORECAST 2 ---//
    
    // FORECAST 2 Temperature
    let d2_temp = Math.round(city_d2);
    document.querySelector("#temp_2").textContent = d2_temp;

    // Forecast Weather Image 
    const iconsrc_2 = `//openweathermap.org/img/wn/${city_daily[1].weather[0].icon}@2x.png`;

     // Weather Forecast
     const desc2 = city_daily[1].weather[0].description;

     let forecast2_desc = capitalizeFirst(desc2);

    // Add weather image and forecast to html page
    document.querySelector("#weathericon_2").setAttribute("src", iconsrc_2);
    document.querySelector("#weathericon_2").setAttribute("alt", forecast1_desc);
    document.querySelector(".forecast_2").textContent = forecast2_desc;

    //----- FORECAST 3 ---//
    
    // FORECAST 3 Temperature
    let d3_temp = Math.round(city_d3);
    document.querySelector("#temp_3").textContent = d3_temp;

    // Forecast Weather Image 
    const iconsrc_3 = `//openweathermap.org/img/wn/${city_daily[2].weather[0].icon}@2x.png`;

     // Weather Forecast
     const desc3 = city_daily[2].weather[0].description;

     let forecast3_desc = capitalizeFirst(desc2);

    // Add weather image and forecast to html page
    document.querySelector("#weathericon_3").setAttribute("src", iconsrc_3);
    document.querySelector("#weathericon_3").setAttribute("alt", forecast1_desc);
    document.querySelector(".forecast_3").textContent = forecast3_desc;

  });
