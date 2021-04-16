import React from 'react';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';

// const Item = (props) => {
const Item = ({ _id, title, imageURL }) => {
  return (
    <div className={styles["item-container"]}>
      <Link to={`/item/details/${_id}`} className={styles["item-link"]}>
        <h2>{title}</h2>
        <div className={styles["image-container"]}>
          <img src={imageURL} alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Item;