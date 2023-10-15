import Image from "next/image";
import { useState, useEffect, useMemo, FC } from "react";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay, Hour } from "@/ts/types/forecast-day";
import { Current } from "@/ts/types/current-day";
import { Location } from "@/ts/types/location";
import { filteredHours } from "@/utils/filteredHour";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { getLocation } from "@/utils/getLocation";
import { useRouter } from "next/router";
import { CityWeather } from "@/components/city/CityWeather";
import { AirConditions } from "@/components/air-conditions/AirConditions";
import { getTwelveHourTime } from "@/utils/getTwelveHourTime";

interface IProps {
  weather: {
    forecast: { forecastday: ForecastDay[] };
    current: Current;
    location: Location;
  };
}

type CurrentKey = keyof Hour;

type Items = {
  temp: string;
  speed: string;
  pressure: string;
  distance: string;
};

type General = {
  isLocOn?: boolean;
  isTwelveHourOn?: boolean;
};

export const Home: FC<IProps> = ({ weather }) => {
  const [
    {
      current: currentWeather,
      forecast: { forecastday: forecastWeather },
      location,
    },
    setWeather,
  ] = useState(weather);
  const [{ lat, lon }, setLoc] = useState({
    lat: location.lat || 0,
    lon: location.lon || 0,
  });
  const [units, setUnits] = useState<Items | null>(null);
  const [general, setGeneral] = useState<General | null>(null);
  const [isClient, setIsClient] = useState(false)
  const { query } = useRouter();

  useEffect(() => {
    setUnits(JSON.parse(localStorage.getItem("units") as string));
    setGeneral(JSON.parse(localStorage.getItem("general") as string));
  }, []);

  useEffect(() => {
    (async () => {
      if (!query.lat && !query.lon) {
        if (general?.isLocOn) {
          const { latitude, longitude } = await getLocation();
          setLoc({ lat: latitude, lon: longitude });
        }
      } else {
        setLoc({ lat: Number(query.lat), lon: Number(query.lon) });
      }
    })();
  }, [query.lat, query.lon, general]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("city-weather") as string)) {

      localStorage.setItem("city-weather", JSON.stringify([]));
    }
    if (!isClient) {
      setIsClient(true)
      
      return
    }
    
    (async () => {
      const forecastData = await WeatherService.getWeather(lat, lon);

      setWeather(forecastData);
    })();

    
    
  }, [lat, lon, isClient]);

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

        <section className="col-start-1 row-start-2 rounded-[24px] bg-[var(--second-bg-color)] px-6 py-6">
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
                    <p className="text-base text-gray">
                      {general?.isTwelveHourOn
                        ? getTwelveHourTime(item.time.slice(-5))
                        : item.time.slice(-5)}
                    </p>
                    <Image
                      className=""
                      src={`https:${item.condition.icon}`}
                      alt="weather picture"
                      width={140}
                      height={37}
                      priority
                    />
                    <p className="text-2xl">
                      {Math.round(
                        item[
                          `temp${
                            units?.temp ? units?.temp : "_c"
                          }` as CurrentKey
                        ] as number,
                      )}
                      &#176;
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <AirConditions
          currentWeather={currentWeather}
          forecastWeather={forecastWeather}
          location={{ lat, lon }}
        />
        <SevenDays forecastday={forecastWeather} />
      </div>
    </div>
  );
};
