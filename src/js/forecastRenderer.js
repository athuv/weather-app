import * as domManager from './domUtils';
import * as iconManager from './icons'

function forecastHourly(weatherData) {

  const divForecastHourly = domManager.createDivElement(['forecast-info-hourly']);
  let divWrapper;

  weatherData.forecast.forecastday[0].hour.forEach((data, index) => {
    // Create a new wrapper div every 8 iterations
    if (index % 8 === 0) {
      divWrapper = domManager.createDivElement(['forecast-info-hourly__slide']);
      divForecastHourly.appendChild(divWrapper);
    }

    // Formatting the time with AM/PM
    const datetime = new Date(data.time);
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const timeFormatter = new Intl.DateTimeFormat("en-US", timeOptions);
    const timeStringWithAMPM = timeFormatter.format(datetime);

    const divDayWrapper = domManager.createDivElement(['forecast-info-hourly__wrapper']);

    const spanDay = domManager.createSpanElement([], {innerText: timeStringWithAMPM});
    const spanTemperature = domManager.createSpanElement(
      ['temparature-celcius', 'temperature-hourly'],
      {innerText: data.temp_c},
      {'data-temperature-type': 'hourly'}
    );
    const spanConditionType = domManager.createSpanElement(['forecast-info-day__condition-type'], {innerText: data.condition.text});

    const weatherIcon = new Image();
    weatherIcon.classList.add('forecast-info-day__icon');
    weatherIcon.src = data.condition.icon;

    domManager.appendChildElements(divDayWrapper, spanDay, spanTemperature, weatherIcon, spanConditionType);
    divWrapper.appendChild(divDayWrapper);
  });

  return divForecastHourly;
}

function forecastDaily(weatherData) {
  const divForecastDay = domManager.createDivElement(
    ['forecast-info-day'],
  );

  weatherData.forecast.forecastday.forEach((data) => {
    const dateString = data.date;
    const date = new Date(dateString);
    const options = { weekday: "long" };
    const dayOfWeek = date.toLocaleString("en-US", options);

    const divDayWrapper = domManager.createDivElement(
      ['forecast-info-day__wrapper'],
    );

    const spanDay = domManager.createSpanElement(
      [],
      {innerText: dayOfWeek}
    );

    const spanTemperature = domManager.createSpanElement(
      ['temparature-celcius'],
      {innerText: data.day.maxtemp_c},
      {'data-temperature-type': 'daily'}
    );

    const spanConditionType = domManager.createSpanElement(
      ['forecast-info-day__condition-type'],
      {innerText: data.day.condition.text}
    );

    const weatherIcon = new Image();
    weatherIcon.classList.add('forecast-info-day__icon');
    weatherIcon.src = data.day.condition.icon;

    domManager.appendChildElements(
      divDayWrapper,
      spanDay,
      spanTemperature,
      weatherIcon,
      spanConditionType
    );

    domManager.appendChildElements(
      divForecastDay,
      divDayWrapper
    );
  });

  return divForecastDay;
}

function forecastAside(weatherData) {
  const aside = domManager.createAsideElement(
    ['forecast-info'],
  );

  domManager.appendChildElements(
    aside,
    forecastDaily(weatherData),
    forecastHourly(weatherData)

  );

  return aside;
}

function forecastButtons(weatherData) {
  const aside = domManager.createAsideElement(
    ['forecast__buttons'],
  );

  const buttonDaily = domManager.createButtonElement(
    ['forecast__buttons__button', 'forecast__buttons__button--selected', 'forecast-button__daily'],
    {innerText: 'Daily'}
  );

  const buttonHourly = domManager.createButtonElement(
    ['forecast__buttons__button', 'forecast-button__hourly'],
    {innerText: 'Hourly'}
  );

  const select = domManager.createSelectElement(
    ['forecast__buttons__button', 'forecast-button__select']
  );

  weatherData.forecast.forecastday.forEach((day, index) => {
    const option = domManager.createOptionElement(
      ['forecast__buttons__button', 'button__option'],
      {innerText: day.date},
      {value: index}
    );

    domManager.appendChildElements(
      select,
      option
    );
  });

  function forecastSliderButtons() {
    const divForecastSlider = domManager.createDivElement(
      ['forecast__slider']
    );
  
    const divLeftButton = domManager.createDivElement(
      ['forecast__slider__button', 'forecast__slider__button--left'],
      {innerHTML: iconManager.leftArrowIcon()}
    );
  
    const divDotButtonOne = domManager.createDivElement(
      ['forecast__slider__button-o']
    );
  
    const divDotButtonTwo = domManager.createDivElement(
      ['forecast__slider__button-o']
    );
  
    const divDotButtonThree = domManager.createDivElement(
      ['forecast__slider__button-o']
    );
  
    const divRightButton = domManager.createDivElement(
      ['forecast__slider__button', 'forecast__slider__button--right'],
      {innerHTML: iconManager.rightArrowIcon()}
    );

    domManager.appendChildElements(
      divForecastSlider,
      divLeftButton,
      divDotButtonOne,
      divDotButtonTwo,
      divDotButtonThree,
      divRightButton
    );
    return divForecastSlider;
  }



  domManager.appendChildElements(
    aside,
    buttonDaily,
    buttonHourly,
    select,
    forecastSliderButtons(),    
  );
  return aside;
}


export default function renderForecastSection(data) {
  const forecastSection = domManager.createSectionElement(
    ['forecast']
  );

  domManager.appendChildElements(
    forecastSection,
    forecastButtons(data),
    forecastAside(data),
  );

  return forecastSection;
}
