import React, { Component } from 'react';
import Layout from '../../components/layout';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rePassword: ""
    };
  }

  onChange = (event, type) => {
    const newState = {};
    // console.log(event);
    newState[type] = event.target.value;

    this.setState(newState);
  };



  render() {
    const {
      email,
      password,
      rePassword
    } = this.state;

    return (
      <Layout>
        <form className={styles.register}>
          <fieldset>
            <h2>Registration Form</h2>

            <p className={styles["field field-icon"]}>
              <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
              <input
                type="text"
                name="email"
                id="email" value={email}
                onChange={(e) => this.onChange(e, 'email')}
                placeholder="pesho.peshev@gmail.com"
              />
            </p>
            {/* <p className={styles.error}>
              Email is required!
            </p>
            <p className={styles.error}>
              Email is not valid!
            </p> */}

            <p className={styles["field field-icon"]}>
              <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
              <input
                type="password"
                name="password"
                id="password" value={password}
                onChange={(e) => this.onChange(e, 'password')}
                placeholder="******"
              />
            </p>
            {/* <p className={styles.error}>
              Password is required!
            </p>
            <p className={styles.error}>
              Password must be at least 5 characters!
            </p> */}

            <p className={styles["field field-icon"]}>
              <label htmlFor="rePassword"><span><i className="fas fa-lock"></i></span></label>
              <input
                type="password"
                name="rePassword"
                id="rePassword" value={rePassword}
                onChange={(e) => this.onChange(e, 'rePassword')}
                placeholder="******"
              />
            </p>
            {/* <p className={styles.error}>
              Password is required!
            </p>
            <p className={styles.error}>
              Repeat Password does not match password!
            </p> */}

            <button>Create Account</button>

            <p className={styles["text-center"]}>
              Already registered?
              <Link to="/user/login">Login</Link>
            </p>

          </fieldset>
        </form>
      </Layout>
    );
  };
}

export default RegisterPage;