type Location = {
  latitude: number;
  longitude: number;
};

export const getLocation = async (): Promise<Location> => {
  return new Promise<Location>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
};
