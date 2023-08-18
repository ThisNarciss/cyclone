import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import { useState, useEffect, useMemo } from "react";
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
    (async () => {
      const forecastData = await getForecastWeather({ latitude, longitude });
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
  console.log(getFilteredHour);

  console.log(forecastWeather);
  console.log(currentWeather);
  console.log(location);
  if (!forecastWeather?.length && !currentWeather) {
    return;
  }

  return (
    <div className={`container mx-auto px-8 ${rubik.className}`}>
      <div>
        <label>
          <input type="text" name="search" placeholder="Search for cities" />
        </label>
      </div>
      <div className="homeColumns gap-x-30px gap-y-15px homeRows grid">
        <section className="col-start-1 row-start-1 flex items-center justify-between">
          <div className="">
            <h1 className="text-4xl  text-black ">{location?.name}</h1>
            <p className="text-base">
              Chance of rain: {forecastWeather[0]?.day.daily_chance_of_rain}%
            </p>
            <p className="text-6xl">{currentWeather?.temp_c}&#176;</p>
          </div>

          <Image
            className=""
            src={`https:${forecastWeather[0]?.day.condition.icon}`}
            alt="weather picture"
            width={180}
            height={37}
            priority
          />
        </section>
        <section className="col-start-1 row-start-2">
          <h2>Today&apos;s forecast</h2>
          {forecastWeather?.length && (
            <ul className="flex">
              {getFilteredHour?.map((item) => {
                return (
                  <li key={item.time_epoch}>
                    <p>{item.time.slice(-5)}</p>
                    <Image
                      className=""
                      src={`https:${item.condition.icon}`}
                      alt="weather picture"
                      width={180}
                      height={37}
                      priority
                    />
                    <p>{item.temp_c}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <section className="col-start-1 row-start-3">
          <h2>Air conditions</h2>
          <button>See more</button>
          <div className="flex">
            <div>
              <div>
                <svg>
                  <use></use>
                </svg>
                <h3>Real Feel</h3>
              </div>
              <p>{currentWeather?.feelslike_c}</p>
            </div>
            <div>
              <div>
                <svg>
                  <use></use>
                </svg>
                <h3>Wind</h3>
              </div>
              <p>{currentWeather?.wind_kph} km/h</p>
            </div>
            <div>
              <div>
                <svg>
                  <use></use>
                </svg>
                <h3>Chance of rain</h3>
              </div>
              <p>{forecastWeather[0].day.daily_chance_of_rain}%</p>
            </div>
            <div>
              <div>
                <svg>
                  <use></use>
                </svg>
                <h3>UV Index</h3>
              </div>
              <p>{currentWeather?.uv}</p>
            </div>
          </div>
        </section>
        <section className="col-start-2 row-start-1 row-end-3">
          <h2>7-day forecast</h2>
          {forecastWeather.length && (
            <ul>
              {forecastWeather.slice(0, 7).map((day, idx) => {
                return (
                  <li key={day.date_epoch} className="flex">
                    <h3>{daysOfWeek[idx]}</h3>
                    <div>
                      <Image
                        className=""
                        src={`https:${day.day.condition.icon}`}
                        alt="weather picture"
                        width={180}
                        height={37}
                        priority
                      />
                      <p>{day.day.condition.text}</p>
                    </div>
                    <p>
                      {day.day.maxtemp_c}/{day.day.mintemp_c}
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
