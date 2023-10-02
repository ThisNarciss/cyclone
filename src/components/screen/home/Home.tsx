import Image from "next/image";
import { useState, useEffect, useMemo, FC } from "react";
import { FaWind, FaSun } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";
import { filteredHours } from "@/utils/filteredHour";
import Link from "next/link";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { getLocation } from "@/utils/getLocation";
import { useRouter } from "next/router";

interface IProps {
  weather: {
    forecast: { forecastday: ForecastDay[] };
    current: Current;
    location: Location;
  };
}

export const Home: FC<IProps> = ({ weather }) => {
  const [
    {
      current: currentWeather,
      forecast: { forecastday: forecastWeather },
      location,
    },
    setWeather,
  ] = useState(weather);
  const [{ lat, lon }, setLoc] = useState({ lat: 0, lon: 0 });

  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (!query.lat && !query.lon) {
        const { latitude, longitude } = await getLocation();
        setLoc({ lat: latitude, lon: longitude });
      } else {
        setLoc({ lat: Number(query.lat), lon: Number(query.lon) });
      }
    })();
  }, [query.lat, query.lon]);

  useEffect(() => {
    if (!lat && !lon) {
      return;
    }
    (async () => {
      const forecastData = await WeatherService.getWeather(lat, lon);

      setWeather(forecastData);
    })();
    if (!JSON.parse(localStorage.getItem("city-weather") as string)) {
      localStorage.setItem("city-weather", JSON.stringify([]));
    }
  }, [lat, lon]);

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
              {Math.round(forecastWeather[0]?.day.maxtemp_c as number)}&#176;
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
        <SevenDays forecastday={forecastWeather} />
      </div>
    </div>
  );
};
