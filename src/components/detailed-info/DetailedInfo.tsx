import { FaWind, FaSun, FaShower } from "react-icons/fa";
import { SiRainmeter } from "react-icons/si";
import { RiTempHotLine } from "react-icons/ri";
import { MdVisibility } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { FiSunset } from "react-icons/fi";
import { FC } from "react";
import { Current } from "@/ts/types/current-day";
import { ForecastDay } from "@/ts/types/forecast-day";

interface IProps {
  currentWeather: Current | null;
  forecastWeather: ForecastDay[];
}

export const DetailedWeatherInfo: FC<IProps> = ({
  currentWeather,
  forecastWeather,
}) => {
  return (
    <section className="col-start-1  row-start-2 row-end-3 ">
      <ul className="flex flex-wrap gap-x-[30px] gap-y-[20px]">
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <FaSun size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              UV Index
            </h3>
            <p className="text-3xl">{currentWeather?.uv}</p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <FaWind size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">Wind</h3>
            <p className="text-3xl">{currentWeather?.wind_kph} km/h</p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <FaShower size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Humidity
            </h3>
            <p className="text-3xl">
              {Math.round(currentWeather?.humidity as number)}%
            </p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <MdVisibility size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Visibility
            </h3>
            <p className="text-3xl">{currentWeather?.vis_km} km</p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <RiTempHotLine size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Feels like
            </h3>
            <p className="text-3xl">
              {Math.round(currentWeather?.feelslike_c as number)}&#176;
            </p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <SiRainmeter size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Chance of rain
            </h3>
            <p className="text-3xl">
              {forecastWeather[0].day.daily_chance_of_rain}%
            </p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <IoIosSpeedometer size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">
              Pressure
            </h3>
            <p className="text-3xl">{currentWeather?.pressure_mb} hPa</p>
          </div>
        </li>
        <li className="flex basis-[calc(50%-15px)] gap-[10px] rounded-2xl bg-zinc-100 px-6 py-6">
          <FiSunset size="24px" color="rgb(147, 153, 162)" />
          <div>
            <h3 className="mb-[10px] text-xl font-normal text-gray">Sunset</h3>
            <p className="text-3xl">{forecastWeather[0].astro.sunset}</p>
          </div>
        </li>
      </ul>
    </section>
  );
};