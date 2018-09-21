import React from 'react';
import Button from '@material-ui/core/Button';
import {createFragmentContainer, graphql} from 'react-relay';

class Product extends React.Component {
  render() {
    return (
      <li className="product">
        <img
          className="product__image"
          src={'/imgs/' + this.props.product.image}></img>

        <strong className="product__name">
          {this.props.product.name} </strong>

        <span className="product__price">
          R$ {this.props.product.price.toFixed(2)} </span>

        <Button variant="contained" color="primary">
          Comprar </Button>
      </li>
    );
  }
}

export default createFragmentContainer(Product, {
  product: graphql`
    fragment Product_product on Product {
      complete
      id
      name
      image
      price
      amount
    }
  `,
  viewer: graphql`
    fragment Product_viewer on User {
      id
      totalCount
      completedCount
    }
  `,
});
