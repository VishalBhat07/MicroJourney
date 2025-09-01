import React, { useEffect, useRef } from "react";

const StreetView = ({ apiKey, lat, lng, povHeading = 100, povPitch = 0 }) => {
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      // Load the Google Maps JS API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeStreetView();
      };
      document.head.appendChild(script);
    } else {
      initializeStreetView();
    }

    function initializeStreetView() {
      if (!streetViewRef.current) return;

      panoramaRef.current = new window.google.maps.StreetViewPanorama(
        streetViewRef.current,
        {
          position: { lat, lng },
          pov: { heading: povHeading, pitch: povPitch },
          visible: true,
        }
      );
    }
    // Cleanup on unmount
    return () => {
      if (panoramaRef.current) {
        panoramaRef.current.setVisible(false);
      }
    };
  }, [apiKey, lat, lng, povHeading, povPitch]);

  return (
    <div
      ref={streetViewRef}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    />
  );
};

export default StreetView;
