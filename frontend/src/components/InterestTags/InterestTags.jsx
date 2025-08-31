import React, { useState } from "react";
import { Plus, X, Heart, Sparkles } from "lucide-react";
import styles from "./InterestTags.module.css";

const suggestions = [
  "quirky art",
  "coffee",
  "architecture",
  "history",
  "street food",
  "museums",
  "parks",
  "shopping",
  "nightlife",
  "local markets",
  "galleries",
  "hidden spots",
];

const InterestTags = ({ interests, setInterests }) => {
  const [hoveredTag, setHoveredTag] = useState(null);
  const interestList = interests
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  const toggleInterest = (interest) => {
    if (interestList.includes(interest)) {
      setInterests(interestList.filter((i) => i !== interest).join(", "));
    } else {
      setInterests([...interestList, interest].join(", "));
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Heart size={16} />
            Personalize Your Journey
          </div>
          <h3 className={styles.title}>Add Your Interests</h3>
          <p className={styles.subtitle}>
            Select what excites you most and we'll craft the perfect adventure
          </p>
        </div>

        {/* Selected Interests Counter */}
        {interestList.length > 0 && (
          <div className={styles.selectedCounter}>
            <Sparkles size={16} />
            <span>
              {interestList.length} interest
              {interestList.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        )}

        {/* Interest Tags */}
        <div className={styles.tagsGrid}>
          {suggestions.map((interest, index) => {
            const selected = interestList.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                className={`${styles.tag} ${
                  selected ? styles.tagSelected : ""
                } ${hoveredTag === index ? styles.tagHovered : ""}`}
                onClick={() => toggleInterest(interest)}
                onMouseEnter={() => setHoveredTag(index)}
                onMouseLeave={() => setHoveredTag(null)}
                aria-pressed={selected}
                aria-label={`${
                  selected ? "Remove" : "Add"
                } ${interest} interest`}
              >
                <span className={styles.tagIcon}>
                  {selected ? <X size={16} /> : <Plus size={16} />}
                </span>
                <span className={styles.tagText}>{interest}</span>
                <div className={styles.tagGlow}></div>
              </button>
            );
          })}
        </div>

        {/* Helper Text */}
        <div className={styles.helperText}>
          <p>
            Select multiple interests to create a more personalized experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default InterestTags;
