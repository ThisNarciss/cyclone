import { useState, useEffect } from "react";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { useRouter } from "next/router";
import { CityWeather } from "@/components/city/CityWeather";
import { DetailedWeatherInfo } from "@/components/detailed-info/DetailedInfo";

export const MoreInfo = () => {
  const [currentWeather, setCurrentWeather] = useState<Current | null>(null);
  const [forecastWeather, setForecastWeather] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      const forecastData = await WeatherService.getWeather(
        Number(query.lat),
        Number(query.lon),
      );

      setCurrentWeather(forecastData.current);
      setForecastWeather(forecastData.forecast.forecastday);
      setLocation(forecastData.location);
    })();
  }, [query.lat, query.lon]);

  if (!forecastWeather?.length && !currentWeather) {
    return;
  }

  return (
    <div className="pt-8">
      <div className="grid grid-cols-home-columns gap-x-8 gap-y-4 ">
        <CityWeather
          cities={[
            {
              location,
              forecast: { forecastday: forecastWeather },
              current: currentWeather,
            },
          ]}
          styles={{
            sectionStyle:
              "col-start-1 row-start-1 flex items-center justify-between px-10 py-10",
            titleStyle: "text-4xl",
            textStyle: "text-6xl",
          }}
        />
        <DetailedWeatherInfo
          currentWeather={currentWeather}
          forecastWeather={forecastWeather}
        />
        <TodaysForecast
          sectionStyles="col-start-2 row-start-1 rounded-2xl  px-6 py-6"
          forecastday={forecastWeather}
        />

        <SevenDays
          forecastday={forecastWeather}
          sectionStyles="col-start-2 row-start-2 row-end-3 rounded-2xl px-6 py-6 text-[rgb(var(--second-text-color))]"
        />
      </div>
    </div>
  );
};
