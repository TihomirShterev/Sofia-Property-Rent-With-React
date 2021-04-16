import React, { Component } from 'react';
import Layout from '../../../common/layout';
import styles from './index.module.css';
import {
  Link, Redirect
} from 'react-router-dom';
import UserContext from '../../../../Context';
import userService from '../../../../services/userService';

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
    newState[type] = event.target.value;

    this.setState(newState);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      email,
      password,
      rePassword
    } = this.state;

    if (0 < email.length && /^[a-zA-Z0-9.-]{6,}@\w+.(com|bg)$/.test(email) === false) {
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

    let hasNoError = /^[a-zA-Z0-9.-]{6,}@\w+.(com|bg)$/.test(email) && password.length >= 6 && rePassword && rePassword === password

    if (hasNoError) {
      await userService.authenticate(
        '/register',
        { email, password, rePassword },
        (user) => {
          this.context.logIn(user);
          this.props.history.push('/');
        },
        (err) => console.log('Error', err)
      );
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