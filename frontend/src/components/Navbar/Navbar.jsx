import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logo}>
          MicroJourney
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            exact="true"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tour"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Tours
          </NavLink>
        </li>
        <li>
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
