import React, { useState, useEffect } from "react";
import axios from "axios";
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

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Helper: fetch image URL for location name from Unsplash
async function fetchImage(query) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 1, orientation: "landscape" },
      headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
    });
    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small;
    }
  } catch {
    // Fail silently and return null
  }
  return null;
}

// Helper for center computation
function computeCenter(coords) {
  if (!coords.length) return [48.8566, 2.3522]; // fallback Paris
  const lat = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
  const lng = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
  return [lat, lng];
}

// Parse query params (e.g. /tour?city=Paris&interests=coffee)
function useQueryParams() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    city: params.get("city") || "",
    interests: params.get("interests") || "",
  };
}

const Tour = () => {
  const navigate = useNavigate();
  const { city: qCity, interests: qInterests } = useQueryParams();

  // Inputs state with optional extended fields
  const [inputs, setInputs] = useState({
    city: qCity || "",
    interests: qInterests || "",
    people: "",
    date: "",
    description: "",
    stopsLimit: "",
  });

  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const [images, setImages] = useState({});

  const fetchTour = async (params) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${backendUrl}/api/tour/generate-tour`,
        params
      );
      const fetchedStops = res.data.data || res.data;
      setStops(fetchedStops);

      // Fetch Unsplash images for each stop (in parallel)
      const imgs = {};
      await Promise.all(
        fetchedStops.map(async (stop) => {
          const img = await fetchImage(stop.name || params.city);
          if (img) imgs[stop.name] = img;
        })
      );
      setImages(imgs);
    } catch (err) {
      setError(err.message || "Failed to generate tour");
    } finally {
      setLoading(false);
    }
  };

  // On mount, fetch tour with query if present
  useEffect(() => {
    if (qCity) {
      fetchTour({ city: qCity, interests: qInterests });
    } else {
      setFormVisible(true);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission - trigger tour fetch
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.city.trim()) {
      setError("City is required");
      return;
    }
    const { city, interests, people, date, description, stopsLimit } = inputs;
    fetchTour({ city, interests, people, date, description, stopsLimit });
    setFormVisible(false);
    setInputs({
      city: qCity || "",
      interests: qInterests || "",
      people: "",
      date: "",
      description: "",
      stopsLimit: "",
    });
  };

  const routeCoords = stops.map((s) => [s.coordinates.lat, s.coordinates.lng]);
  const mapCenter = computeCenter(routeCoords);

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.heading}>
          {inputs.city || "Your"} Walking Tour: {inputs.interests || "general"}
        </h2>
        <button
          onClick={() => setFormVisible((v) => !v)}
          className={styles.newRequest}
          aria-expanded={formVisible}
          aria-controls="tour-input-form"
        >
          {formVisible ? "Hide Form" : "New Request"}
        </button>
      </div>

      {formVisible && (
        <form
          id="tour-input-form"
          className={styles.tourForm}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={styles.formRow}>
            <label>
              City*
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={inputs.city}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </label>
            <label>
              Interests
              <input
                type="text"
                name="interests"
                placeholder="E.g., museums, coffee"
                value={inputs.interests}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
            <label>
              Number of People
              <input
                type="number"
                name="people"
                min="1"
                placeholder="e.g. 1, 2, 3"
                value={inputs.people}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
            <label>
              Date
              <input
                type="date"
                name="date"
                value={inputs.date}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
            <label>
              Description
              <input
                type="text"
                name="description"
                placeholder="Additional info"
                value={inputs.description}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
            <label>
              Number of Stops
              <input
                type="number"
                name="stopsLimit"
                min="1"
                placeholder="e.g. 5"
                value={inputs.stopsLimit}
                onChange={handleChange}
                className={styles.input}
              />
            </label>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Generating..." : "Generate Tour"}
            </button>
          </div>
        </form>
      )}

      {stops.length > 0 && (
        <div className={styles.info}>
          <span className={styles.city}>{inputs.city}</span>
          <span className={styles.interests}>{inputs.interests}</span>
          <span className={styles.stopsCount}>{stops.length} stops</span>
        </div>
      )}

      {loading && (
        <div className={styles.loadingSection}>
          <div className={styles.loader} />
          <p>Generating your tour...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorSection}>
          <h3>Error: {error}</h3>
          <button onClick={() => navigate("/")}>Go Back Home</button>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && stops.length > 0 && (
        <>
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
                {/* Image */}
                {images[stop.name] && (
                  <div
                    className={styles.cardImage}
                    style={{ backgroundImage: `url(${images[stop.name]})` }}
                    aria-label={`${stop.name} image`}
                  />
                )}
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
                  <button
                    className={styles.virtualTourButton}
                    onClick={() => navigate("/virtual")}
                  >
                    Virtual Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <button className={styles.button} onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Tour;
