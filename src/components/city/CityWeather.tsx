import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  cities: { current: Current; forecast: Forecast; location: Location }[];
  id: number;
}

export const CityWeather: FC<IProps> = ({ cities, id }) => {
  return (
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
  );
};
