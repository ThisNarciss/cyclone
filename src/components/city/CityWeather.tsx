import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import Image from "next/image";
import { FC } from "react";

interface IProps {
  cities: {
    current: Current | null;
    forecast: Forecast;
    location: Location | null;
  }[];
  id?: number;
  styles?: { sectionStyle: string; titleStyle: string; textStyle: string };
}

const stylesData = {
  sectionStyle:
    "col-start-1  row-start-1 flex items-center justify-between border-b-[2px] border-[#dde0e4] py-10",
  titleStyle: "text-3xl",
  textStyle: "text-5xl",
};

export const CityWeather: FC<IProps> = ({
  cities,
  id = 0,
  styles = stylesData,
}) => {
  return (
    <section className={`${styles.sectionStyle}`}>
      <div className="">
        <h1 className={`${styles.titleStyle}`}>
          {cities[id].location?.name === "Proskurovak"
            ? "Khmelnytskyi"
            : cities[id].location?.name}
        </h1>
        <p className="mb-20 text-sm text-gray">
          Chance of rain:{" "}
          {cities[id].forecast.forecastday[0]?.day.daily_chance_of_rain}%
        </p>
        <p className={`${styles.textStyle}`}>
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
