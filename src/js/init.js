import ApiService from './apiService';
import * as domManager from './domUtils';
import currentWeatherRenderer from './currentWeatherRenderer';
import forecastRenderer from './forecastRenderer';
import events from './eventHandlers';

function ApiServiceInstance() {
  const apiServiceInstance = new ApiService();
  return apiServiceInstance;
}

function init(query) {
  let mainElement;
  if(query === undefined) {
    mainElement = document.createElement('main');
    mainElement.classList.add('main-wrapper', 'main-wrapper--loading');
  }else {
    mainElement = document.querySelector('main');
    mainElement.innerHTML = "";
  }

  // Show loading icon
  const loadingIcon = document.createElement('div');
  loadingIcon.classList.add('loading-icon');
  mainElement.appendChild(loadingIcon);

  ApiServiceInstance().fetchWeatherData(query).then((data) => {
    console.log(data);
    mainElement.removeChild(loadingIcon);
    mainElement.classList.remove('main-wrapper--loading');

    

    domManager.appendChildElements(
      mainElement, 
      currentWeatherRenderer(data), 
      forecastRenderer(data),      
    );
    events(data);
  });

  return mainElement;
}


export {
  ApiServiceInstance,
  init
}