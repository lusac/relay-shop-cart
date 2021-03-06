import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay'

import Product from './Product'


export class ProductList extends React.Component {
  _renderProducts() {
    return this.props.products.map(product => (
      <Product key={product.id} product={product} viewer={this.props.viewer} />
    ))
  }

  render() {
    return (
      <section className="main">
        <ul className="product-list">{this._renderProducts()}</ul>
      </section>
    )
  }
}

export default createFragmentContainer(ProductList, {
  viewer: graphql`
    fragment ProductList_viewer on User {
      id
      ...Product_viewer
    }
  `
})
