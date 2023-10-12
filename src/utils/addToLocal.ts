import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";

type Local = {
  location: { lat: number; lon: number; name: string };
};

export const addToLocal = (cities: Local[], id: number) => {
  if (
    JSON.parse(localStorage.getItem("city-weather") as string)?.some(
      (item: Location) => item.name === cities[id].location.name,
    )
  ) {
    return;
  }
  localStorage.setItem(
    "city-weather",

    JSON.stringify([
      {
        lat: cities[id].location.lat,
        lon: cities[id].location.lon,
        name: cities[id].location.name,
      },
      ...JSON.parse(localStorage.getItem("city-weather") as string)?.slice(
        0,
        7,
      ),
    ]),
  );
};
