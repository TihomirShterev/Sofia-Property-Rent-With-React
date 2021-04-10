import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.css';
import Layout from '../../components/layout';
import Item from '../../components/item';

const HomePage = () => {
  const [items, setItems] = useState([]);

  const getItems = useCallback(async () => {
    const promise = await fetch('https://estatesbg.herokuapp.com/api/items');
    const items = await promise.json();

    let itemsCopy = items.slice(items.length - 3, items.length);
    let newest = itemsCopy.reverse();
    setItems(newest);
  }, []);

  const renderItems = () => {
    return items.map(item => {
      return (
        <Item key={item._id} {...item} />
      );
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Layout>
      <div className={styles.welcome}>
        <h3>"Home, sweet home!"</h3>
        <p>Hello and welcome to the best property renting platform of Sofia, the capital of Bulgaria!</p>
      </div>
      <div className={styles["newest-items"]}>
        <span className={styles.title}>Newest offers:</span>
        <div className={styles["newest-items-list"]}>
          {renderItems()}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;