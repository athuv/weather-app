export default class ApiService {
  constructor() {
    if(!ApiService.instance){
      ApiService.instance = this;
    }
  }

  async getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            resolve({ lat, lon });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  async fetchWeatherData(query) {
    let userCity;
    try{      
      if(query === undefined) {
        const {lat, lon} = await this.getLocation();
        userCity = `${lat},${lon}`;
      }else {
        userCity = query;
      }

      const weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0cd0ad978b6a41f5b94122245231407&q=${userCity}&days=7&aqi=yes&alerts=yes
      `);
      const weatherDataJson = await weatherData.json();
      return  weatherDataJson;
    } catch(error) {
      return error;
    }
  }

  async searchAutofill(query) {
    try {
      const searchResults = await fetch(`https://api.weatherapi.com/v1/search.json?key=0cd0ad978b6a41f5b94122245231407&q=${query}`, {mode: 'cors'});
      const jsonResults = await searchResults.json();

      return jsonResults;
    }catch(error) {
      return error;
    }
    
  }
}