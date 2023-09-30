import { Cities } from "@/components/screen/cities/Cities";
import { Current } from "@/ts/types/current-day";
import { Forecast } from "@/ts/types/forecast-day";
import { GetStaticProps } from "next";
import { FC } from "react";

// interface IProps {
//   visitedCities: { current: Current; forecast: Forecast; location: Location }[];
// }

// export const getStaticProps: GetStaticProps<IProps> = () => {
//   const visitedCities = JSON.parse(
//     localStorage.getItem("city-weather") as string,
//   );

//   return {
//     props: { visitedCities },
//   };
// };

const CitiesPage: FC = () => {
  return <Cities />;
};
export default CitiesPage;
