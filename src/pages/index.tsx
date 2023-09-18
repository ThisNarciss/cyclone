import { Home } from "@/components/screen/home/Home";
import { WeatherService } from "@/services/weather-api";
import { Current } from "@/ts/types/current-day";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { GetStaticProps } from "next";
import { FC } from "react";

interface IProps {
  weather: {
    forecast: { forecastday: ForecastDay[] };
    current: Current;
    location: Location;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const weather = await WeatherService.getWeather();

  return {
    props: { weather },
  };
};

const HomePage: FC<IProps> = ({ weather }) => {
  return <Home weather={weather} />;
};

export default HomePage;
