import React from 'react';
import {createFragmentContainer, graphql} from 'react-relay';

class Product extends React.Component {
  render() {
    return (
      <li>
        <div className="view">
          <label>
            {this.props.product.name}
          </label>
        </div>
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
