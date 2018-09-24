import {commitMutation, graphql} from 'react-relay'

const mutation = graphql`
  mutation AddProductToCartMutation($input: AddProductToCartInput!) {
    addProductToCart(input: $input) {
      product {
        amount
      }
      viewer {
        id
        cart(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "Header_cart") {
          edges {
            node {
              id
              ...Product_product
            }
          }
        }
      }
    }
  }
`

function commit(environment, product, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {id: product.id}
    }
  })
}

export default {commit}
