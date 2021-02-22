import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../Context';
import Layout from '../../components/layout';
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
    // console.log(this.props.match.params.userId);
    this.getProfile(this.props.match.params.userId);
  }

  getProfile = async (id) => {
    const res = await fetch(`http://localhost:3001/api/users/profile?_id=${id}`);
    // console.log(res);

    if (!res.ok) {
      this.props.history.push('/error');
    }

    const user = await res.json();
    // console.log(user);

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

    if (!email) {
      return (
        <Layout>
          <div>Loading....</div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className={styles.profile}>
          {/* <img src="/assets/profile.png" alt="default user" /> */}
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
        {/* auth "guard" */}
        { this.context.loggedIn ? null : <Redirect to="/user/login" />}
      </Layout>
    );
  }
}

export default ProfilePage;