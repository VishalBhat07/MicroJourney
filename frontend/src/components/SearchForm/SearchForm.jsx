import React from "react";
import styles from "./SearchForm.module.css";

const SearchForm = ({ city, interests, setCity, setInterests, onGenerate }) => (
  <section className={styles.searchForm}>
    <label className={styles.label}>
      Choose a City
      <input
        type="text"
        className={styles.input}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="e.g., Paris"
        required
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
        required
      />
    </label>

    <button className={styles.generateButton} onClick={onGenerate}>
      Generate My Tour
    </button>
  </section>
);

export default SearchForm;
