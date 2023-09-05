import Head from "next/head";
import { Rubik } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, ReactNode } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaListUl, FaMap } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { WeatherService } from "@/services/weather-api";

const pathArr = ["/", "cities", "map", "settings"];

const rubik = Rubik({ weight: ["600"], subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

export const SharedLayout: FC<IProps> = ({ children }) => {
  const [value, setValue] = useState("");
  const [searchCityData, setSearchCityData] = useState<any[]>([]);
  const { pathname } = useRouter();

  console.log(searchCityData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    setValue(input.value);
  };

  useEffect(() => {
    if (!value) {
      return;
    }
    (async () => {
      const data = await WeatherService.searchCityWeather(value);
      setSearchCityData(data);
    })();
  }, [value]);

  return (
    <>
      <Head>
        <title>Cyclone</title>
      </Head>
      <div className="container mx-auto flex flex-row-reverse px-8 py-8">
        <div className={`container px-8 ${rubik.className}`}>
          <header className="w-[65%]">
            <div className="rounded-2xl bg-zinc-100 px-6 py-6">
              <label>
                <input
                  onChange={handleChange}
                  className="bg-inherit text-[rgb(var(--second-text-color))] outline-none"
                  type="text"
                  name="search"
                  placeholder="Search for cities"
                  value={value}
                />
              </label>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <aside className="float-left flex flex-col rounded-2xl bg-zinc-100 px-6 py-6">
          <Image
            className="mb-32"
            src="/images/logotype.png"
            alt="logotype"
            width={50}
            height={50}
            priority
          />
          <ul className="flex flex-col gap-7">
            <li>
              <Link
                className={`flex flex-col items-center gap-2 text-center  hover:text-black focus:text-black ${
                  pathname === "/"
                    ? "text-black"
                    : "text-[rgb(var(--second-text-color))]"
                }`}
                href={"/"}
              >
                <TiWeatherPartlySunny size={30} />
                Weather
              </Link>
            </li>
            <li>
              <Link
                className={`flex flex-col items-center gap-2 text-center  hover:text-black focus:text-black ${
                  pathname === "/cities"
                    ? "text-black"
                    : "text-[rgb(var(--second-text-color))]"
                }`}
                href={"/cities"}
              >
                <FaListUl size={30} />
                Cities
              </Link>
            </li>
            <li>
              <Link
                className={`flex flex-col items-center gap-2 text-center hover:text-black focus:text-black ${
                  pathname === "/map"
                    ? "text-black"
                    : "text-[rgb(var(--second-text-color))]"
                }`}
                href={"/map"}
              >
                <FaMap size={30} />
                Map
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className={`flex flex-col items-center gap-2 text-center  hover:text-black focus:text-black ${
                  pathname === "/settings"
                    ? "text-black"
                    : "text-[rgb(var(--second-text-color))]"
                }`}
                href={"/settings"}
              >
                <MdOutlineSettingsApplications size={30} />
                Settings
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};
