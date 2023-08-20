import Head from "next/head";
import { Rubik } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaListUl, FaMap } from "react-icons/fa";
import { MdOutlineSettingsApplications } from "react-icons/md";

const rubik = Rubik({ weight: ["600"], subsets: ["latin"] });

interface IProps {
  children: ReactNode;
}

export const SharedLayout: FC<IProps> = ({ children }) => {
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
                  className="bg-inherit text-[rgb(var(--second-text-color))] outline-none"
                  type="text"
                  name="search"
                  placeholder="Search for cities"
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
                className="flex flex-col items-center gap-2 text-center text-[rgb(var(--second-text-color))] hover:text-black focus:text-black active:text-black"
                href={"/"}
              >
                <TiWeatherPartlySunny size={30} />
                Weather
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col  items-center gap-2 text-center text-[rgb(var(--second-text-color))] hover:text-black focus:text-black active:text-black"
                href={"/cities"}
              >
                <FaListUl size={30} />
                Cities
              </Link>
            </li>
            <li>
              <Link
                className="flex flex-col items-center gap-2 text-center text-[rgb(var(--second-text-color))] hover:text-black focus:text-black active:text-black"
                href={"/map"}
              >
                <FaMap size={30} />
                Map
              </Link>
            </li>
            <li>
              {" "}
              <Link
                className="flex flex-col items-center gap-2 text-center text-[rgb(var(--second-text-color))] hover:text-black focus:text-black active:text-black"
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