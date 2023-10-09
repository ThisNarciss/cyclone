import { ForecastDay, Hour } from "@/ts/types/forecast-day";
import { filteredHoursMoreInfo } from "@/utils/filteredHour";
import { getTwelveHourTime } from "@/utils/getTwelveHourTime";
import Image from "next/image";
import { FC, useMemo, useState, useEffect } from "react";

interface IProps {
  bgColor?: string;
  sectionStyles?: string;
  forecastday: ForecastDay[];
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

export const TodaysForecast: FC<IProps> = ({
  bgColor = "bg-zinc-100",
  sectionStyles = "col-start-1 row-start-2 rounded-2xl px-6 py-6",
  forecastday,
}) => {
  const [units, setUnits] = useState<Items | null>(null);
  const [general, setGeneral] = useState<General | null>(null);

  useEffect(() => {
    setUnits(JSON.parse(localStorage.getItem("units") as string));
    setGeneral(JSON.parse(localStorage.getItem("general") as string));
  }, []);

  const getFilteredHour = useMemo(
    () => filteredHoursMoreInfo(forecastday[0]?.hour),
    [forecastday],
  );

  return (
    <section className={`${sectionStyles} ${bgColor}`}>
      <h2 className="mb-6 text-sm uppercase text-gray">
        Today&apos;s forecast
      </h2>
      {forecastday?.length && (
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
                      `temp${units?.temp ? units?.temp : "_c"}` as CurrentKey
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
  );
};
