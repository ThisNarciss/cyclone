import { WeatherService } from "@/services/weather-api";
import { filteredHoursMoreInfo } from "@/utils/filteredHour";
import { getCurrentTime } from "@/utils/getCurrentTime";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent, useMemo } from "react";

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
    <div className="flex items-start justify-between">
      <section className="w-[65%]">
        <h2 className="uppercase text-[]">Latest searches</h2>
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
              {Math.round(searchCityData[id].current?.temp_c as number)}&#176;
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
        <section className="col-start-2 row-start-1 rounded-2xl bg-zinc-100 px-6 py-6">
          <h2 className="mb-6 text-sm uppercase text-gray">
            Today&apos;s forecast
          </h2>
          {searchCityData[id].forecast.forecastday?.length && (
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
      </div>
    </div>
  );
};
export default SearchCity;
