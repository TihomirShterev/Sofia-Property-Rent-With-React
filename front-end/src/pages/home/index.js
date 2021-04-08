import React from 'react';
import styles from './index.module.css';
import Layout from '../../components/layout';

const HomePage = () => {
  return (
    <Layout>
      <div className={styles.welcome}>
        <h3>"Home, sweet home!"</h3>
        <p>Hello and welcome to the best property renting platform of Sofia, the capital of Bulgaria!</p>
      </div>
      <div className={styles["item-image"]}>
        <img src="https://res.cloudinary.com/tyscloud/image/upload/v1617901160/sofiaimoti-2000-1024x692_ufdxfp.jpg" alt=""></img>
      </div>
    </Layout>
  );
};

export default HomePage;