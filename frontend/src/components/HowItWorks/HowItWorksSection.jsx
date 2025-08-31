import React, { useState } from "react";
import {
  MapPin,
  Heart,
  Play,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    step: "01",
    title: "Pick Your City",
    description:
      "Tell us the city you'd like to explore and unlock hidden gems waiting to be discovered.",
    icon: <MapPin size={28} />,
    delay: "0ms",
  },
  {
    step: "02",
    title: "Add Your Interests",
    description:
      "From quirky art galleries to cozy coffee shops, tell us what excites you most.",
    icon: <Heart size={28} />,
    delay: "100ms",
  },
  {
    step: "03",
    title: "Get Your Personalized Itinerary",
    description:
      "Receive an AI-crafted walking tour tailored just for you, delivered instantly.",
    icon: <Play size={28} />,
    delay: "200ms",
  },
  {
    step: "04",
    title: "Explore & Enjoy",
    description:
      "Follow your custom tour, discover amazing places, capture memories, and have an adventure!",
    icon: <Camera size={28} />,
    delay: "300ms",
  },
];

const HowItWorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <section className={styles.section} aria-label="How It Works">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <Sparkles size={16} />
            Simple Process
          </div>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            From curiosity to adventure in four simple steps. Let AI be your
            personal travel curator.
          </p>
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsGrid}>
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`${styles.stepCard} ${
                hoveredStep === index ? styles.stepCardHovered : ""
              }`}
              style={{ animationDelay: step.delay }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              tabIndex={0}
              aria-label={`Step ${step.step}: ${step.title}`}
            >
              {/* Connection line for desktop */}
              {index % 2 === 0 && index < steps.length - 1 && (
                <div className={styles.connectionLine}>
                  <ArrowRight size={16} className={styles.connectionArrow} />
                </div>
              )}

              {/* Floating particles */}
              <div className={styles.floatingParticles}>
                <div className={`${styles.particle} ${styles.particle1}`}></div>
                <div className={`${styles.particle} ${styles.particle2}`}></div>
                <div className={`${styles.particle} ${styles.particle3}`}></div>
              </div>

              {/* Step header */}
              <div className={styles.stepHeader}>
                <div className={styles.stepNumber}>{step.step}</div>
                <div className={styles.stepIcon}>{step.icon}</div>
              </div>

              {/* Content */}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Hover arrow */}
              <div className={styles.stepArrow}>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={styles.ctaSection}>
          <button className={styles.ctaButton}>
            <span>Start Your Adventure</span>
            <Sparkles size={20} className={styles.sparkleIcon} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
