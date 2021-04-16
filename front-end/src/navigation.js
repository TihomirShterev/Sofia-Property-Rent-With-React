import React, { Component, Suspense } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import UserContext from './Context';

const LazyHomePage = React.lazy(() => import('./components/pages/home'));
const LazyRegisterPage = React.lazy(() => import('./components/pages/user/register'));
const LazyLoginPage = React.lazy(() => import('./components/pages/user/login'));
const LazyProfilePage = React.lazy(() => import('./components/pages/user/profile'));
const LazyItemsPage = React.lazy(() => import('./components/pages/item/items'));
const LazyCreatePage = React.lazy(() => import('./components/pages/item/create'));
const LazyDetailsPage = React.lazy(() => import('./components/pages/item/details'));
const LazyNotFoundPage = React.lazy(() => import('./components/pages/not-found'));

class LazyNavigation extends Component {

  static contextType = UserContext;

  render() {
    const {
      loggedIn
    } = this.context;

    return (
      <BrowserRouter>
        <Suspense fallback={<h1>Loading.....</h1>}>
          <Switch>
            <Route path="/" exact component={LazyHomePage} />
            <Route path="/user/register" component={LazyRegisterPage} />
            <Route path="/user/login" component={LazyLoginPage} />
            <Route path="/user/logout" render={() => loggedIn ? null : <Redirect to="/" />} />
            <Route path="/user/profile/:userId" component={LazyProfilePage} />
            <Route path="/item" exact component={LazyItemsPage} />
            <Route path="/item/create">
              {
                loggedIn
                  ? (<LazyCreatePage />)
                  : (<Redirect to="/user/login" />)
              }
            </Route>
            <Route path="/item/details/:itemId">
              {
                loggedIn
                  ? (<LazyDetailsPage />)
                  : (<Redirect to="/user/login" />)
              }
            </Route>
            <Route component={LazyNotFoundPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }

}

export default LazyNavigation;