import React, { Component } from 'react';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';
import UserContext from '../../Context';

class Header extends Component {

  static contextType = UserContext;

  logOut = () => {
    this.context.logOut();
    // window.location.href = 'http://localhost:3000/'; // another way to redirect
  }

  render() {
    const {
      loggedIn,
      user
    } = this.context;
    // console.log(this.context);

    return (
      <header>
        <div className={styles["mini-navbar-wrap"]}>
          <div className={styles["logo-wrap"]}>
            <p className={styles.logo}><span className={styles.logo}>Sofia Property Rent</span></p>
          </div>
          <div className={styles["mini-navbar"]}>
            <ul>
              {loggedIn
                ? <>
                  <li>
                    {/* if there's user, we place id*/}
                    <Link to={`/user/profile/${user && user.id}`}>PROFILE</Link>
                  </li>
                  <li>
                    <Link to="/user/logout" onClick={this.logOut}>LOGOUT</Link>
                  </li>
                </>
                : <>
                  <li>
                    <Link to="/user/login">LOGIN</Link>
                  </li>
                  <li>
                    <Link to="/user/register">REGISTER</Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
        <nav className={styles["nav-header"]}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            {loggedIn
              ? <>
                <li>
                  <Link to="/item">OFFERS</Link>
                </li>
                <li>
                  <Link to="/item/create">CREATE OFFER</Link>
                </li>
              </>
              : <></>
            }

          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;