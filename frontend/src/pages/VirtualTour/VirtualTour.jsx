import React from "react";
import StreetView from "./StreetView";

const YOUR_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const ExamplePage = () => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1>Google Maps Street View Demo</h1>
      <StreetView
        apiKey={YOUR_API_KEY}
        lat={48.8583701} // Example: Eiffel Tower latitude
        lng={2.2922926} // Example: Eiffel Tower longitude
        povHeading={120} // Direction camera faces
        povPitch={10} // Up/down angle
      />
    </div>
  );
};

export default ExamplePage;
