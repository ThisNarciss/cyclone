import { CitiesList } from "@/components/cities-list/CitiesList";
import { CityWeather } from "@/components/city/CityWeather";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { WeatherService } from "@/services/weather-api";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";

export const SearchCity = () => {
  const [searchCityData, setSearchCityData] = useState<any[]>([]);
  const [id, setId] = useState(0);
  const { query } = useRouter();

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
    localStorage.setItem(
      "city-weather",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("city-weather") as string),
        searchCityData[Number(id)],
      ]),
    );
  };

  if (!searchCityData?.length) {
    return;
  }
  return (
    <div className="flex items-start justify-between gap-[30px] py-[20px]">
      <section className="w-[845px]">
        <h2 className="mb-[20px] text-[14px] uppercase text-[#9399a2ff]">
          Latest searches
        </h2>
        {Boolean(searchCityData.length) && (
          <CitiesList
            cities={searchCityData}
            id={id}
            itemStyle="flex w-[845px] cursor-pointer items-center justify-between gap-[40px] rounded-2xl  px-[20px] py-[10px]"
            onClick={onItemClick}
          />
        )}
      </section>
      <div className="w-[35%]">
        <CityWeather id={id} cities={searchCityData} />
        <TodaysForecast
          bgColor="--first-bg-color"
          sectionStyles="col-start-1 row-start-2 py-10 border-b-[2px] border-[#dde0e4]"
          forecastday={searchCityData[id].forecast.forecastday}
        />
        <SevenDays
          sectionStyles="col-start-2 row-start-1 row-end-4 py-10 text-[rgb(var(--second-text-color))]"
          forecastday={searchCityData[id].forecast.forecastday}
          bgColor="bg-[var(--first-bg-color)]"
        />
      </div>
    </div>
  );
};
