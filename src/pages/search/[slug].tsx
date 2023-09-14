import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { WeatherService } from "@/services/weather-api";
import { ForecastDay } from "@/ts/types/forecast-day";
import { filteredHoursMoreInfo } from "@/utils/filteredHour";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent, useMemo } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SearchCity = () => {
  const [searchCityData, setSearchCityData] = useState<any[]>([]);
  const [id, setId] = useState(0);
  const { pathname, query } = useRouter();

  console.log(searchCityData);

  const getFilteredHour = useMemo(
    () =>
      filteredHoursMoreInfo(searchCityData[id]?.forecast.forecastday[0]?.hour),
    [searchCityData, id],
  );

  useEffect(() => {
    if (!query.slug) {
      return;
    }
    (async () => {
      const data = await WeatherService.searchCityWeather(query.slug);
      setSearchCityData(data);
    })();
  }, [query.slug]);

  const onItemClick = (e: MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    setId(Number(id));
  };

  if (!searchCityData?.length) {
    return;
  }
  return (
    <div className="flex items-start justify-between py-[20px]">
      <section className="w-[65%]">
        <h2 className="mb-[20px] text-[14px] uppercase text-[#9399a2ff]">
          Latest searches
        </h2>
        {Boolean(searchCityData.length) && (
          <ul className="flex flex-col gap-[10px]">
            {searchCityData.map(({ current, location, forecast }, idx) => {
              return (
                <li
                  id={`${idx}`}
                  onClick={onItemClick}
                  key={idx}
                  className="flex max-w-[843px] cursor-pointer items-center justify-between gap-[40px] rounded-2xl bg-zinc-100 px-[20px] py-[10px]"
                >
                  <div className="flex items-center gap-[20px]">
                    <Image
                      src={`https:${current.condition.icon}`}
                      alt="weather picture"
                      width={60}
                      height={60}
                    />
                    <div>
                      <h2>{location.name}</h2>
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
      </section>
      <div className="w-[35%]">
        <section className="col-start-1 row-start-1 flex  items-center justify-between px-10 py-10">
          <div className="">
            <h1 className="text-3xl">
              {searchCityData[id].location?.name === "Proskurovak"
                ? "Khmelnytskyi"
                : searchCityData[id].location?.name}
            </h1>
            <p className="mb-20 text-sm text-gray">
              Chance of rain:{" "}
              {
                searchCityData[id].forecast.forecastday[0]?.day
                  .daily_chance_of_rain
              }
              %
            </p>
            <p className="text-5xl">
              {Math.round(
                searchCityData[id].forecast.forecastday[0]?.day
                  .maxtemp_c as number,
              )}
              &#176;
            </p>
          </div>

          <Image
            className="object-cover"
            src={`https:${searchCityData[id].forecast.forecastday[0]?.day.condition.icon}`}
            alt="weather picture"
            width={200}
            height={200}
            priority
          />
        </section>
        <TodaysForecast
          bgColor="--first-bg-color"
          forecastday={searchCityData[id].forecast.forecastday}
        />
        <SevenDays
          forecastday={searchCityData[id].forecast.forecastday}
          bgColor="bg-[var(--first-bg-color)]"
        />
      </div>
    </div>
  );
};
export default SearchCity;
