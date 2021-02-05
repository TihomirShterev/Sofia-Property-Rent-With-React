import React from 'react';
import styles from './index.module.css';

const Header = ({ href }) => {
  return (
    <header>
      <div className={styles["mini-navbar-wrap"]}>
        <div className={styles["logo-wrap"]}>
          <p className={styles.logo}><span className={styles.logo}>Sofia Property Rent</span></p>
        </div>
        <div className={styles["mini-navbar"]}>
          <ul>
            <li>
              <a href={href}>PROFILE</a>
            </li>
            <li>
              <a href={href}>LOGOUT</a>
            </li>
            <li>
              <a href={href}>LOGIN</a>
            </li>
            <li>
              <a href={href}>REGISTER</a>
            </li>
          </ul>
        </div>
      </div>
      <nav className={styles["nav-header"]}>
        <ul>
          <li>
            <a href={href}>HOME</a>
          </li>
          <li>
            <a href={href}>OFFERS</a>
          </li>
          <li>
            <a href={href}>CREATE OFFER</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;