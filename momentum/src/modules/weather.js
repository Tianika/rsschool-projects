// Key: 3f51cef83569782eeec8097b9f7266fc
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=3f51cef83569782eeec8097b9f7266fc&units=metric

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=3f51cef83569782eeec8097b9f7266fc&units=metric`
  const result = await fetch(url)
  const data = await result.json()

  try {
    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
  } catch (err) {
    localStorage['personalCity'] = 'Minsk'
    weatherIcon.classList = ''
    temperature.textContent = ''
    weatherDescription.textContent = `${data.message}`
    wind.textContent = ''
    humidity.textContent = ''
  }
}

city.value = localStorage['personalCity'] || 'Minsk'

city.addEventListener('change', () => {
  localStorage['personalCity'] = city.value
  getWeather(city.value)
})

getWeather(city.value)
