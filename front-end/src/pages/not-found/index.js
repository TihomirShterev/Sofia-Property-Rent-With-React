import React from 'react';
import styles from './index.module.css';
import Layout from '../../components/layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={styles.mainbox}>
        <div className={styles.msg}>Error: 404 Page Not Found. <p>Let's call it bad luck and try another one :)</p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;