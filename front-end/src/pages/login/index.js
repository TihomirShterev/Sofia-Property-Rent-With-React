import React, { Component } from 'react';
import Layout from '../../components/layout';
import styles from './index.module.css';
import {
  Link, Redirect
} from 'react-router-dom';
import UserContext from '../../Context';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      invalidInputError: false,
      emptyFieldsError: false
    };
  }

  static contextType = UserContext;

  handleChange = (event, type) => {
    const newState = {};
    // console.log(event);
    newState[type] = event.target.value;

    this.setState(newState);
  }

  handleSubmit = async (event) => {
    event.preventDefault(); // so page doesn't reload

    const {
      email,
      password
    } = this.state;

    // console.log(this.context);

    if (!email || !password) {
      this.setState({
        emptyFieldsError: true
      });
    } else {
      this.setState({
        emptyFieldsError: false
      });
    }

    try {
      const promise = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const authToken = promise.headers.get('Authorization'); // #rest-api/index.js
      document.cookie = `auth-cookie=${authToken}`; // we save the token in the cookie (#rest-api/app-config)
      // and when we log in, we'll already have the cookie in DevTools/Application 
      const response = await promise.json();
      // console.log(response);

      if (response.email && authToken) {
        // console.log('Yay!');
        this.setState({
          invalidInputError: false
        });
        this.context.logIn({
          email: response.email,
          id: response._id
        });
        this.props.history.push('/'); // if all good, we redirect to homePage
      } else {
        this.setState({
          invalidInputError: true
        });
        // console.log('Error');
      }

    } catch (err) {
      console.log('Error', err);
    }
  };

  render() {
    const {
      email,
      password,
      invalidInputError,
      emptyFieldsError
    } = this.state;

    const emptyFieldsErrorMessage = emptyFieldsError ? 'Please fill all fields above' : null;
    const invalidInputErrorMessage = invalidInputError && !emptyFieldsError ? 'Invalid email or password' : null;

    return (
      <Layout>
        <form className={styles.login} onSubmit={this.handleSubmit}>
          <fieldset>
            <h2>Login Form</h2>

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
              {invalidInputErrorMessage}
            </p>
            <p className={styles.error}>
              {emptyFieldsErrorMessage}
            </p>
            <button type="submit">Login</button>

            <p className={styles["text-center"]}>
              No account yet?
              <Link to="/user/register">Register</Link>
            </p>

          </fieldset>
        </form>
        { this.context.loggedIn ? <Redirect to="/" /> : null}
      </Layout>
    );
  };
}

export default LoginPage;