import Head from "next/head";
import { Rubik } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, ReactNode, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaListUl, FaMap } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { useRouter } from "next/router";

const pathArr = ["/", "cities", "map", "settings"];

const rubik = Rubik({ weight: ["600"], subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

export const SharedLayout: FC<IProps> = ({ children }) => {
  const [value, setValue] = useState("");
  const { pathname, push } = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (!input.value) {
      push("/");
    } else {
      push(`/search/${input.value}`);
    }

    setValue(input.value);
  };

  return (
    <>
      <Head>
        <title>Cyclone</title>
      </Head>
      <div className="container mx-auto flex flex-row-reverse px-8 py-8">
        <div className={`container px-8 ${rubik.className}`}>
          <header className="w-[65%]">
            <div className="rounded-2xl bg-zinc-100 px-4 py-4">
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
