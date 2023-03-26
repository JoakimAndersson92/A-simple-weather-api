const submitButton = document.querySelector('#submitButton')
const api_key = "45bbe0f1c9b1472ac7f6dd3e8a37988c"
const city = document.querySelector('#city')
const weather = document.querySelector('#weather')
const temprature = document.querySelector('#temprature')
const wind = document.querySelector('#wind')
const selectedCountry = document.querySelector('#country')
const weatherImg = document.querySelector('#weatherImage')
const attributeLink = document.querySelector('#attribute')
const weatherImageContainer = document.querySelector('#weatherImageContainer')


submitButton.addEventListener('click', getLonLat)

async function getLonLat() {
    const location = selectedCountry.value
    console.log(location)
    try {
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${api_key}`)
            .then(response => response.json())
            .then(data => {
                const lat = data[0].lat
                const lon = data[0].lon
                getWeatherData(lat, lon)
            })
              
    } catch (error) {
        console.log(error)
    }

   
}

async function getWeatherData(lat, lon){
         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        try {
           await fetch(url)
            .then(response => response.json())
            .then(data => {
                viewWeather(data)
            })
        } catch (error) {
            console.log(error)
        }
}

function viewWeather(data) {

    city.textContent = data.name
    weather.textContent = data.weather[0].main
    temprature.textContent = data.main.temp
    wind.textContent = data.wind.speed

    if(/Clouds/.test(weather.textContent)){
        attributeLink.textContent = "Go to creator"
        attributeLink.href = 'https://www.flaticon.com/authors/iconixar'
        weatherImg.src = "./images/cloud.png"
    }
     else if(/Snow/.test(weather.textContent)){
        attributeLink.textContent = "Go to creator"
        attributeLink.href = 'https://www.flaticon.com/authors/iconixar'
        weatherImg.src = "./images/snowy.png"
    }
    else if(/Rain/.test(weather.textContent)){
        attributeLink.textContent = "Go to creator"
        attributeLink.href = 'https://www.flaticon.com/authors/iconixar'
        weatherImg.src = "./images/rainy.png"
    }
    else{
        attributeLink.textContent = "Go to creator" 
        attributeLink.href = 'https://www.flaticon.com/authors/iconixar'
        weatherImg.src = "./images/cold.png"
    }
}





