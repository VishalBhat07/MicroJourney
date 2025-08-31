// HeroSection.jsx
import React from "react";
import styles from "./HeroSection.module.css";
import { Hand } from "lucide-react";

const HeroSection = () => (
  <section className={styles.hero}>
    <h1 className={styles.title}>
      MicroJourney
      <span className={styles.wave} role="img" aria-label="wave">
        <Hand />
      </span>
    </h1>
    <p className={styles.subtitle}>
      AI-Generated Walking Tours, Tailored For You
    </p>
    {/* <div className={styles.heroImage} aria-hidden="true" /> */}
  </section>
);

export default HeroSection;
