import { WeatherService } from "@/services/weather-api";
import { getCurrentTime } from "@/utils/getCurrentTime";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SearchCity = () => {
  const [searchCityData, setSearchCityData] = useState<any[]>([]);
  const { pathname, query } = useRouter();

  console.log(searchCityData);

  useEffect(() => {
    if (!query.slug) {
      return;
    }
    (async () => {
      const data = await WeatherService.searchCityWeather(query.slug);
      setSearchCityData(data);
    })();
  }, [query.slug]);
  console.log(getCurrentTime());

  return (
    <section>
      {Boolean(searchCityData.length) && (
        <ul>
          {searchCityData.map(({ current, location, forecast }, idx) => {
            return (
              <li key={idx} className="flex items-center gap-[40px]">
                <Image
                  src={`https:${current.condition.icon}`}
                  alt="weather picture"
                  width={50}
                  height={50}
                />
                <div>
                  <h2>{location.name}</h2>
                  <p>{getCurrentTime()}</p>
                </div>
                <p>{current.temp_c}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
export default SearchCity;
