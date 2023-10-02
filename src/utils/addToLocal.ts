import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";

type Local = {
  location: Location;
  current: Current;
  forecast: Forecast;
};

export const addToLocal = (cities: Local[], id: number) => {
  if (
    JSON.parse(localStorage.getItem("city-weather") as string).some(
      (item: { location: Location }) =>
        item.location.name === cities[Number(id)].location.name,
    )
  ) {
    return;
  }
  localStorage.setItem(
    "city-weather",

    JSON.stringify([
      cities[Number(id)],
      ...JSON.parse(localStorage.getItem("city-weather") as string).slice(0, 7),
    ]),
  );
};
