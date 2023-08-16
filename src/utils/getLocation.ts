type Location = {
  latitude: number;
  longitude: number;
};

export const getLocation = async (obj: Location) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      obj.latitude = latitude;
      obj.longitude = longitude;
    });
  } else {
    console.log("Геолокація не підтримується браузером");
  }
};
