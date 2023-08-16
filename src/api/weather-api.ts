import { getLocation } from "@/utils/getLocation";
import axios from "axios";

type Location = {
  latitude: number;
  longitude: number;
};

axios.defaults.baseURL = "https://api.weatherapi.com/v1";

export const getCurrentWeather = async (location: Location) => {
  try {
    const { data } = await axios.get(
      `/current.json?q=${location.latitude},${location.longitude}&lang=uk&key=70c3a9b2560a4f9bacd72436231608`,
    );
    console.log(data);

    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const getForecastWeather = async (location: Location) => {
  try {
    const { data } = await axios.get(
      `/forecast.json?q=${location.latitude},${location.longitude}&lang=uk&days=14&key=70c3a9b2560a4f9bacd72436231608`,
    );
    console.log(data);

    return data;
  } catch (error: any) {
    return error.message;
  }
};
