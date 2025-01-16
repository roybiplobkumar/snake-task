export const setUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        localStorage.setItem("userLatitude", latitude);
        localStorage.setItem("userLongitude", longitude);

        // console.log("Latitude:", latitude);
        // console.log("Longitude:", longitude);
      },
      (error) => {
        console.error("No location found:", error.message);
      }
    );
  } else {
    console.error("Your browser does not support Geolocation");
  }
};



