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

  // // break the component on purpose to test error boundaries
  // console.log(test);

  return (
    <div className={styles["item-name-wrapper"]}>
      <div className={styles["item-name"]}>
        <Link to={`/item/details/${_id}`} className={styles.normal}>
          <h2>{title}</h2>
          <div className={styles["item-image-container"]}>
            <img src={imageURL} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Item;