import React, { useState } from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import styles from "./TestimonialsSection.module.css";

const testimonials = [
  {
    name: "Alice W.",
    location: "Paris Explorer",
    quote:
      "MicroJourney helped me discover hidden gems in Paris I would have never found!",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Carlos M.",
    location: "Barcelona Wanderer",
    quote:
      "Highly customized and easy to use — my walking tour was perfect for my interests.",
    rating: 5,
    avatar: "C",
  },
  {
    name: "Sara L.",
    location: "Tokyo Adventure",
    quote:
      "I love how the AI tailors the tours exactly how I want them. A must-have app!",
    rating: 5,
    avatar: "S",
  },
  {
    name: "Tom K.",
    location: "Rome Discovery",
    quote:
      "The tours felt personal and vibrant, like having a local friend showing me around.",
    rating: 5,
    avatar: "T",
  },
  {
    name: "Isabella R.",
    location: "London Explorer",
    quote:
      "Best walking tour app I've tried! Great for solo travelers or groups.",
    rating: 5,
    avatar: "I",
  },
  {
    name: "Jamal G.",
    location: "NYC Adventure",
    quote:
      "Beautiful design and intuitive experience. Can't wait to use it again!",
    rating: 5,
    avatar: "J",
  },
];

const rowCount = 3;

const TestimonialsSection = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className={styles.section} aria-label="User Testimonials">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Star size={16} />
            Loved by Travelers
          </div>
          <h2 className={styles.title}>What Our Users Say</h2>
          <p className={styles.subtitle}>
            Join thousands of happy explorers who've discovered their cities in
            new ways
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className={styles.marqueeContainer}>
          {[...Array(rowCount)].map((_, rowIndex) => {
            const reverse = rowIndex % 2 === 1;
            return (
              <div
                key={rowIndex}
                className={`${styles.marqueeRow} ${
                  reverse ? styles.reverse : ""
                }`}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  animationPlayState:
                    hoveredRow === rowIndex ? "paused" : "running",
                  animationDuration: `${20 + rowIndex * 5}s`,
                }}
              >
                {[...testimonials, ...testimonials].map(
                  ({ name, location, quote, rating, avatar }, i) => (
                    <div
                      key={`${rowIndex}-${i}`}
                      className={`${styles.testimonialCard} ${
                        hoveredCard === `${rowIndex}-${i}`
                          ? styles.cardHovered
                          : ""
                      }`}
                      onMouseEnter={() => setHoveredCard(`${rowIndex}-${i}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                      tabIndex={0}
                      aria-label={`Testimonial from ${name}`}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.avatar}>{avatar}</div>
                        <div className={styles.userInfo}>
                          <h4 className={styles.userName}>{name}</h4>
                          <span className={styles.userLocation}>
                            {location}
                          </span>
                        </div>
                        <div className={styles.rating}>
                          {[...Array(rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={styles.starIcon}
                            />
                          ))}
                        </div>
                      </div>

                      <div className={styles.quoteContainer}>
                        <Quote size={20} className={styles.quoteIcon} />
                        <blockquote className={styles.quote}>
                          {quote}
                        </blockquote>
                      </div>

                      <div className={styles.cardGlow}></div>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>

        {/* Gradient overlays */}
        <div className={styles.fadeLeft} aria-hidden="true" />
        <div className={styles.fadeRight} aria-hidden="true" />

        {/* Stats section */}
        <div className={styles.statsSection}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Happy Travelers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Cities Covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
