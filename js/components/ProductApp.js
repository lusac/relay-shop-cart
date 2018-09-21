import ProductList from './ProductList';

import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

class ProductApp extends React.Component {
  render() {
    return (
      <div>
        <section className="productapp">
          <header className="header">
            <h1>Produtos</h1>
          </header>
          <ProductList viewer={this.props.viewer} />
        </section>
      </div>
    );
  }
}

export default createFragmentContainer(ProductApp, {
  viewer: graphql`
    fragment ProductApp_viewer on User {
      id
      totalCount
      ...ProductList_viewer
    }
  `,
});
