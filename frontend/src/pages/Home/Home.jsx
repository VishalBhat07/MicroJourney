import React, { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import SearchForm from "../../components/SearchForm/SearchForm";
import PopularCities from "../../components/PopularCities/PopularCities";
import InterestTags from "../../components/InterestTags/InterestTags";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import HowItWorksSection from "../../components/HowItWorks/HowItWorksSection";
import TestimonialsSection from "../../components/TestimonialsSection/TestimonialsSection";
import { toast } from "react-toastify";

const Home = () => {
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const navigate = useNavigate();

  const handleGenerateTour = () => {
    if (!city.trim()) {
      toast.info("Please enter a city");
      return;
    }
    if (!interests.trim()) {
      toast.info("Please enter at least one interest");
      return;
    }
    navigate(
      `/tour?city=${encodeURIComponent(
        city.trim()
      )}&interests=${encodeURIComponent(interests.trim())}`
    );
  };

  return (
    <div className={styles.container}>
      <HeroSection />

      <main className={styles.mainContent}>
        <SearchForm
          city={city}
          interests={interests}
          setCity={setCity}
          setInterests={setInterests}
          onGenerate={handleGenerateTour}
        />

        <PopularCities onSelectCity={setCity} />

        <InterestTags interests={interests} setInterests={setInterests} />

        <FeaturesSection />

        <HowItWorksSection />

        <TestimonialsSection />
      </main>
    </div>
  );
};

export default Home;
