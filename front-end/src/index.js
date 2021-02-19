import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import Navigation from './navigation';
import LazyNavigation from './navigation';

ReactDOM.render(
  <React.StrictMode>
    <App>
      {/* <Navigation /> */}
      <LazyNavigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
