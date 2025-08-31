import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const navigate = useNavigate();

  const handleGenerateTour = () => {
    if (!city.trim()) return alert("Please enter a city");
    // You can pass data via query params or state
    navigate(
      `/tour?city=${encodeURIComponent(city)}&interests=${encodeURIComponent(
        interests
      )}`
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>MicroJourney</h1>
        <p className={styles.tagline}>
          AI-Generated Walking Tours, Tailored For You
        </p>
      </header>

      <main className={styles.formContainer}>
        <label className={styles.label}>
          Choose a City
          <input
            type="text"
            className={styles.input}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Paris"
          />
        </label>

        <label className={styles.label}>
          Your Interests
          <input
            type="text"
            className={styles.input}
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g., quirky art, coffee"
          />
        </label>

        <button className={styles.generateButton} onClick={handleGenerateTour}>
          Generate My Tour
        </button>
      </main>
    </div>
  );
};

export default Home;
