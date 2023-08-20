type Location = {
  latitude?: number;
  longitude?: number;
};

export const getLocation = async () => {
  if ("geolocation" in navigator) {
    const obj: Location = {};
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      obj.latitude = latitude;
      obj.longitude = longitude;
      return obj as Location;
    });
  } else {
    console.log("Геолокація не підтримується браузером");
  }
};
