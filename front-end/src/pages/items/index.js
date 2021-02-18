import React, { Component } from 'react';
import Item from '../../components/item';
import Layout from '../../components/layout';
// import UserContext from '../../Context';
import styles from './index.module.css';

class ItemsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  // static contextType = UserContext;

  getItems = async () => {
    const promise = await fetch('http://localhost:3001/api/items');
    const items = await promise.json();

    this.setState({
      items
    });
  }

  renderItems() {
    const { items } = this.state;

    return items.map(item => {
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

    return (
      <Layout>
        <div className={styles["item-list"]}>
          {this.renderItems()}
        </div>
      </Layout>
    );
  };
}

export default ItemsPage;