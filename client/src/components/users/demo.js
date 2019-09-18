import React, { useEffect } from "react";
import { usePosition } from "use-position";

export const Weather = () => {
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude && !error) {
      // Fetch weather data here.
    }
  }, []);

  return <div>Render weather data here</div>;
};
