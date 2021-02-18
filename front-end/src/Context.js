import React from 'react';

// pages' authorization
const UserContext = React.createContext({
  loggedIn: false,
  user: null,
  logIn: () => { },
  logOut: () => { }
});

export default UserContext;