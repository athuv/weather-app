import * as domManager from './domUtils';
import { ApiServiceInstance, init } from './init';

// Debounce function
function debounce(func, delay) {
  let timerId;

  return function(...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function temperatureInCelcius(weatherData, weekOfTheDay) {
  const temperature = document.querySelectorAll('.temparature-ferhanite');
  temperature.forEach((element, index) => {
    element.classList.remove('temparature-ferhanite');
    element.classList.add('temparature-celcius');

    switch (element.getAttribute('data-temperature-type')) {
      case 'current':
        domManager.setInnerText(element, weatherData.current.temp_c);
        break;
      case 'feels-like':
        domManager.setInnerText(element, weatherData.current.feelslike_c);
        break;
      case 'hourly':
        const hourIndex = index >= 9 ? index - 9 : index + 15;
        domManager.setInnerText(element, weatherData.forecast.forecastday[weekOfTheDay].hour[hourIndex].temp_c);
        break;
      case 'daily':
        const dayIndex = index - 2;
        domManager.setInnerText(element, weatherData.forecast.forecastday[dayIndex].day.maxtemp_c);
        break;
      default:
        // Handle default case
        break;
    }
  });
}

function temperatureInFerhanite(weatherData, weekOfTheDay) {
  const temperature = document.querySelectorAll('.temparature-celcius');
  temperature.forEach((element, index) => {
    element.classList.remove('temparature-celcius');
    element.classList.add('temparature-ferhanite');

    switch (element.getAttribute('data-temperature-type')) {
      case 'current':
        domManager.setInnerText(element, weatherData.current.temp_f);
        break;
      case 'feels-like':
        domManager.setInnerText(element, weatherData.current.feelslike_f);
        break;
      case 'hourly':
        const hourIndex = index >= 9 ? index - 9 : index + 15;
        domManager.setInnerText(element, weatherData.forecast.forecastday[weekOfTheDay].hour[hourIndex].temp_f);
        break;
      case 'daily':
        const dayIndex = index - 2;
        domManager.setInnerText(element, weatherData.forecast.forecastday[dayIndex].day.maxtemp_f);
        break;
      default:
        // Handle default case
        break;
    }
  });
}

function changeForecastDay(weatherData) {
  const selectDay = document.querySelector('.forecast-button__select');

  function celcius(weatherData, day) {

  }

  selectDay.addEventListener('change', (element) => {
    const day = element.target.value;
    const hourlyElements = document.querySelectorAll('.forecast-info-hourly__wrapper');
    
    hourlyElements.forEach((element, index) => {      
      const temperature = element.querySelector(':nth-child(2)');
      const icon = element.querySelector(':nth-child(3)');
      const condition = element.querySelector(':nth-child(4)');

      if(temperature.classList.contains('temparature-celcius')) {
        domManager.setInnerText(temperature, weatherData.forecast.forecastday[day].hour[index].temp_c);
        icon.src = weatherData.forecast.forecastday[day].hour[index].condition.icon;
        domManager.setInnerText(condition, weatherData.forecast.forecastday[day].hour[index].condition.text);
      }

      if(temperature.classList.contains('temparature-ferhanite')) {
        domManager.setInnerText(temperature, weatherData.forecast.forecastday[day].hour[index].temp_f);
        icon.src = weatherData.forecast.forecastday[day].hour[index].condition.icon;
        domManager.setInnerText(condition, weatherData.forecast.forecastday[day].hour[index].condition.text);
      }
      
    });
  });
}

function toggleTemperature(weatherData) {
  const buttonTemperature = document.querySelector('.toggle-button__switch__input');
  buttonTemperature.addEventListener('change', (event) => {    
    const day = document.querySelector('.forecast-button__select').value;
    if(event.target.checked) {      
      temperatureInFerhanite(weatherData, day);
    }else {
      temperatureInCelcius(weatherData, day);
    }
  });
}

function hourlyButton() {
  const hourlyButton = document.querySelector('.forecast-button__hourly');
  const dailyButton = document.querySelector('.forecast-button__daily');
  const infoDay = document.querySelector('.forecast-info-day');
  const infoHoulr = document.querySelector('.forecast-info-hourly');
  const daySelect = document.querySelector('.forecast-button__select');
  const forecastSlider = document.querySelector('.forecast__slider');

  hourlyButton.addEventListener('click', () => {
    dailyButton.classList.remove('forecast__buttons__button--selected');
    hourlyButton.classList.add('forecast__buttons__button--selected');

    infoDay.style.display = 'none';
    infoHoulr.style.display = 'flex';

    daySelect.style.display = 'inline-block';
    forecastSlider.style.display = 'flex';
  });
}

function dailyButton() {
  const dailyButton = document.querySelector('.forecast-button__daily');
  const hourlyButton = document.querySelector('.forecast-button__hourly');
  const infoDay = document.querySelector('.forecast-info-day');
  const infoHoulr = document.querySelector('.forecast-info-hourly');
  const daySelect = document.querySelector('.forecast-button__select');
  const forecastSlider = document.querySelector('.forecast__slider');

  dailyButton.addEventListener('click', () => {
    hourlyButton.classList.remove('forecast__buttons__button--selected');
    dailyButton.classList.add('forecast__buttons__button--selected');

    infoDay.style.display = 'flex';
    infoHoulr.style.display = 'none';

    daySelect.style.display = 'none';
    forecastSlider.style.display = 'none';
  });
}

function forecastSlider() {
  const leftButton = document.querySelector('.forecast__slider__button--left');
  const rightButton = document.querySelector('.forecast__slider__button--right');
  const dots = document.querySelectorAll('.forecast__slider__button-o');
  const slider = document.querySelector('.forecast-info-hourly');

  let slideIndex  = 0;
  let totalSlider = slider.childElementCount;

  function slide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('slider__button-o-active', i === index);
    });
  }

  leftButton.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + totalSlider) % totalSlider;
    slide(slideIndex);
  });

  rightButton.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % totalSlider;
    slide(slideIndex);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      slideIndex = i;
      slide(slideIndex);
    });
  });

  slide(slideIndex);
}

function search() {
  const textbox = document.querySelector('.search-wrapper__textbox');
  const autoFillWrapper = document.querySelector('.search-wrapper__search-autofill');

  function inputHandler() {
    const inputValue = textbox.value.trim().toLowerCase();
    if(inputValue.length > 0) {
      const apiServiceInstance = ApiServiceInstance();
      apiServiceInstance.searchAutofill(inputValue).then((results) => {
        autoFillWrapper.innerHTML = '';
        results.forEach((result) => {
          const span = domManager.createSpanElement(
            ['search-autofill__results'],
            {innerText: `${result.name}, ${result.country}`}
          );

          span.addEventListener('click', () => {
            textbox.value = `${result.name}, ${result.country}`;
            init(`${result.name}, ${result.country}`);
            autoFillWrapper.style.display = 'none';
          });

          domManager.appendChildElements(
            autoFillWrapper,
            span
          );
        });
      });
      autoFillWrapper.style.display = 'flex';
    }
  }

  function hideSearchResults(event) {
    if (!event.target.classList.contains('search-autofill__results') && event.target.parentNode !== autoFillWrapper) {
      autoFillWrapper.style.display = 'none';
    }
  }

  textbox.addEventListener('input', debounce(inputHandler, 300));

  document.addEventListener('click', hideSearchResults);
}

function searchButtonClick() {
  const searchButton = document.querySelector('.search-wrapper__icon-wrapper');
  const textbox = document.querySelector('.search-wrapper__textbox');
  searchButton.addEventListener('click', () => {
    init(textbox.value);
  });
}

export default function events(weatherData) {
  toggleTemperature(weatherData);
  changeForecastDay(weatherData);
  hourlyButton();
  dailyButton();
  forecastSlider();
  search();
  searchButtonClick();
}