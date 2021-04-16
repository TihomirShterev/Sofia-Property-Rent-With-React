import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import LazyNavigation from './navigation';

ReactDOM.render(
  <React.StrictMode>
    <App>
      <LazyNavigation />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);
