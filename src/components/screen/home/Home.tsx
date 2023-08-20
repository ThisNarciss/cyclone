import Image from "next/image";
import { Rubik } from "next/font/google";
import { useState, useEffect, useMemo } from "react";
import { FaWind, FaSun } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import { getForecastWeather } from "@/api/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";

const rubik = Rubik({ weight: ["600"], subsets: ["latin"] });

const daysOfWeek = ["Today", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Home = () => {
  const [currentWeather, setCurrentWeather] = useState<Current | null>(null);
  const [forecastWeather, setForecastWeather] = useState<ForecastDay[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  console.log(longitude);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLatitude(latitude);
        setLongitude(longitude);
      });
    } else {
      console.log("Геолокація не підтримується браузером");
    }
  }, []);

  useEffect(() => {
    if (!longitude && !latitude) {
      return;
    }
    console.log(longitude);

    (async () => {
      const forecastData = await getForecastWeather({
        latitude,
        longitude,
      });
      setCurrentWeather(forecastData.current);
      setForecastWeather(forecastData.forecast.forecastday);
      setLocation(forecastData.location);
    })();
  }, [longitude, latitude]);

  const getFilteredHour = useMemo(() => {
    return forecastWeather[0]?.hour.filter((times) => {
      switch (times.time.slice(-5)) {
        case "06:00":
          return true;

        case "09:00":
          return true;

        case "12:00":
          return true;

        case "15:00":
          return true;

        case "18:00":
          return true;

        case "21:00":
          return true;

        default:
          return false;
      }
    });
  }, [forecastWeather]);

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
            <p className="mb-40 text-base text-gray">
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
            width={240}
            height={240}
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
            <button className="rounded-[10px] bg-btnColor px-2 py-1 text-[rgb(var(--background-end-rgb))]">
              See more
            </button>
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
                    <h3>{daysOfWeek[idx]}</h3>
                    <div className="flex items-center">
                      <Image
                        className=""
                        src={`https:${day.day.condition.icon}`}
                        alt="weather picture"
                        width={120}
                        height={37}
                        priority
                      />
                      <p className="text-[rgb(var(--foreground-rgb))]">
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
