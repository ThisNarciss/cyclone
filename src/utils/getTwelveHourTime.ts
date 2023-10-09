export const getTwelveHourTime = (str: string) => {
  switch (str) {
    case "06:00":
      return "06:00a.m.";

    case "09:00":
      return "09:00a.m.";

    case "12:00":
      return "12:00p.m.";

    case "15:00":
      return "03:00p.m.";

    case "18:00":
      return "06:00p.m.";

    case "21:00":
      return "09:00p.m.";

    default:
      return "";
  }
};
