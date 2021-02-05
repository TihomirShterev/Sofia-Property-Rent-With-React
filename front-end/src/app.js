import React from 'react';
import styles from './app.module.css';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      {/* <Home /> */}
      <Footer />
    </div>
  );
}

export default App;
