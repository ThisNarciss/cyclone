import { CitiesList } from "@/components/cities-list/CitiesList";
import { CityWeather } from "@/components/city/CityWeather";
import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { FC, useState, MouseEvent, useEffect } from "react";

export const Cities: FC = () => {
  const [cities, setCities] = useState<
    { current: Current; forecast: Forecast; location: Location }[]
  >([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("city-weather") as string);
    setCities(data);
  }, []);

  const onItemClick = (e: MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    setId(Number(id));
  };

  if (!cities.length) {
    return;
  }

  return (
    <div className="flex items-start justify-between gap-[30px] py-[20px]">
      <section className="w-[845px]">
        {Boolean(cities.length) && (
          <CitiesList cities={cities} id={id} onClick={onItemClick} />
        )}
      </section>
      <div className="w-[35%]">
        <CityWeather id={id} cities={cities} />
        <TodaysForecast
          bgColor="--first-bg-color"
          sectionStyles="col-start-1 row-start-2 py-10 border-b-[2px] border-[#dde0e4]"
          forecastday={cities[id].forecast.forecastday}
        />
        <SevenDays
          sectionStyles="col-start-2 row-start-1 row-end-4 py-10 text-[rgb(var(--second-text-color))]"
          forecastday={cities[id].forecast.forecastday}
          bgColor="bg-[var(--first-bg-color)]"
        />
      </div>
    </div>
  );
};
