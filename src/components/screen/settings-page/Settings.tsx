import { useEffect, useState, ChangeEvent } from "react";

type Inputs = {
  temp: string;
  speed: string;
  pressure: string;
  distance: string;
};

export const Settings = () => {
  const [units, setUnits] = useState<Inputs>({
    temp: "_c",
    speed: "_kph",
    pressure: "_mb",
    distance: "_km",
  });
  console.log(units);

  useEffect(() => {}, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const obj: { [key: string]: any } = {};
    const key = e.target.name;
    const val = e.target.value;

    obj[key] = val;

    setUnits((prevState) => ({ ...prevState, ...obj }));
  };

  return (
    <section>
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
    </section>
  );
};
