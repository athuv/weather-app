import * as domManager from './domUtils';
import * as iconManager from './icons'

function renderCityInfo(weatherData) {
  // Formatting the date
  const datetime = new Date(weatherData.location.localtime);
  const options = { weekday: "long", day: "numeric", month: "short", year: "2-digit" };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);
  const dateString = dateFormatter.format(datetime);

  // Formatting the time with AM/PM
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
  const timeStringWithAMPM = timeFormatter.format(datetime);

  const aside = domManager.createAsideElement(
    ['current-weather__city-info'],
    {},
    {}
  );

  const span = domManager.createSpanElement(
    ['current-weather__city-info__name'],
    {innerText: `${weatherData.location.name}, ${weatherData.location.country}`}
  );

  const dateElement = domManager.createTimeElement(
    ['current-weather__city-info__date'],   
    {innerText:  dateString},
    {'datetime': weatherData.location.localtime},
  );

  const timeElement = domManager.createTimeElement(
    ['current-weather__city-info__time'],
    {innerText:  timeStringWithAMPM},
    {'datetime':  weatherData.location.localtime},
  );

  const divWeatherConditionWrapper = domManager.createDivElement(
    ['current-weather__city-info__condition-wrapper'],
  );

  const divWeatherCondition = domManager.createDivElement(
    ['current-weather__city-info__condition'],
    {innerText: weatherData.current.condition.text}
  );

  const imgWeatherIcon = new Image();
  imgWeatherIcon.classList.add('current-weather__city-info__icon');
  imgWeatherIcon.src = weatherData.current.condition.icon;

  domManager.appendChildElements(
    divWeatherConditionWrapper,
    divWeatherCondition,
    imgWeatherIcon
  );

  domManager.appendChildElements(
    aside,
    span,
    dateElement,
    timeElement,
    divWeatherConditionWrapper
  );
  return aside;
}

function renderWeatherInfo(data) {
  const aside = domManager.createAsideElement(
    ['current-weather__weather-info'],
    {},
    {}
  );

  function SearchWrapper() {
    const divSearchWrapper = domManager.createDivElement(
      ['current-weather__weather-info__search-wrapper'],
      {},
      {}
    );

    const searchResultsWrapper = domManager.createDivElement(
      ['search-wrapper__textbox-wrapper'],
    );

    const textSearch = domManager.createInputElement(
      ['search-wrapper__textbox'],
      {},
      {
        'type': 'text',
        'placeholder': 'Search Location...'
      }
    );

    const divResultAutofill = domManager.createDivElement(
      ['search-wrapper__search-autofill'],
    );

    domManager.appendChildElements(
      searchResultsWrapper,
      textSearch,
      divResultAutofill
    );

    const divIconWrapper = domManager.createDivElement(
      ['search-wrapper__icon-wrapper'],
      {innerHTML: iconManager.searchIcon()},
      {}
    );

    domManager.appendChildElements(
      divSearchWrapper, 
      searchResultsWrapper, 
      divIconWrapper);
    return divSearchWrapper;
  }

  function weatherInfoTemperature() {
    const divTemperatureWrapper = domManager.createDivElement(
      ['current-weather__weather-info__temparature-wrapper'],
      {},
      {}
    );

    const iconWrapper = domManager.createDivElement(
      [],
      {innerHTML: iconManager.dayNightIcon()},
      {}
    );

    // Fetching weather data from the API
    const temperature = domManager.createSpanElement(
      ['temparature-celcius', 'temparature-wrapper--celcius-main'],
      {innerText: data.current.temp_c},
      {'data-temperature-type': 'current'}
    );

    domManager.appendChildElements(
      divTemperatureWrapper,
      iconWrapper,
      temperature
    );
    return divTemperatureWrapper;
  }

  domManager.appendChildElements(
    aside, 
    SearchWrapper(),
    weatherInfoTemperature()
  );
  return aside;
}

function renderConditionsInfo(data) {
  const aside = domManager.createAsideElement(
    ['current-weather__air-info'],
    {},
    {}
  );


  const airInfoElements = ['feelsLike', 'humidity', 'chanceOfRain', 'windSpeed'];

  airInfoElements.forEach((element) => {
  
    const divAirInfoWrapper = domManager.createDivElement(
      ['current-weather__air-info__air-info-wrapper']
    );

    const infoWrapper = domManager.createDivElement(
      ['air-info-wrapper__detail'],
    );

    const icon = domManager.createDivElement(
      ['air-info-wrapper__icon']
    );

    const spanHeading = domManager.createSpanElement(
      ['air-info-wrapper__detail--heading']
    );

    const spanInfo = domManager.createSpanElement(
      ['air-info-wrapper__detail--detail']
    );

    switch (element) {
      case 'feelsLike':
        domManager.setInnerHTML(icon, iconManager.thermometerIcon());
        domManager.setInnerText(spanHeading, 'Feels Like');
        domManager.setInnerText(spanInfo, data.current.feelslike_c);
        domManager.setClass(spanInfo, 'temparature-celcius');
        domManager.setDataAttribute(
          spanInfo,
          {
            data: 'data-temperature-type',
            value: 'feels-like'
          }  
        );
        break;
      case 'humidity':
        domManager.setInnerHTML(icon, iconManager.humidityIcon());
        domManager.setInnerText(spanHeading, 'Humidity');
        domManager.setInnerText(spanInfo, `${data.current.humidity}%`);
        break;
      case 'chanceOfRain':
        domManager.setInnerHTML(icon, iconManager.rainIcon());
        domManager.setInnerText(spanHeading, 'Chance of Rain');
        domManager.setInnerText(spanInfo,` ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`);
        break;
      case 'windSpeed':
        domManager.setInnerHTML(icon, iconManager.windIcon());
        domManager.setInnerText(spanHeading, 'Wind Speed');
        domManager.setInnerText(spanInfo, data.current.wind_kph);
        domManager.setClass(spanInfo, 'wind-speed-kph');
        break;
      default:
        // Handle default case
        break;
    }

    domManager.appendChildElements(
      infoWrapper,
      spanHeading,
      spanInfo
    );

    domManager.appendChildElements(
      divAirInfoWrapper,
      icon,
      infoWrapper
    );
  
    domManager.appendChildElements(
      aside,
      divAirInfoWrapper
    );
  });

  return aside;
}

export default function renderCurrentWeatherSection(data) {
  const currentWeatherSection = domManager.createSectionElement(
    ['current-weather']
  );

  domManager.appendChildElements(
    currentWeatherSection,
    renderCityInfo(data), 
    renderWeatherInfo(data), 
    renderConditionsInfo(data)
  );
  return currentWeatherSection;
}
