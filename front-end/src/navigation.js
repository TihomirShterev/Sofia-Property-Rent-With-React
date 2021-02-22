import React, { Component, Suspense } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import UserContext from './Context';
// import HomePage from './pages/home';
// import RegisterPage from './pages/register';
// import LoginPage from './pages/login';
// import ProfilePage from './pages/profile';
// import ItemsPage from './pages/items';
// import CreatePage from './pages/create';
// import NotFoundPage from './pages/not-found';

// const Navigation = () => {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/user/register" component={RegisterPage} />
//         <Route path="/user/login" component={LoginPage} />
//         <Route path="/user/profile/:userId" component={ProfilePage} />
//         <Route path="/item" exact component={ItemsPage} />
//         <Route path="/item/create" component={CreatePage} />
//         <Route component={NotFoundPage} />
//       </Switch>
//     </BrowserRouter>
//   );
// };

// export default Navigation;

const LazyHomePage = React.lazy(() => import('./pages/home'));
const LazyRegisterPage = React.lazy(() => import('./pages/register'));
const LazyLoginPage = React.lazy(() => import('./pages/login'));
const LazyProfilePage = React.lazy(() => import('./pages/profile'));
const LazyItemsPage = React.lazy(() => import('./pages/items'));
const LazyCreatePage = React.lazy(() => import('./pages/create'));
const LazyDetailsPage = React.lazy(() => import('./pages/details'));
const LazyNotFoundPage = React.lazy(() => import('./pages/not-found'));

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
            <Route path="/item/create" component={LazyCreatePage} />
            <Route path="/item/details/:itemId" component={LazyDetailsPage} />
            <Route component={LazyNotFoundPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }

}

export default LazyNavigation;