import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import { useState, useEffect, useMemo } from "react";
import { getForecastWeather } from "@/api/weather-api";
import { Forecast } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";

const inter = Inter({ subsets: ["latin"] });

export const Home = () => {
  const [currentWeather, setCurrentWeather] = useState<Current | null>(null);
  const [forecastWeather, setForecastWeather] = useState<Forecast | null>(null);
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
      setForecastWeather(forecastData.forecast);
      setLocation(forecastData.location);
    })();
  }, [longitude, latitude]);

  const getFilteredHour = useMemo(() => {
    return forecastWeather?.forecastday[0].hour.filter((times) => {
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

  // const { name, region, country, tz_id }: Location = weather.location;
  // const {
  //   condition,
  //   feelslike_c,
  //   last_updated,
  //   temp_c,
  //   wind_kph,
  //   precip_mm,
  //   uv,
  //   cloud,
  // }: Current = weather.current;

  return (
    <div>
      <div>
        <label>
          <input type="text" name="search" placeholder="Search for cities" />
        </label>
      </div>
      <section>
        <div>
          <h1>{location?.name}</h1>
          <p>{forecastWeather?.forecastday[0].day.daily_chance_of_rain}</p>
          <p>{currentWeather?.temp_c}</p>
        </div>

        <Image
          className=""
          src={`https:${forecastWeather?.forecastday[0].day.condition.icon}`}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </section>
      <section>
        <h2>Today&apos;s forecast</h2>
        {forecastWeather?.forecastday.length && (
          <ul>
            {getFilteredHour?.map((item) => {
              return (
                <li key={item.time_epoch}>
                  <p>{item.time.slice(-5)}</p>
                  <Image
                    className=""
                    src={`https:${item.condition.icon}`}
                    alt="Next.js Logo"
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
      <section>
        <h2>air conditions</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
      <section>
        <h2>7-day forecast</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
  );
};
