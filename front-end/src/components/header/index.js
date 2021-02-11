import React from 'react';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';

const Header = ({ userId }) => {
  // const currentUser = `/user/profile/${userId}`;
  // console.log(userId);

  return (
    <header>
      <div className={styles["mini-navbar-wrap"]}>
        <div className={styles["logo-wrap"]}>
          <p className={styles.logo}><span className={styles.logo}>Sofia Property Rent</span></p>
        </div>
        <div className={styles["mini-navbar"]}>
          <ul>
            <li>
              <Link to={`/user/profile/${userId}`}>PROFILE</Link>
            </li>
            <li>
              <Link to="/user/logout">LOGOUT</Link>
            </li>
            <li>
              <Link to="/user/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/user/register">REGISTER</Link>
            </li>
          </ul>
        </div>
      </div>
      <nav className={styles["nav-header"]}>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/item">OFFERS</Link>
          </li>
          <li>
            <Link to="/item/create">CREATE OFFER</Link>
          </li>
        </ul>
      </nav>
      {/* <div className={styles["mini-navbar"]}>
          <Link to={href}>PROFILE</Link>
          <Link to={href}>LOGOUT</Link>
          <Link to={href}>LOGIN</Link>
          <Link to={href}>REGISTER</Link>
        </div>
      </div>
      <nav className={styles["nav-header"]}>
        <Link to={href}>HOME</Link>
        <Link to={href}>OFFERS</Link>
        <Link to={href}>CREATE OFFER</Link>
      </nav> */}
    </header>
  );
};

export default Header;