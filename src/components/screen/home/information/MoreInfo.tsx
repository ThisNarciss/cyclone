import Image from "next/image";
import { useState, useEffect } from "react";
import { FaWind, FaSun, FaShower } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import { MdVisibility } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { FiSunset } from "react-icons/fi";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { getLocation } from "@/utils/getLocation";

export const MoreInfo = () => {
  const [currentWeather, setCurrentWeather] = useState<Current | null>(null);
  const [forecastWeather, setForecastWeather] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    (async () => {
      const { latitude, longitude } = await getLocation();
      const forecastData = await WeatherService.getWeather(latitude, longitude);

      setCurrentWeather(forecastData.current);
      setForecastWeather(forecastData.forecast.forecastday);
      setLocation(forecastData.location);
    })();
  }, []);

  if (!forecastWeather?.length && !currentWeather) {
    return;
  }

  return (
    <div className="pt-8">
      <div className="grid grid-cols-home-columns gap-x-8 gap-y-4 ">
        <section className="col-start-1 row-start-1 flex items-center justify-between px-10 py-10">
          <div className="">
            <h1 className="text-4xl">
              {location?.name === "Proskurovak"
                ? "Khmelnytskyi"
                : location?.name}
            </h1>
            <p className="mb-20 text-base text-gray">
              Chance of rain: {forecastWeather[0]?.day.daily_chance_of_rain}%
            </p>
            <p className="text-6xl">
              {Math.round(currentWeather?.temp_c as number)}&#176;
            </p>
          </div>

          <Image
            className="object-cover"
            src={`https:${forecastWeather[0]?.day.condition.icon}`}
            alt="weather picture"
            width={200}
            height={200}
            priority
          />
        </section>
        <TodaysForecast
          sectionStyles="col-start-2 row-start-1 rounded-2xl  px-6 py-6"
          forecastday={forecastWeather}
        />
        <section className="col-start-1  row-start-2 row-end-3 ">
          <ul className="flex flex-wrap gap-x-[30px] gap-y-[20px]">
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <FaSun size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  UV Index
                </h3>
                <p className="text-3xl">{currentWeather?.uv}</p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <FaWind size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Wind
                </h3>
                <p className="text-3xl">{currentWeather?.wind_kph} km/h</p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <FaShower size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Humidity
                </h3>
                <p className="text-3xl">
                  {Math.round(currentWeather?.humidity as number)}%
                </p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <MdVisibility size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Visibility
                </h3>
                <p className="text-3xl">{currentWeather?.vis_km} km</p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <RiTempHotLine size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Feels like
                </h3>
                <p className="text-3xl">
                  {Math.round(currentWeather?.feelslike_c as number)}&#176;
                </p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <SiRainmeter size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Chance of rain
                </h3>
                <p className="text-3xl">
                  {forecastWeather[0].day.daily_chance_of_rain}%
                </p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <IoIosSpeedometer size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Pressure
                </h3>
                <p className="text-3xl">{currentWeather?.pressure_mb} hPa</p>
              </div>
            </li>
            <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
              <FiSunset size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Sunset
                </h3>
                <p className="text-3xl">{forecastWeather[0].astro.sunset}</p>
              </div>
            </li>
          </ul>
        </section>
        <SevenDays
          forecastday={forecastWeather}
          sectionStyles="col-start-2 row-start-2 row-end-3 rounded-2xl px-6 py-6 text-[rgb(var(--second-text-color))]"
        />
      </div>
    </div>
  );
};
