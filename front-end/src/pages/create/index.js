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

    // const promise = await fetch('http://localhost:3001/api/items/create', {
    await fetch('http://localhost:3001/api/items/create', {
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

    if (title.length >= 5 && imageURL && description.length >= 10) {
      history.push('/item');
    }
  };

  const openWidget = () => {
    const widget = window.cloudinary.createUploadWidget({
      cloudName: "tyscloud",
      uploadPreset: "sofiapropertyrent"
    }, (error, result) => {
      console.log('Error: ', error);
      console.log('Result: ', result);

      if (result.event === 'success') {
        setImageURL(result.info.url);
      }
    });

    widget.open();
  };

  const titleErrorMessage = titleError ? 'Please enter a valid title consisting at least 5 characters' : null;
  const imageURLErrorMessage = imageURLError ? 'Please enter a valid image URL' : null;
  const descriptionErrorMessage = descriptionError ? 'Please enter a valid description consisting at least 10 characters' : null;

  return (
    <Layout>

      <div className={styles["new-item-border"]}>

        <div className={styles["header-background"]}>
          <span>CREATE OFFER</span>
        </div>

        <form onSubmit={handleSubmit}>
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
          <div className={styles["new-item-image"]}>
            {imageURL ? (<img src={imageURL} />) : null}
            <button onClick={openWidget}>Upload Image</button>
            {/* <label htmlFor="imageURL">Image URL: <span className={styles.red}></span></label>
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              name="imageURL"
              id="imageURL"
              placeholder="http://..."
            />
            <p className={styles.error}>
              {imageURLErrorMessage}
            </p> */}
          </div>
          <div className={styles["new-item-content"]}>
            <label htmlFor="description">Description: <span className={styles.red}></span></label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              rows="8"
              className="height"
            ></textarea>
            <p className={styles.error}>
              {descriptionErrorMessage}
            </p>
          </div>
          <div className={styles["new-item-buttons"]}>
            {/* <button type="button" className={styles.cancel} href="/">Back</button> */}
            <button className={styles.public} type="submit">Create</button>
          </div>
        </form>

      </div>
      {/* auth "guard" */}
      { context.loggedIn ? null : <Redirect to="/user/login" />}
    </Layout>
  );
};

export default CreatePage;