window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let temperatureDescription = document.querySelector(
    ".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
let temperatureSpan =document.querySelector("temperature-span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position)  {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const apiKey = `${proxy}https://darksky.net/forecast/51.505,-0.072/ ${latitude}, ${longitude}`;

      fetch(apiKey)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //set icons
          setIcons(icon, document.querySelector(".icon"));
          let celsius =(temperature - 32) * (5 / 9);
          temperatureSection.addEventListener("click", () => {
              if(temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent ='C';
                temperatureDegree.textContent = Math.floor(celsius);
              }else{
                 temperatureSpan.textContent ="F";
                 temperatureDegree.textContent = temperature;
              }
          })
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new skycons({ color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});
