import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './navigation';
import LazyNavigation from './navigation';

ReactDOM.render(
  <React.StrictMode>
    {/* <Navigation /> */}
    <LazyNavigation />
  </React.StrictMode>,
  document.getElementById('root')
);
