import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import itemService from '../../../../services/itemService';
import Layout from '../../../common/layout';
import styles from './index.module.css';

const DetailsPage = () => {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const params = useParams();

  const getDetails = useCallback(async () => {
    const id = params.itemId;
    const res = await itemService.getOne(id);
    const item = await res.json();
    setTitle(item.title);
    setImageURL(item.imageURL);
    setDescription(item.description);
    setAuthorEmail(item.userId.email)
  }, [params.itemId]);

  useEffect(() => {
    getDetails();
  });

  return (
    <Layout>
      <div className={styles.columns}>

        <div className={styles["first-col"]}>
          <div className={styles["item-name"]}>
            <h2>{title}</h2>
          </div>
          <div className={styles["item-image-container"]}>
            <img src={imageURL} alt="" />
          </div>
        </div>

        <div className={styles["second-col"]}>
          <div className={styles.description}>
            <p>Description:</p>
            <span>{description}</span>
          </div>
          {/* <div className={styles.peopleWhoIncremented}>
              <p>Likes:</p> 
              <span>{peopleWhoIncremented.length}</span>
            </div> */}
          <div className={styles["nick-name"]}>
            <p>Contact author:</p>
            <span>{authorEmail}</span>
          </div>
        </div>

      </div>

      {/* <button className={styles.edit}>Edit</button>
          <button className={styles.delete}>Delete</button>
          <button className={styles.increment}>Like</button> */}
    </Layout>
  );
};

export default DetailsPage;