const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const APIKEY = "bc5635dab83f45f88f9121155221703";
const APIURL = (city) =>
  `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&lang=tr`;

async function getWeatherByCity(city) {
  const resp = await fetch(APIURL(city), {
    origin: "cors",
  });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

function addWeatherToPage(data) {
  const temp = Math.floor(data.current.temp_c);
  const tempIcon = data.current.condition.icon;
  const airCondition = data.current.condition.text;

  const weather = document.createElement("div");
  weather.classList.add("weather");

  //
  weather.innerHTML = `
        <h2><img src="${tempIcon}" /> ${temp}°C <img src="${tempIcon}" /></h2>
        <small>${search.value.toUpperCase()}</small></br>
        <small>${airCondition}</small>

    `;

  //cleanup
  main.innerHTML = "";

  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;
  if (city) {
    getWeatherByCity(city);
  }
});
