import { WeatherService } from "@/services/weather-api";
import { Current } from "@/ts/types/current-day";
import { ForecastDay } from "@/ts/types/forecast-day";
import { Location } from "@/ts/types/location";
import { addToLocal } from "@/utils/addToLocal";
import { getCurrentTime } from "@/utils/getCurrentTime";
import GoogleMapReact from "google-map-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, MouseEvent } from "react";

interface IWeather {
  forecast: { forecastday: ForecastDay[] };
  current: Current;
  location: Location;
}

// const Marker = ({ text }: { text: string }) => (
//   <div className="h-[50px] w-[50px] bg-[#000000] text-[#FFFFFF]">{text}</div>
// );

export const Map = () => {
  const [weatherData, setWeatherData] = useState<IWeather[]>([]);
  const [clickedCoordinates, setClickedCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [marker, setMarker] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!clickedCoordinates) {
      return;
    }
    (async () => {
      const weather = await WeatherService.getWeather(
        clickedCoordinates?.lat,
        clickedCoordinates?.lng,
      );

      setWeatherData((prevState) => [...prevState, weather]);
    })();
  }, [clickedCoordinates]);

  const handleMapClick = ({
    lat,
    lng,
    event,
  }: {
    lat: number;
    lng: number;
    event: any;
  }) => {
    setClickedCoordinates({ lat, lng });
  };

  const onItemClick = (e: MouseEvent<HTMLLIElement>) => {
    const id = e.currentTarget.id;
    addToLocal(weatherData, Number(id));
    router.push({
      pathname: "/",
      query: {
        lon: weatherData[Number(id)].location.lon,
        lat: weatherData[Number(id)].location.lat,
      },
    });
  };

  return (
    <div className="mt-[20px] flex items-start gap-[20px]">
      <div className=" h-[800px] w-[65%]  overflow-hidden rounded-2xl">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCDxegmJ-mKsi8QllTO5owrclwEaPxnEr8",
          }}
          defaultCenter={{ lat: 50.449467834084736, lng: 30.5273104946471 }}
          defaultZoom={11}
          onClick={handleMapClick}
        >
          {/* <Marker
            lat={50.955413}
            lng={30.337844}
            text={weatherData[0]?.location.name}
          /> */}
        </GoogleMapReact>
      </div>
      {Boolean(weatherData.length) && (
        <ul className="flex w-[418px] flex-col gap-[10px]">
          {weatherData.map(({ location, current, forecast }, idx) => {
            return (
              <li
                id={`${idx}`}
                key={idx}
                onClick={onItemClick}
                className={`flex w-[100%] cursor-pointer items-center justify-between gap-[40px] rounded-2xl  bg-[var(--second-bg-color)] px-[20px]  py-[10px]
                `}
              >
                <div className="flex items-center gap-[20px]">
                  <Image
                    src={`https:${current.condition.icon}`}
                    alt="weather picture"
                    width={60}
                    height={60}
                  />
                  <div>
                    <h2>
                      {location.name === "Proskurovak"
                        ? "Khmelnytskyi"
                        : location.name}
                    </h2>
                    <p>{getCurrentTime()}</p>
                  </div>
                </div>

                <p className="text-[25px] text-[#9399a2ff]">
                  {Math.round(forecast.forecastday[0]?.day.maxtemp_c)}&#176;
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
