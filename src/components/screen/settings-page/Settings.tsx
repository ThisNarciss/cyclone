import { useEffect, useState, ChangeEvent } from "react";

type Units = {
  temp?: string;
  speed?: string;
  pressure?: string;
  distance?: string;
};
type General = {
  isLocOn?: boolean;
  isTwelveHourOn?: boolean;
};

export const Settings = () => {
  const [units, setUnits] = useState<Units | null>(() => {
    if (typeof localStorage !== "undefined") {
      return JSON.parse(localStorage.getItem("units") as string);
    } else {
      return null;
    }
  });
  const [general, setGeneral] = useState<General | null>(() => {
    if (typeof localStorage !== "undefined") {
      return JSON.parse(localStorage.getItem("general") as string);
    } else {
      return null;
    }
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    localStorage.setItem("units", JSON.stringify(units));
    localStorage.setItem("general", JSON.stringify(general));
  }, [units, general]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const obj: { [key: string]: string } = {};
    const key = e.target.name;
    const val = e.target.value;

    obj[key] = val;

    setUnits((prevState) => ({ ...prevState, ...obj }));
  };

  const onBtnLocClick = () => {
    if (general?.isLocOn) {
      setGeneral((prevState) => ({ ...prevState, isLocOn: false }));
    } else {
      setGeneral((prevState) => ({ ...prevState, isLocOn: true }));
    }
  };
  const onBtnTwelveHourClick = () => {
    if (general?.isTwelveHourOn) {
      setGeneral((prevState) => ({ ...prevState, isTwelveHourOn: false }));
    } else {
      setGeneral((prevState) => ({ ...prevState, isTwelveHourOn: true }));
    }
  };

  return (
    isClient && (
      <section className="w-[65%] pt-[20px]">
        <h2 className="mb-[20px] text-[20px] font-[600] leading-[1.3]">
          Units
        </h2>
        <div className="mb-[20px]  rounded-[24px] bg-[var(--second-bg-color)] p-[20px]">
          <p className="mb-[10px] text-[14px] font-[600] uppercase leading-[1.43] text-[#9399a2]">
            Temperature
          </p>
          <div className="mb-[20px] flex items-center justify-between rounded-[10px] bg-[#c4cad3] p-[3px]">
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="temp"
                value="_c"
                checked={units?.temp === "_c"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.temp === "_c" ? "bg-[#dde0e4]" : ""
                }`}
              >
                Celsius
              </p>
            </label>
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="temp"
                value="_f"
                checked={units?.temp === "_f"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.temp === "_f" ? "bg-[#dde0e4]" : ""
                }`}
              >
                Fahrenheit
              </p>
            </label>
          </div>

          <p className="mb-[10px] text-[14px] font-[600] uppercase leading-[1.43] text-[#9399a2]">
            Wind speed
          </p>
          <div className="mb-[20px] flex items-center justify-between rounded-[10px] bg-[#c4cad3] p-[3px]">
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="speed"
                value="_kph"
                checked={units?.speed === "_kph"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.speed === "_kph" ? "bg-[#dde0e4]" : ""
                }`}
              >
                km/h
              </p>
            </label>
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="speed"
                value="_mph"
                checked={units?.speed === "_mph"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.speed === "_mph" ? "bg-[#dde0e4]" : ""
                }`}
              >
                mp/h
              </p>
            </label>
          </div>
          <p className="mb-[10px] text-[14px] font-[600] uppercase leading-[1.43] text-[#9399a2]">
            Pressure
          </p>
          <div className="mb-[20px] flex items-center justify-between rounded-[10px] bg-[#c4cad3] p-[3px]">
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="pressure"
                value="_in"
                checked={units?.pressure === "_in"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.pressure === "_in" ? "bg-[#dde0e4]" : ""
                }`}
              >
                mm
              </p>
            </label>
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="pressure"
                value="_mb"
                checked={units?.pressure === "_mb"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.pressure === "_mb" ? "bg-[#dde0e4]" : ""
                }`}
              >
                hPa
              </p>
            </label>
          </div>
          <p className="text-[14px] font-[600] uppercase leading-[1.43] text-[#9399a2]">
            Distance
          </p>
          <div className="flex items-center justify-between rounded-[10px] bg-[#c4cad3] p-[3px]">
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="distance"
                value="_km"
                checked={units?.distance === "_km"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.distance === "_km" ? "bg-[#dde0e4]" : ""
                }`}
              >
                Kilometers
              </p>
            </label>
            <label className="w-[50%]">
              <input
                className="hidden"
                onChange={handleInputChange}
                type="radio"
                name="distance"
                value="_miles"
                checked={units?.distance === "_miles"}
              />
              <p
                className={`rounded-[10px] p-[5px] text-center ${
                  units?.distance === "_miles" ? "bg-[#dde0e4]" : ""
                }`}
              >
                Miles
              </p>
            </label>
          </div>
        </div>
        <h2 className="mb-[20px] text-[20px] font-[600] leading-[1.3]">
          General
        </h2>
        <div>
          <ul className="rounded-[24px] bg-[var(--second-bg-color)]">
            <li className="flex items-center justify-between  p-[20px]">
              <h3>12-Hour Time</h3>
              <button
                className="flex w-[40px] flex-col rounded-[10px] bg-[#0095ff] p-[3px] transition-transform duration-300 ease-linear"
                onClick={onBtnTwelveHourClick}
              >
                <div
                  className={`${
                    general?.isTwelveHourOn
                      ? "translate-x-[130%]"
                      : "translate-x-0"
                  } h-[15px] w-[15px] rounded-[50%] bg-[#FFFFFF] transition-transform duration-100 ease-linear`}
                ></div>
              </button>
            </li>
            <li className="flex items-center justify-between p-[20px]">
              <h3>Location</h3>
              <button
                className="w-[40px] rounded-[10px] bg-[#0095ff] p-[3px]"
                onClick={onBtnLocClick}
              >
                <div
                  className={`${
                    general?.isLocOn ? "translate-x-[130%]" : "translate-x-0"
                  } h-[15px] w-[15px] rounded-[50%] bg-[#FFFFFF] transition-transform duration-100 ease-linear`}
                ></div>
              </button>
            </li>
          </ul>
        </div>
      </section>
    )
  );
};
