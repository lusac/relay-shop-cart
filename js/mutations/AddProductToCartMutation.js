import {commitMutation, graphql} from 'react-relay'

const mutation = graphql`
  mutation AddProductToCartMutation($input: AddProductToCartInput!) {
    addProductToCart(input: $input) {
      product {
        amount
      }
      viewer {
        id
      }
    }
  }
`

function getOptimisticResponse(product, user) {
  const viewerPayload = {id: user.id}
  return {
    addProductToCart: {
      product: {
        id: product.id
      },
      cart: {
        id: product.id
      },
      viewer: viewerPayload
    }
  }
}

function commit(environment, product, user) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {id: product.id}
    },
    optimisticResponse: getOptimisticResponse(product, user)
  })
}

export default {commit}
