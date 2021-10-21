// Key: 3f51cef83569782eeec8097b9f7266fc
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=3f51cef83569782eeec8097b9f7266fc&units=metric

const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const wind = document.querySelector('.wind')
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const weatherError = document.querySelector('.weather-error')

export async function getWeather(lang) {
  let city = localStorage['personalCity'] || 'Minsk'
  console.log(city)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=3f51cef83569782eeec8097b9f7266fc&units=metric`
  const responce = await fetch(url)
  const data = await responce.json()

  try {
    if (lang === 'ru') {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`
      humidity.textContent = `Влажность: ${data.main.humidity}%`
    } else {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
      humidity.textContent = `Humidity: ${data.main.humidity}%`
    }

    weatherError.textContent = ''
    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.round(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description
  } catch (err) {
    localStorage['personalCity'] = 'Minsk'
    weatherIcon.classList = ''
    temperature.textContent = ''
    weatherDescription.textContent = ''
    wind.textContent = ''
    humidity.textContent = ''
    weatherError.textContent = `${data.message}`
  }
}

city.value = localStorage['personalCity'] || 'Minsk'

city.addEventListener('change', () => {
  localStorage['personalCity'] = city.value
  getWeather(localStorage['appLanguage'] || 'en')
})
