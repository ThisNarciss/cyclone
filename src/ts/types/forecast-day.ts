type Astro = { sunrise: string; sunset: string };

type Day = {
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  uv: number;
  condition: { icon: string; text: string };
};

type Hour = {
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: { icon: string; text: string };
  temp_c: number;
  temp_f: number;
  time: string;
  uv: number;
  time_epoch: number;
};

type ForecastDay = {
  astro: Astro;
  date: string;
  day: Day;
  hour: Hour[];
};

export type Forecast = {
  forecastday: ForecastDay[];
};
