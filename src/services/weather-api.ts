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
  searchCityWeather: async (city: string | string[] | undefined) => {
    const { data: searchData } = await axios.get(
      `/search.json?key=70c3a9b2560a4f9bacd72436231608&q=${city}`,
    );

    console.log(searchData);

    if (!searchData.length) {
      return [];
    }

    const searchCity = searchData.map(async ({ name }: { name: string }) => {
      const { data } = await axios.get(
        `/forecast.json?days=7&key=70c3a9b2560a4f9bacd72436231608&q=${name}`,
      );
      return data;
    });

    const data = await Promise.all(searchCity);

    return data;
  },
};
