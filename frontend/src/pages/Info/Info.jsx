import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Info.module.css";
import StreetView from "../VirtualTour/StreetView";
import { toast } from "react-toastify";

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const InfoPage = () => {
  const { city, location } = useParams();
  console.log(city, location);
  const navigate = useNavigate();

  const [placeInfo, setPlaceInfo] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch place info from backend
  useEffect(() => {
    async function fetchPlace() {
      try {
        setLoading(true);
        const res = await axios.post(backendUrl + "/api/tour/info", {
          city,
          location,
        });
        setPlaceInfo(res.data);

        // Fetch photos from Unsplash by searching for place name or keywords
        const unsplashRes = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query: res.data.name || location,
              per_page: 6,
              orientation: "landscape",
            },
            headers: { Authorization: `Client-ID ${UNSPLASH_API_KEY}` },
          }
        );
        setPhotos(unsplashRes.data.results || []);
      } catch (err) {
        setError("Failed to load place information");
      } finally {
        setLoading(false);
      }
    }
    fetchPlace();
  }, [city, location]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!placeInfo) return null;

  const center = placeInfo.virtualTourCoords || { lat: 0, lng: 0 };

  return (
    <div className={styles.dashboard}>
      {/* Place name and location */}
      <section className={styles.section}>
        <h1>{placeInfo.name}</h1>
        <p>{placeInfo.address}</p>
      </section>

      {/* Brief description */}
      <section className={styles.section}>
        <h2>Description</h2>
        <p>{placeInfo.description}</p>
      </section>

      {/* Virtual tour via Google Maps Street View iframe */}
      <section className={styles.section}>
        <h2>Virtual Tour</h2>
        <div style={{ maxWidth: "auto", margin: "0 auto", padding: 16 }}>
          <StreetView
            apiKey={GOOGLE_MAPS_API_KEY}
            lat={center.lat}
            lng={center.lang}
            povHeading={120}
            povPitch={10}
          />
        </div>
      </section>

      {/* Photos from Unsplash */}
      <section className={styles.section}>
        <h2>Gallery</h2>
        <div className={styles.photosGrid}>
          {photos.map((photo) => (
            <img
              key={photo.id}
              className={styles.photo}
              src={photo.urls.small}
              alt={photo.alt_description || "Place photo"}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <button
          className={styles.button}
          onClick={
            () => toast.success("Added to favorites!") /* Implement logic */
          }
        >
          Add to Favorites
        </button>
        <button
          className={styles.button}
          onClick={
            () =>
              toast.info("Rating functionality coming soon!") /* Implement */
          }
          style={{ marginLeft: "1rem" }}
        >
          Rate
        </button>
      </section>
    </div>
  );
};

export default InfoPage;
