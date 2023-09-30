import { SevenDays } from "@/components/sevenday-forecast/SevenDay";
import { TodaysForecast } from "@/components/todays/TodaysForecast";
import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { getCurrentTime } from "@/utils/getCurrentTime";
import Image from "next/image";
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
          <ul className="flex flex-col gap-[10px]">
            {cities.map(({ current, location, forecast }, idx) => {
              return (
                <li
                  id={`${idx}`}
                  onClick={onItemClick}
                  key={idx}
                  className={`flex w-[845px] cursor-pointer items-center justify-between gap-[40px] rounded-2xl  px-[40px] py-[30px] ${
                    id == idx
                      ? "border-[2px] border-solid border-[#0095FF] bg-[var(--first-bg-color)]"
                      : "bg-[var(--second-bg-color)]"
                  } `}
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
        <section className="col-start-1  row-start-1 flex items-center justify-between border-b-[2px] border-[#dde0e4] py-10">
          <div className="">
            <h1 className="text-3xl">
              {cities[id].location?.name === "Proskurovak"
                ? "Khmelnytskyi"
                : cities[id].location?.name}
            </h1>
            <p className="mb-20 text-sm text-gray">
              Chance of rain:{" "}
              {cities[id].forecast.forecastday[0]?.day.daily_chance_of_rain}%
            </p>
            <p className="text-5xl">
              {Math.round(
                cities[id].forecast.forecastday[0]?.day.maxtemp_c as number,
              )}
              &#176;
            </p>
          </div>

          <Image
            className="object-cover"
            src={`https:${cities[id].forecast.forecastday[0]?.day.condition.icon}`}
            alt="weather picture"
            width={200}
            height={200}
            priority
          />
        </section>
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
