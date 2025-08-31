import React, { useState } from "react";
import {
  Map,
  Cpu,
  Smartphone,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: <Map size={48} strokeWidth={1.5} />,
    title: "Customized Tours",
    description:
      "Personalized walking tours based on your interests and city preferences.",
    highlight: "AI-Crafted",
    color: "blue",
  },
  {
    icon: <Cpu size={48} strokeWidth={1.5} />,
    title: "AI Powered",
    description:
      "Leverages advanced AI to create rich, unique itineraries tailored for you.",
    highlight: "Smart Technology",
    color: "purple",
  },
  {
    icon: <Smartphone size={48} strokeWidth={1.5} />,
    title: "Mobile Friendly",
    description: "Access your tours on any device, anytime, anywhere you go.",
    highlight: "Always Available",
    color: "green",
  },
];

const FeaturesSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <section className={styles.section} aria-label="Features">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            Key Features
          </div>
          <h2 className={styles.title}>Why MicroJourney?</h2>
          <p className={styles.subtitle}>
            Discover what makes our AI-powered travel companion the perfect
            guide for your adventures
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`${styles.featureCard} ${
                styles[
                  `card${
                    feature.color.charAt(0).toUpperCase() +
                    feature.color.slice(1)
                  }`
                ]
              } ${hoveredFeature === index ? styles.cardHovered : ""}`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              tabIndex={0}
              aria-label={feature.title}
            >
              {/* Background glow */}
              <div className={styles.cardGlow}></div>

              {/* Highlight badge */}
              {/* <div className={styles.highlightBadge}>{feature.highlight}</div> */}

              {/* Icon container */}
              <div className={styles.iconContainer}>
                <div className={styles.iconBackground}>{feature.icon}</div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className={styles.cardArrow}>
                <ArrowRight size={16} />
              </div>

              {/* Floating particles */}
              <div className={styles.particles}>
                <div className={styles.particle1}></div>
                <div className={styles.particle2}></div>
                <div className={styles.particle3}></div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>
            Ready to explore with AI as your guide?
          </p>
          <button className={styles.ctaButton}>
            <span>Start Your Journey</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
