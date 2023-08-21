import { Hour } from "@/ts/types/forecast-day";

export const filteredHours = (hoursArr: Hour[]) => {
  return hoursArr?.filter((times) => {
    switch (times.time.slice(-5)) {
      case "06:00":
        return true;

      case "09:00":
        return true;

      case "12:00":
        return true;

      case "15:00":
        return true;

      case "18:00":
        return true;

      case "21:00":
        return true;

      default:
        return false;
    }
  });
};

export const filteredHoursMoreInfo = (hoursArr: Hour[]) => {
  return hoursArr?.filter((times) => {
    switch (times.time.slice(-5)) {
      case "06:00":
        return true;

      case "09:00":
        return true;

      case "12:00":
        return true;

      default:
        return false;
    }
  });
};
