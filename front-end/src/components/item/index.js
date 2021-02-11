import React from 'react';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';

const Item = ({ title, imageURL }) => {
  return (
    <div className={styles["item-name-wrapper"]}>
      <div className={styles["item-name"]}>
        <Link to="#" className={styles.normal}>
          <h2>{title}</h2>
        </Link>
        <div className={styles["item-image"]}>
          <img src={imageURL} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Item;