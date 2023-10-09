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
  const [isLocOn, setIsLocOn] = useState(false);
  const [isTwelveHourOn, setIsTwelveHourOn] = useState(false);

  useEffect(() => {
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
    if (isLocOn) {
      setIsLocOn(false);
      setGeneral((prevState) => ({ ...prevState, isLocOn: false }));
    } else {
      setIsLocOn(true);
      setGeneral((prevState) => ({ ...prevState, isLocOn: true }));
    }
  };
  const onBtnTwelveHourClick = () => {
    if (isTwelveHourOn) {
      setIsTwelveHourOn(false);
      setGeneral((prevState) => ({ ...prevState, isTwelveHourOn: false }));
    } else {
      setIsTwelveHourOn(true);
      setGeneral((prevState) => ({ ...prevState, isTwelveHourOn: true }));
    }
  };

  return (
    <section>
      <div>
        <h2>Units</h2>
        <p>Temperature</p>
        <label>
          Celsius
          <input
            onChange={handleInputChange}
            type="radio"
            name="temp"
            value="_c"
          />
        </label>
        <label>
          Fahrenheit
          <input
            onChange={handleInputChange}
            type="radio"
            name="temp"
            value="_f"
          />
        </label>

        <p>Wind speed</p>
        <label>
          km/h
          <input
            onChange={handleInputChange}
            type="radio"
            name="speed"
            value="_kph"
          />
        </label>
        <label>
          mp/h
          <input
            onChange={handleInputChange}
            type="radio"
            name="speed"
            value="_mph"
          />
        </label>
        <p>Pressure</p>
        <label>
          mm
          <input
            onChange={handleInputChange}
            type="radio"
            name="pressure"
            value="_in"
          />
        </label>
        <label>
          hPa
          <input
            onChange={handleInputChange}
            type="radio"
            name="pressure"
            value="_mb"
          />
        </label>
        <p>Distance</p>
        <label>
          Kilometers
          <input
            onChange={handleInputChange}
            type="radio"
            name="distance"
            value="_km"
          />
        </label>
        <label>
          Miles
          <input
            onChange={handleInputChange}
            type="radio"
            name="distance"
            value="_miles"
          />
        </label>
      </div>
      <div>
        <h2>General</h2>
        <ul>
          <li className="flex items-center justify-between">
            <h3>12-Hour Time</h3>
            <button
              className="flex w-[40px] flex-col rounded-[10px] bg-[#0095ff] p-[3px] transition-transform duration-300 ease-linear"
              onClick={onBtnTwelveHourClick}
            >
              <div
                className={`${
                  isTwelveHourOn ? "translate-x-[130%]" : "translate-x-0"
                } h-[15px] w-[15px] rounded-[50%] bg-[#FFFFFF] transition-transform duration-100 ease-linear`}
              ></div>
            </button>
          </li>
          <li className="flex items-center justify-between">
            <h3>Location</h3>
            <button
              className="w-[40px] rounded-[10px] bg-[#0095ff] p-[3px]"
              onClick={onBtnLocClick}
            >
              <div
                className={`${
                  isLocOn ? "translate-x-[130%]" : "translate-x-0"
                } h-[15px] w-[15px] rounded-[50%] bg-[#FFFFFF] transition-transform duration-100 ease-linear`}
              ></div>
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
