import React from 'react';
import Header from './Header';
import ProductList from './ProductList';
import {createFragmentContainer, graphql} from 'react-relay';

export class ProductApp extends React.Component {
  render() {
    return (
      <section className="productapp">
        <Header viewer={this.props.viewer} />
        <ProductList viewer={this.props.viewer} products={this.props.products} />
      </section>
    )
  }
}

export default createFragmentContainer(ProductApp, {
  viewer: graphql`
    fragment ProductApp_viewer on User {
      id
      ...Header_viewer
      ...ProductList_viewer
    }
  `,
  products: graphql`
    fragment ProductApp_products on Product @relay(plural: true) {
      id,
      ...Product_product
    }
  `
})
