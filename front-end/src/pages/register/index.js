import React, { Component } from 'react';
import Layout from '../../components/layout';
import styles from './index.module.css';
import {
  Link, Redirect
} from 'react-router-dom';
import UserContext from '../../Context';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rePassword: "",
      emailError: false,
      passwordError: false,
      rePasswordError: false,
      emptyFieldsError: false
    };
  }

  static contextType = UserContext;

  handleChange = (event, type) => {
    const newState = {};
    // console.log(event);
    newState[type] = event.target.value;

    this.setState(newState);
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // so page doesn't reload

    const {
      email,
      password,
      rePassword
    } = this.state;

    // console.log(this.context);

    // custom validations
    if (0 < email.length && !email.match(/^[a-zA-Z0-9.-]{6,}@\w+.(com|bg)$/)) {
      this.setState({
        emailError: true
      });
    } else {
      this.setState({
        emailError: false
      });
    }

    if (0 < password.length && password.length < 6) {
      this.setState({
        passwordError: true
      });
    } else {
      this.setState({
        passwordError: false
      });
    }

    if (0 < rePassword.length && rePassword !== password) {
      this.setState({
        rePasswordError: true
      });
    } else {
      this.setState({
        rePasswordError: false
      });
    }

    if (!email || !password || !rePassword) {
      this.setState({
        emptyFieldsError: true
      });
    } else {
      this.setState({
        emptyFieldsError: false
      });
    }

    // request
    try {
      const promise = await fetch('https://estatesbg.herokuapp.com/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          rePassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const authToken = promise.headers.get('Authorization'); // #rest-api/index.js
      document.cookie = `auth-cookie=${authToken}`; // we save the token in the cookie (#rest-api/app-config),
      // and when we log in, we'll already have the cookie in DevTools/Application 
      const response = await promise.json();
      // console.log(response);

      // passwords match needed, so it doesn't log in w/o rePassword
      if (response.email && authToken && rePassword === password) {
        // console.log('Yay!');
        this.context.logIn({
          email: response.email,
          id: response._id
        });
        this.props.history.push('/'); // if all good, we redirect to homePage
      } else {
        console.log('Error');
      }

    } catch (err) {
      console.log('Error', err);
    }
  };

  render() {
    const {
      email,
      password,
      rePassword,
      emailError,
      passwordError,
      rePasswordError,
      emptyFieldsError
    } = this.state;

    const emailErrorMessage = emailError ? 'Please enter a valid email' : null;
    const passwordErrorMessage = passwordError ? 'Please enter a valid password consisting at least 6 characters' : null;
    const rePasswordErrorMessage = rePasswordError ? 'Please enter a matching password' : null;
    const emptyFieldsErrorMessage = emptyFieldsError ? 'Please fill all fields above' : null;

    return (
      <Layout>
        <form className={styles.register} onSubmit={this.handleSubmit}>
          <fieldset>
            <h2>Registration Form</h2>

            <p className={styles["field field-icon"]}>
              <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => this.handleChange(e, 'email')}
                placeholder="pesho.peshev@gmail.com"
              />
            </p>
            <p className={styles.error}>
              {emailErrorMessage}
            </p>

            <p className={styles["field field-icon"]}>
              <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => this.handleChange(e, 'password')}
                placeholder="******"
              />
            </p>
            <p className={styles.error}>
              {passwordErrorMessage}
            </p>

            <p className={styles["field field-icon"]}>
              <label htmlFor="rePassword"><span><i className="fas fa-lock"></i></span></label>
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={rePassword}
                onChange={(e) => this.handleChange(e, 'rePassword')}
                placeholder="******"
              />
            </p>
            <p className={styles.error}>
              {rePasswordErrorMessage}
            </p>

            <p className={styles.error}>
              {emptyFieldsErrorMessage}
            </p>
            <button type="submit">Create Account</button>

            <p className={styles["text-center"]}>
              Already registered?
              <Link to="/user/login">Login</Link>
            </p>

          </fieldset>
        </form>
        { this.context.loggedIn ? <Redirect to="/" /> : null}
      </Layout>
    );
  };
}

export default RegisterPage;