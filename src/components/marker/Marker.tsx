import { FaMapMarkerAlt } from "react-icons/fa";
import { FC } from "react";

interface IMarkerProps {
  lat: number;
  lng: number;
  reference: any;
}

export const Marker: FC<IMarkerProps> = ({ reference }) => {
  return (
    <div ref={reference}>
      <FaMapMarkerAlt size={30} color={"red"} />
    </div>
  );
};
