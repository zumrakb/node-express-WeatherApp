const request = require("request");

const openWeatherMap = {
  BASE_URL: "http://api.openweathermap.org/data/2.5/weather?q=",
  SECRET_KEY: "52ed52d0f46da6e9bfad4a1a44493c2b",
};

weatherData = (address, callback) => {
  const url =
    openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&appid=" +
    openWeatherMap.SECRET_KEY;
  console.log(url);

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "unable to fetch weather data" + error);
    }
    callback(false, data?.body);
  });
};

module.exports = weatherData;
