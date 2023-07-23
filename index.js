// // Your code here
const weather = document.getElementById('weather');
const form = document.querySelector('form');
const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const KEY = '&units=imperial&appid=185c93b9a43a0081bf87be993043cfb4'

form.onsubmit = function(e) {
    e.preventDefault()
    const searchQuery = this.search.value
    if (!searchQuery) return
    form.search.value = ""
    fetch(URL + searchQuery + KEY)    
    .then(function(res) {
        return res.json()
    })
    .then(getWeather)    
   
    .catch(() => {
        const notFound = document.createElement('p')
        notFound.textContent = 'Location not found!'
        weather.appendChild(notFound)
    })
} 

function getWeather(data){
    weather.innerHTML = ""
    console.log(data)

const city = document.createElement('h2')
city.textContent = data.name + ', ' + data.sys.country
weather.appendChild(city)

// Link to location
    const mapLink = document.createElement('a')
    const latitude = data.coord.lat
    const longitude = data.coord.lon
    mapLink.href = 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude
    mapLink.target = '_blank'
    mapLink.textContent = 'click to view map'
    weather.appendChild(mapLink)

// Icon of weather condition
    const img = document.createElement('img')
    img.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
    weather.appendChild(img) 

// Description of weather condition
    const currentConditions = document.createElement('p')
    currentConditions.style.textTransform = 'capitalize'
    currentConditions.textContent = data.weather[0].description
    weather.appendChild(currentConditions)

// Actual temperature
    const currentTemp = document.createElement('p')
    currentTemp.textContent = 'Current: ' + data.main.temp + ' °F'
    weather.appendChild(currentTemp)

// Percieved temperature
    const feelsLike = document.createElement('p')
    feelsLike.textContent = 'Feels Like: ' + data.main.feels_like + ' °F'
    weather.appendChild(feelsLike)

// Updated time
    const ms = data.dt * 1000
    const date = new Date(ms)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    const lastUpdated = document.createElement('p')
    lastUpdated.textContent = 'Last Updated: ' + timeString
    weather.appendChild(lastUpdated)
}



