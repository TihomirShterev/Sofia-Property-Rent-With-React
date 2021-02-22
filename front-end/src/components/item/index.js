import React from 'react';
// import React, { useContext } from 'react';
import styles from './index.module.css';
import {
  Link
} from 'react-router-dom';
// import UserContext from '../../Context';

// const Item = (props) => {
const Item = ({ _id, title, imageURL }) => {
  // console.log(props);
  // const context = useContext(UserContext);
  // console.log(context);

  return (
    <div className={styles["item-name-wrapper"]}>
      <div className={styles["item-name"]}>
        <Link to={`/item/details/${_id}`} className={styles.normal}>
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