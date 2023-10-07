import { Marker } from "@/components/marker/Marker";
import GoogleMapReact from "google-map-react";

import { FC, useRef } from "react";

interface IProps {
  handleMapClick: ({
    lat,
    lng,
    event,
  }: {
    lat: number;
    lng: number;
    event: any;
  }) => void;

  markers: { id: string; lat: number; lng: number; city: string }[];
}

export const GoogleMap: FC<IProps> = ({ handleMapClick, markers }) => {
  const ref = useRef();

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyCDxegmJ-mKsi8QllTO5owrclwEaPxnEr8",
      }}
      defaultCenter={{
        lat: 50.451439,
        lng: 30.524606,
      }}
      defaultZoom={11}
      onClick={handleMapClick}
    >
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            lat={marker.lat}
            lng={marker.lng}
            reference={ref}
          />
        );
      })}
    </GoogleMapReact>
  );
};
