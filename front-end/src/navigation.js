import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import ItemsPage from './pages/items';
import CreatePage from './pages/create';
import NotFoundPage from './pages/not-found';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/user/register" component={RegisterPage} />
        <Route path="/user/login" component={LoginPage} />
        <Route path="/user/profile/:userId" component={ProfilePage} />
        <Route path="/item" exact component={ItemsPage} />
        <Route path="/item/create" component={CreatePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Navigation;