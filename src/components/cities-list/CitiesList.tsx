import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { getCurrentTime } from "@/utils/getCurrentTime";
import Image from "next/image";
import { FC, MouseEvent } from "react";

interface IProps {
  cities: { current: Current; forecast: Forecast; location: Location }[];
  id: number;
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
  itemStyle?: string;
}

export const CitiesList: FC<IProps> = ({
  cities,
  onClick,
  id,
  itemStyle = "flex w-[845px] cursor-pointer items-center justify-between gap-[40px] rounded-[24px]  px-[40px] py-[30px]",
}) => {
  return (
    <ul className="flex flex-col gap-[10px]">
      {cities.map(({ current, location, forecast }, idx) => {
        return (
          <li
            id={`${idx}`}
            onClick={onClick}
            key={idx}
            className={`${itemStyle} ${
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
  );
};
