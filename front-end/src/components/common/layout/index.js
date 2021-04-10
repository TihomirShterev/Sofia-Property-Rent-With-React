import React from 'react';
import styles from './index.module.css';
import Header from "../../common/header";
import Footer from '../../common/footer';

const Layout = (props) => {
  return (
    <div className={styles.app}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
