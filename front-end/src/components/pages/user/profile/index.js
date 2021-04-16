import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../../../Context';
import userService from '../../../../services/userService';
import Layout from '../../../common/layout';
import styles from './index.module.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      myItems: null
    };
  }

  static contextType = UserContext;

  componentDidMount() {
    this.getProfile(this.props.match.params.userId);
  }

  getProfile = async (id) => {
    const res = await userService.getProfileInfo(id);

    if (!res.ok) {
      this.props.history.push('/error');
    }

    const user = await res.json();

    this.setState({
      email: user.email,
      myItems: user.myItems
    });
  }

  render() {
    const {
      email,
      myItems
    } = this.state;

    if (this.context.loggedIn === null) {
      return (
        <Layout>
          <div>Loading....</div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className={styles.profile}>
          <h3>User Info</h3>
          <div className={styles.flex}>
            <p>Email: </p>
            <span>{email}</span>
          </div>
          <div className={styles.flex}>
            <p>My Offers:</p>
            <span>{myItems}</span>
          </div>
        </div>
        { this.context.loggedIn ? null : <Redirect to="/user/login" />}
      </Layout>
    );
  }
}

export default ProfilePage;