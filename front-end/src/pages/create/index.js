import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../Context';
import Layout from '../../components/layout';
import styles from './index.module.css';

class CreatePage extends Component {

  static contextType = UserContext;

  render() {
    return (
      <Layout>

        <div className={styles["new-item-border"]}>

          <div className={styles["header-background"]}>
            <span>CREATE OFFER</span>
          </div>

          <form>
            <div className={styles["new-item-title"]}>
              <label htmlFor="title">Title: <span className={styles.red}></span></label>
              <input type="text" name="title" id="title" />
              {/* <p className={styles.error}>
              Title is required.
          </p>
            <p className={styles.error}>
              Title must be at least 5 characters long.
          </p> */}
            </div>
            <div className={styles["new-item-image"]}>
              <label htmlFor="imageURL">Image URL: <span className={styles.red}></span></label>
              <input type="text" name="imageURL" id="imageURL" placeholder="http://..." />
            </div>
            <div className={styles["new-item-content"]}>
              <label htmlFor="description">Description: <span className={styles.red}></span></label>
              <textarea type="text" name="description" id="description"
                rows="8" className="height"></textarea>
              {/* <p className={styles.error}>
              The field with your description is required.
          </p>
            <p className={styles.error}>
              Description must be at least 10 characters long.
          </p> */}
            </div>
            <div className={styles["new-item-buttons"]}>
              <button type="button" className={styles.cancel} href="/">Back</button>
              <button className={styles.public}>Create</button>
            </div>
          </form>

        </div>
        {/* auth "guard" */}
        { this.context.loggedIn ? null : <Redirect to="/user/login" />}
      </Layout>
    );
  }
}

export default CreatePage;