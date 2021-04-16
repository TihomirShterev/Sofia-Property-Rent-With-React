import React, { Component } from 'react';
import UserContext from '../Context';
import getCookie from '../utils/cookie';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null,
      user: null
    };
  }

  logIn = (user) => {
    this.setState({
      loggedIn: true,
      user
    });
  }

  logOut = () => {
    document.cookie = 'auth-cookie= ; expires = Thu, 01 Jan 1970 00:00:00 HMT';

    this.setState({
      loggedIn: false,
      user: null
    });
  }

  componentDidMount() {
    const token = getCookie('auth-cookie');

    if (!token) {
      this.logOut();
      return;
    }

    fetch('http://localhost:3001/api/users/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(promise => {
        // console.log(promise);
        return promise.json();
      })
      .then(res => {
        // console.log(res);
        if (res.status) {
          this.logIn({
            email: res.user.email,
            id: res.user._id
          });
        } else {
          this.logOut();
        }
      });
  }

  render() {
    const {
      loggedIn,
      user
    } = this.state;

    if (loggedIn === null) {
      <div>Loading....</div>
    }

    return (
      <UserContext.Provider value={{
        loggedIn,
        user,
        logIn: this.logIn,
        logOut: this.logOut
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default App;