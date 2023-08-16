import Image from "next/image";
import { Inter, Rubik } from "next/font/google";
import { useState, useEffect } from "react";
import { getCurrentWeather, getForecastWeather } from "@/api/weather-api";

const inter = Inter({ subsets: ["latin"] });

type Location = {
  name: string;
  region: string;
  country: string;
  tz_id: string;
};

type Current = {
  condition: { icon: string; text: string };
  feelslike_c: number;
  last_updated: string;
  temp_c: number;
  wind_kph: number;
  precip_mm: number;
  uv: number;
  cloud: number;
};

export const Home = () => {
  const [currentWeather, setCurrentWeather] = useState<{
    location: Location;
    current: Current;
  } | null>(null);
  const [forecastWeather, setForecastWeather] = useState<{
    location: Location;
    current: Current;
  } | null>(null);
  const [location, setLocation] = useState(null);
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
      const currentData = await getCurrentWeather({ latitude, longitude });
      const forecastData = await getForecastWeather({ latitude, longitude });
      setCurrentWeather(currentData);
      setForecastWeather(forecastData);
    })();
  }, [longitude, latitude]);

  console.log(currentWeather);

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
          <h1>{currentWeather?.location.name}</h1>
          <p>Chance of rain: 0%</p>
          <p>{currentWeather?.current.temp_c}</p>
        </div>

        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </section>
      <section>
        <h2>Today&apos;s forecast</h2>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
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
