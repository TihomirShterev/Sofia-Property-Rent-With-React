import React, { Component } from 'react';
import Item from '../../components/item';
import Layout from '../../components/layout';
import ErrorBoundary from '../../ErrorBoundary';
import styles from './index.module.css';

class ItemsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  getItems = async () => {
    const promise = await fetch('https://estatesbg.herokuapp.com/api/items');
    const items = await promise.json();

    this.setState({
      items
    });
  }

  renderItems() {
    const { items } = this.state;

    return items
      .sort((a, b) => a.title.localeCompare(b.title))
      .map(item => {
        return (
          <Item key={item._id} {...item} />
        );
      });
  }

  componentDidMount() {
    this.getItems();
  }

  render() {
    // console.log(this.state.items);
    const { items } = this.state;

    return (
      <Layout>
        <ErrorBoundary>
          <div className={styles["item-list"]}>
            {items.length > 0
              ? this.renderItems()
              : <p>No Offers!</p>
            }
          </div>
        </ErrorBoundary>
      </Layout>
    );
  };
}

export default ItemsPage;