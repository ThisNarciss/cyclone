import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
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
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { filteredHoursMoreInfo } from "@/utils/filteredHour";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MoreInfo = () => {
  const [currentWeather, setCurrentWeather] = useState<Current | null>(null);
  const [forecastWeather, setForecastWeather] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    (async () => {
      const forecastData = await WeatherService.getWeather();
      setCurrentWeather(forecastData.current);
      setForecastWeather(forecastData.forecast.forecastday);
      setLocation(forecastData.location);
    })();
  }, []);

  const getFilteredHour = useMemo(
    () => filteredHoursMoreInfo(forecastWeather[0]?.hour),
    [forecastWeather],
  );

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
        <section className="col-start-2 row-start-1 rounded-2xl bg-zinc-100 px-6 py-6">
          <h2 className="mb-6 text-sm uppercase text-gray">
            Today&apos;s forecast
          </h2>
          {forecastWeather?.length && (
            <ul className="flex items-center justify-around">
              {getFilteredHour?.map((item) => {
                return (
                  <li
                    key={item.time_epoch}
                    className="border-r-2 border-borderColor text-center last:border-none"
                  >
                    <p className="text-base text-gray">{item.time.slice(-5)}</p>
                    <Image
                      className=""
                      src={`https:${item.condition.icon}`}
                      alt="weather picture"
                      width={140}
                      height={37}
                      priority
                    />
                    <p className="text-2xl">{Math.round(item.temp_c)}&#176;</p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
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
        <section className="col-start-2 row-start-2 row-end-3 rounded-2xl bg-zinc-100 px-6 py-6 text-[rgb(var(--second-text-color))]">
          <h2 className="uppercase">7-day forecast</h2>
          {forecastWeather.length && (
            <ul className="flex flex-col justify-between gap-2">
              {forecastWeather.slice(0, 7).map((day, idx) => {
                return (
                  <li
                    key={day.date_epoch}
                    className="flex items-center justify-between border-b-2 border-borderColor last:border-none"
                  >
                    <h3 className="w-[46px]">
                      {idx === 0 ? "Today" : daysOfWeek[getDayOfWeek(day.date)]}
                    </h3>
                    <div className="flex  items-center">
                      <Image
                        className=""
                        src={`https:${day.day.condition.icon}`}
                        alt="weather picture"
                        width={58}
                        height={37}
                        priority
                      />
                      <p className="w-[50px] text-[rgb(var(--foreground-rgb))]">
                        {day.day.condition.text}
                      </p>
                    </div>
                    <p>
                      <span className="text-[rgb(var(--foreground-rgb))]">
                        {Math.round(day.day.maxtemp_c)}
                      </span>
                      /{Math.round(day.day.mintemp_c)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};
