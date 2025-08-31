import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Tour.module.css";

// Helper for center computation
function computeCenter(coords) {
  if (!coords.length) return [48.8566, 2.3522]; // Fallback: Paris center
  const lat = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
  const lng = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
  return [lat, lng];
}

// Parse query params (e.g. /tour?city=Paris&interests=coffee)
function useQueryParams() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    city: params.get("city") || "Paris",
    interests: params.get("interests") || "coffee",
  };
}

const Tour = () => {
  const navigate = useNavigate();
  const { city, interests } = useQueryParams();

  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tour from backend on mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8080/generate-tour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, interests }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to generate tour");
        return res.json();
      })
      .then((data) => {
        // Expecting data as array of stops [{name, description, coordinates, estimatedMinutesAtStop}, ...]
        setStops(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city, interests]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Generating your tour...</h2>
        <div className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h2 className={styles.heading}>Error: {error}</h2>
        <button className={styles.button} onClick={() => navigate("/")}>
          Go Back Home
        </button>
        <button
          className={styles.button}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const routeCoords = stops.map((s) => [s.coordinates.lat, s.coordinates.lng]);
  const mapCenter = computeCenter(routeCoords);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {city} Walking Tour: {interests}
      </h2>
      <div className={styles.info}>
        <span className={styles.city}>{city}</span>
        <span className={styles.interests}>{interests}</span>
        <span className={styles.stopsCount}>{stops.length} stops</span>
      </div>
      <div className={styles.mapSection}>
        <MapContainer center={mapCenter} zoom={14} className={styles.map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Polyline positions={routeCoords} color="#1e88e5" />
          {stops.map((stop, idx) => (
            <Marker
              key={idx}
              position={[stop.coordinates.lat, stop.coordinates.lng]}
            >
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                {stop.description}
                <br />
                Est. time: {stop.estimatedMinutesAtStop} min
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className={styles.cards}>
        {stops.map((stop, idx) => (
          <div className={styles.card} key={idx}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIndex}>{idx + 1}</div>
              <h3 className={styles.cardTitle}>{stop.name}</h3>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>{stop.description}</p>
              <p className={styles.cardEta}>
                <span role="img" aria-label="clock">
                  🕒
                </span>
                {stop.estimatedMinutesAtStop} min stop
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Tour;
