import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { FaWind, FaSun } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import { filteredHours } from "@/utils/filteredHour";
import Link from "next/link";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Home = () => {
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
    () => filteredHours(forecastWeather[0]?.hour),
    [forecastWeather],
  );

  if (!forecastWeather?.length && !currentWeather) {
    return;
  }

  return (
    <div className="pt-8">
      <div className="grid grid-cols-home-columns gap-x-8 gap-y-4 ">
        <section className="col-start-1 row-start-1 flex  items-center justify-between px-10 py-10">
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
        <section className="col-start-1 row-start-2 rounded-2xl bg-zinc-100 px-6 py-6">
          <h2 className="mb-6 text-sm uppercase text-gray">
            Today&apos;s forecast
          </h2>
          {forecastWeather?.length && (
            <ul className="flex justify-around">
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
        <section className="col-start-1  row-start-3 rounded-2xl bg-zinc-100 px-6 py-6">
          <div className="mb-6 flex items-center justify-between ">
            <h2 className="text-sm  uppercase text-gray">Air conditions</h2>
            <Link
              href="/info/more-info"
              className="rounded-[10px] bg-btnColor px-2 py-1 text-[rgb(var(--background-end-rgb))]"
            >
              See more
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-y-[20px]">
            <div className="flex gap-[10px]">
              <RiTempHotLine size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Real Feel
                </h3>
                <p className="text-3xl">
                  {Math.round(currentWeather?.feelslike_c as number)}&#176;
                </p>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <FaWind size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Wind
                </h3>
                <p className="text-3xl">{currentWeather?.wind_kph} km/h</p>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <SiRainmeter size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  Chance of rain
                </h3>
                <p className="text-3xl">
                  {forecastWeather[0].day.daily_chance_of_rain}%
                </p>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <FaSun size="24px" color="rgb(147, 153, 162)" />
              <div>
                <h3 className="mb-[10px] text-xl font-normal text-gray">
                  UV Index
                </h3>
                <p className="text-3xl">{currentWeather?.uv}</p>
              </div>
            </div>
          </div>
        </section>
        <section className="col-start-2 row-start-1 row-end-4 rounded-2xl bg-zinc-100 px-6 py-6 text-[rgb(var(--second-text-color))]">
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
                        width={120}
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
