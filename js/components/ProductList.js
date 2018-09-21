import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

import Product from './Product';


class ProductList extends React.Component {
  renderProducts() {
    return this.props.viewer.products.edges.map(edge => (
      <Product key={edge.node.id} product={edge.node} viewer={this.props.viewer} />
    ));
  }

  render() {
    return (
      <section className="main">
        <ul className="product-list">{this.renderProducts()}</ul>
      </section>
    );
  }
}

export default createFragmentContainer(ProductList, {
  viewer: graphql`
    fragment ProductList_viewer on User {
      products(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "ProductList_products") {
        edges {
          node {
            id
            complete
            ...Product_product
          }
        }
      }
      id
      totalCount
      completedCount
      ...Product_viewer
    }
  `,
});
