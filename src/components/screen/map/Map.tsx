import { WeatherService } from "@/services/weather-api";
import { Current } from "@/ts/types/current-day";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { addToLocal } from "@/utils/addToLocal";
import { getCurrentTime } from "@/utils/getCurrentTime";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";
import { GoogleMap } from "./google-map/GoogleMap";
import { nanoid } from "nanoid";

interface IWeather {
  forecast: { forecastday: ForecastDay[] };
  current: Current;
  location: Location;
}

export const Map = () => {
  const [weatherData, setWeatherData] = useState<IWeather[]>([]);
  const [markers, setMarkers] = useState<
    { id: string; lat: number; lng: number; city: string }[]
  >([]);

  const router = useRouter();

  const handleMapClick = async ({ lat, lng }: { lat: number; lng: number }) => {
    const weather = await WeatherService.getWeather(lat, lng);

    if (
      weatherData.some((item) => item.location.name === weather.location.name)
    ) {
      return;
    }
    setWeatherData((prevState) => [weather, ...prevState.slice(0, 8)]);
    setMarkers((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        lat: Number(lat.toFixed(6)),
        lng: Number(lng.toFixed(6)),
        city: weather.location.name,
      },
    ]);
  };

  const onItemClick = (e: MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    addToLocal(weatherData, Number(id));
    router.push({
      pathname: "/",
      query: {
        lon: weatherData[Number(id)].location.lon,
        lat: weatherData[Number(id)].location.lat,
      },
    });
  };

  return (
    <div className="mt-[20px] flex items-start gap-[20px]">
      <div className=" h-[800px] w-[65%]  overflow-hidden rounded-2xl">
        <GoogleMap handleMapClick={handleMapClick} markers={markers} />
      </div>
      {Boolean(weatherData.length) && (
        <ul className="flex w-[418px] flex-col gap-[10px]">
          {weatherData.map(({ location, current, forecast }, idx) => {
            return (
              <li
                id={`${idx}`}
                key={idx}
                onClick={onItemClick}
                className={`flex w-[100%] cursor-pointer items-center justify-between gap-[40px] rounded-2xl  bg-[var(--second-bg-color)] px-[20px]  py-[10px]
                `}
              >
                <div className="flex items-center gap-[20px]">
                  <Image
                    src={`https:${current.condition.icon}`}
                    alt="weather picture"
                    width={60}
                    height={60}
                  />
                  <div>
                    <h2>
                      {location.name === "Proskurovak"
                        ? "Khmelnytskyi"
                        : location.name}
                    </h2>
                    <p>{getCurrentTime()}</p>
                  </div>
                </div>

                <p className="text-[25px] text-[#9399a2ff]">
                  {Math.round(forecast.forecastday[0]?.day.maxtemp_c)}&#176;
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
