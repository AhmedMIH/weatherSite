let temperatureDescription = document.querySelector('.temperature-decription');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.degree-section');
let temperatureSectionSpan = document.querySelector('.degree-section span');

window.addEventListener('load',()=>{
    let long;
    let lat;
    const api_key = '9e6e936d721ab3df083b6e6f01ffeff7';

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude
            lat = position.coords.latitude
            const api_url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid="+api_key
            console.log(api_url)

            fetch(api_url)
            .then(response=>{
                return response.json();
            })
            .then(data => {
                drawWeather(data);
            })
        });
    }
});

function drawWeather(d){
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    var description = d.weather[0].description;
    var location = d.name;
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);

    locationTimezone.textContent = location;
    temperatureDegree.textContent = fahrenheit;
    temperatureDescription.textContent = description;

    temperatureSection.addEventListener('click',()=>{
        if(temperatureSectionSpan.textContent ==="F"){
            temperatureSectionSpan.textContent = "C"
            temperatureDegree.textContent = celcius;
        }
        else{
            temperatureSectionSpan.textContent = "F"
            temperatureDegree.textContent = fahrenheit;
        }
    })
}
