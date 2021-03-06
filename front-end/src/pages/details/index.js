import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserContext from '../../Context';
import Layout from '../../components/layout';
import styles from './index.module.css';

const DetailsPage = () => {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const context = useContext(UserContext);
  const params = useParams();

  // useCallBack is needed (so that there's no warning thrown in the console), because:
  // 1) getDetails is declared out of useEffect and async is used
  // 2) we don't want to create a new fn everytime, but to use it since it's declared
  const getDetails = useCallback(async () => {
    const id = params.itemId;
    // console.log(id);
    const res = await fetch(`http://localhost:3001/api/items/details?_id=${id}`);
    // console.log(res);
    const item = await res.json();
    // console.log(item);
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
      <div className={styles["item-content"]}>
        {/* item-title */}
        <div className={styles["item-title"]}>
          <div className={styles["item-name-wrapper"]}>
            <div className={styles.columns}>

              <div className={styles["first-col"]}>
                <div className={styles["item-name"]}>
                  <h2>{title}</h2>
                </div>
                <div className={styles["item-image"]}>
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

          </div>
        </div>

      </div>
      {/* auth "guard" */}
      { context.loggedIn ? null : <Redirect to="/user/login" />}
    </Layout>
  );
};

export default DetailsPage;