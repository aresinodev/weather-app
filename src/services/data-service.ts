import { APP_KEY, OPENWEATHER_API_URL } from "../utils/constants";

export class DataService {
  static fetchLocationData(lat: number, lon: number): Promise<any> {
    const locationUrl = `${OPENWEATHER_API_URL}geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APP_KEY}`;

    return fetch(locationUrl).then((response) => response.json());
  }

  static fetchWeatherData(lat: number, lon: number): Promise<any> {
    const weatherUrl = `${OPENWEATHER_API_URL}data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&lang=sp&appid=${APP_KEY}`;

    return fetch(weatherUrl).then((response) => response.json());
  }

  static fetchCities(name: string): Promise<any> {
    const citiesUrl = `${OPENWEATHER_API_URL}geo/1.0/direct?q=${name}&limit=5&appid=${APP_KEY}`;

    return fetch(citiesUrl).then((response) => response.json());
  }
}
