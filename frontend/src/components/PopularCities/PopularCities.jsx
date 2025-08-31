import React, { useState } from "react";
import { MapPin, Plane, Globe, Sparkles } from "lucide-react";
import styles from "./PopularCities.module.css";

const cities = [
  {
    name: "Paris",
    country: "France",
    icon: "🇫🇷",
    description: "City of Light",
  },
  {
    name: "New York",
    country: "USA",
    icon: "🇺🇸",
    description: "The Big Apple",
  },
  {
    name: "Tokyo",
    country: "Japan",
    icon: "🇯🇵",
    description: "Modern Metropolis",
  },
  {
    name: "Barcelona",
    country: "Spain",
    icon: "🇪🇸",
    description: "Gaudí's Masterpiece",
  },
  {
    name: "Berlin",
    country: "Germany",
    icon: "🇩🇪",
    description: "Cultural Hub",
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    icon: "🇳🇱",
    description: "Canal City",
  },
];

const PopularCities = ({ onSelectCity }) => {
  const [hoveredCity, setHoveredCity] = useState(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Globe size={16} />
            Top Destinations
          </div>
          <h2 className={styles.title}>Popular Cities</h2>
          <p className={styles.subtitle}>
            Choose from our most loved destinations or explore somewhere new
          </p>
        </div>

        {/* Cities Grid */}
        <div className={styles.citiesGrid}>
          {cities.map((city, index) => (
            <button
              key={city.name}
              type="button"
              className={`${styles.cityCard} ${
                hoveredCity === index ? styles.cityCardHovered : ""
              }`}
              onClick={() => onSelectCity(city.name)}
              onMouseEnter={() => setHoveredCity(index)}
              onMouseLeave={() => setHoveredCity(null)}
              aria-label={`Select ${city.name}, ${city.country}`}
            >
              <div className={styles.cityFlag}>{city.icon}</div>

              <div className={styles.cityContent}>
                <div className={styles.cityHeader}>
                  <h3 className={styles.cityName}>{city.name}</h3>
                  <span className={styles.cityCountry}>{city.country}</span>
                </div>
                <p className={styles.cityDescription}>{city.description}</p>
              </div>

              <div className={styles.cityAction}>
                <MapPin size={18} />
              </div>

              <div className={styles.cityGlow}></div>

              {/* Floating sparkles on hover */}
              <div className={styles.sparkles}>
                <Sparkles size={12} className={styles.sparkle1} />
                <Sparkles size={10} className={styles.sparkle2} />
                <Sparkles size={8} className={styles.sparkle3} />
              </div>
            </button>
          ))}
        </div>

        {/* Custom City Option */}
        <div className={styles.customCitySection}>
          <div className={styles.divider}>
            <span>or</span>
          </div>
          <button
            type="button"
            className={styles.customCityButton}
            onClick={() => onSelectCity("")}
          >
            <Plane size={18} />
            <span>Choose a Different City</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
