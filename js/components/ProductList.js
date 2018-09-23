import React from 'react'
import {createFragmentContainer, graphql} from 'react-relay'

import Product from './Product'


class ProductList extends React.Component {
  renderProducts() {
<<<<<<< HEAD
    return this.props.viewer.products.edges.map(edge => (
      <Product key={edge.node.id} product={edge.node} viewer={this.props.viewer} />
=======
    return this.props.products.map(product => (
      <Product key={product.id} product={product} viewer={this.props.viewer} />
>>>>>>> Refatorando listagem de produtos e cart
    ))
  }

  render() {
    return (
      <section className="main">
        <ul className="product-list">{this.renderProducts()}</ul>
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
<<<<<<< HEAD
  `,
=======
  `
>>>>>>> Refatorando listagem de produtos e cart
})
