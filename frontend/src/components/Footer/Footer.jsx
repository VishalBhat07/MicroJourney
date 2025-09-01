import React from "react";
import { Twitter, Linkedin, Instagram, Github, Mail } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          &copy; 2025 MicroJourney — AI-Generated Walking Tours. All rights
          reserved.
        </p>
        <div className={styles.socials}>
          <a
            href={import.meta.env.VITE_GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.socialLink}
          >
            <Github size={24} />
          </a>
          <a
            href="mailto:vishalbhat21092005@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mail"
            className={styles.socialLink}
          >
            <Mail size={24} />
          </a>
          <a
            href="https://linkedin.com/in/vishalbhat07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={styles.socialLink}
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://instagram.com/vishalbhat07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={styles.socialLink}
          >
            <Instagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
