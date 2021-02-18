import React, { Component } from 'react';
import UserContext from './Context';

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return cookieValue ? cookieValue[2] : null;
}

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
    // delete cookie
    document.cookie = 'auth-cookie= ; expires = Thu, 01 Jan 1970 00:00:00 HMT';

    this.setState({
      loggedIn: false,
      user: null
    });
  }

  componentDidMount() {
    const token = getCookie('auth-cookie');
    // console.log(token);

    if (!token) {
      this.logOut();
      return;
    }

    // to keep the cookie after page reload
    fetch('http://localhost:3001/api/users/verify', {
      method: 'POST',
      body: JSON.stringify({
        token
      }),
      headers: {
        'Content-Type': 'application/json'
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
      // this is done so when we're logged
      // it doesn't show first guest nav and later jumps to loginPage
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