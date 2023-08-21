import { getLocation } from "@/utils/getLocation";
import axios from "axios";

axios.defaults.baseURL = "https://api.weatherapi.com/v1";

export const WeatherService = {
  getWeather: async () => {
    try {
      const { latitude, longitude } = await getLocation();
      const startCity = "New York";
      let relativePath =
        "/forecast.json?days=14&key=70c3a9b2560a4f9bacd72436231608";

      if (latitude && longitude) {
        relativePath += `&q=${latitude},${longitude}`;
      } else {
        relativePath += `&q=${startCity}`;
      }

      const { data } = await axios.get(relativePath);

      return data;
    } catch (error: any) {
      return error.message;
    }
  },
};
