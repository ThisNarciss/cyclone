import { ForecastDay } from "@/ts/types/forecast-day";
import { filteredHoursMoreInfo } from "@/utils/filteredHour";
import Image from "next/image";
import { FC, useMemo } from "react";

interface IProps {
  bgColor?: string;
  sectionStyles?: string;
  forecastday: ForecastDay[];
}

export const TodaysForecast: FC<IProps> = ({
  bgColor = "bg-zinc-100",
  sectionStyles = "col-start-1 row-start-2 rounded-2xl px-6 py-6",
  forecastday,
}) => {
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
  );
};
