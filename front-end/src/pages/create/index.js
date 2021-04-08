import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from '../../Context';
import Layout from '../../components/layout';
import styles from './index.module.css';
import getCookie from '../../utils/cookie';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [imageURLError, setImageURLError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const context = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: validations
    if (title.length < 5) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!imageURL) {
      setImageURLError(true);
    } else {
      setImageURLError(false);
    }

    if (description.length < 10) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (title.length >= 5 && imageURL && description.length >= 10) {
      // const promise = await fetch('https://estatesbg.herokuapp.com/api/items/create', {
      await fetch('https://estatesbg.herokuapp.com/api/items/create', {
        method: 'POST',
        body: JSON.stringify({
          title,
          imageURL,
          description
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getCookie('auth-cookie')
        }
      });

      // const data = await promise.json();
      // console.log(data);

      history.push('/item');
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sofiapropertyrent');

    const res = await fetch("https://api.cloudinary.com/v1_1/tyscloud/image/upload",
      {
        method: 'POST',
        body: data
      });

    const file = await res.json();
    // console.log(file);
    setImageURL(file.secure_url);
  };

  const titleErrorMessage = titleError ? 'Please enter a valid title consisting at least 5 characters' : null;
  const imageURLErrorMessage = imageURLError ? 'Please upload a valid image' : null;
  const descriptionErrorMessage = descriptionError ? 'Please enter a valid description consisting at least 10 characters' : null;

  return (
    <Layout>

      <div className={styles["new-item-border"]}>

        <div className={styles["header-background"]}>
          <p>CREATE OFFER</p>
        </div>

        <form className={styles["create-item-form"]} onSubmit={handleSubmit}>
          <div className={styles["new-item-image"]}>
            {imageURL ? (<img className={styles["uploaded-image"]} src={imageURL} alt="" />) : null}
            <input
              type="file"
              name="imageURL"
              onChange={uploadImage}
            />
            <p className={styles.error}>
              {imageURLErrorMessage}
            </p>
          </div>
          <div className={styles["create-item-info"]}>
            <div className={styles["new-item-title"]}>
              <label htmlFor="title">Title: <span className={styles.red}></span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                id="title" />
              <p className={styles.error}>
                {titleErrorMessage}
              </p>
            </div>
            <div className={styles["new-item-content"]}>
              <label htmlFor="description">Description: <span className={styles.red}></span></label>
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                id="description"
                rows="30"
                className="height"
              ></textarea>
              <p className={styles.error}>
                {descriptionErrorMessage}
              </p>
            </div>
            <div className={styles["new-item-buttons"]}>
              {/* <button type="button" className={styles.cancel} href="/">Back</button> */}
              <button className={styles["create-new-item-btn"]} type="submit">Create</button>
            </div>
          </div>
        </form>

      </div>
      {/* auth "guard" */}
      { context.loggedIn ? null : <Redirect to="/user/login" />}
    </Layout>
  );
};

export default CreatePage;