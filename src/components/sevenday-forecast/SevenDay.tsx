import { Day, ForecastDay } from "@/ts/types/forecast-day";
import { getDayOfWeek } from "@/utils/getDayOfWeek";
import Image from "next/image";
import { FC, useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface IProps {
  forecastday: ForecastDay[];
  bgColor?: string;
  sectionStyles?: string;
}
type Items = {
  temp: string;
  speed: string;
  pressure: string;
  distance: string;
};

type CurrentKey = keyof Day;

export const SevenDays: FC<IProps> = ({
  forecastday,
  bgColor = "bg-[var(--second-bg-color)]",
  sectionStyles = "col-start-2 row-start-1 row-end-4 rounded-2xl px-6 py-6 text-[rgb(var(--second-text-color))]",
}) => {
  const [units, setUnits] = useState<Items | null>(null);

  useEffect(() => {
    setUnits(JSON.parse(localStorage.getItem("units") as string));
  }, []);

  return (
    <section className={`${sectionStyles} ${bgColor}`}>
      <h2 className="text-[14px] uppercase">3-day forecast</h2>
      {forecastday.length && (
        <ul className="flex flex-col justify-between gap-2">
          {forecastday.slice(0, 7).map((day, idx) => {
            return (
              <li
                key={day.date_epoch}
                className="flex items-center justify-between border-b-2 border-borderColor last:border-none"
              >
                <h3 className="w-[46px]">
                  {idx === 0 ? "Today" : daysOfWeek[getDayOfWeek(day.date)]}
                </h3>
                <div className="flex  items-center">
                  <Image
                    className=""
                    src={`https:${day.day.condition.icon}`}
                    alt="weather picture"
                    width={120}
                    height={37}
                    priority
                  />
                  <p className="w-[50px] text-[rgb(var(--foreground-rgb))]">
                    {day.day.condition.text}
                  </p>
                </div>
                <p>
                  <span className="text-[rgb(var(--foreground-rgb))]">
                    {Math.round(
                      day.day[
                        `maxtemp${
                          units?.temp ? units?.temp : "_c"
                        }` as CurrentKey
                      ] as number,
                    )}
                  </span>
                  /
                  {Math.round(
                    day.day[
                      `mintemp${units?.temp ? units?.temp : "_c"}` as CurrentKey
                    ] as number,
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
