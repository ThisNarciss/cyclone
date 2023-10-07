import { FaWind, FaSun } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import Link from "next/link";
import { FC } from "react";
import { Current } from "@/ts/types/current-day";
import { ForecastDay } from "@/ts/types/forecast-day";

interface IProps {
  currentWeather: Current;
  forecastWeather: ForecastDay[];

  location: { lat: number; lon: number };
}

export const AirConditions: FC<IProps> = ({
  currentWeather,
  forecastWeather,
  location: { lat, lon },
}) => {
  return (
    <section className="col-start-1  row-start-3 rounded-2xl bg-zinc-100 px-6 py-6">
      <div className="mb-6 flex items-center justify-between ">
        <h2 className="text-sm  uppercase text-gray">Air conditions</h2>
        <Link
          href={{
            pathname: "/info/more-info",
            query: { lat, lon },
          }}
          className="rounded-[10px] bg-btnColor px-2 py-1 text-[rgb(var(--background-end-rgb))]"
        >
          See more
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-y-[20px]">
        <div className="flex gap-[10px]">
          <RiTempHotLine size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Real Feel
            </h3>
            <p className="text-3xl">
              {Math.round(currentWeather?.feelslike_c as number)}&#176;
            </p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <FaWind size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">Wind</h3>
            <p className="text-3xl">{currentWeather?.wind_kph} km/h</p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <SiRainmeter size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Chance of rain
            </h3>
            <p className="text-3xl">
              {forecastWeather[0].day.daily_chance_of_rain}%
            </p>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <FaSun size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              UV Index
            </h3>
            <p className="text-3xl">{currentWeather?.uv}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
