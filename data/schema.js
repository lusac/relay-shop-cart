import {
  GraphQLID,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  mutationWithClientMutationId
} from 'graphql-relay'

import {
  Product,
  User,
  getProduct,
  getProducts,
  getCart,
  getUser,
  getViewer,
  addProductToCart,
  decreaseProductToCart,
  removeProductToCart
} from './database'

const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => {
    const {type, id} = fromGlobalId(globalId)
    if (type === 'Product') {
      return getProduct(id)
    } else if (type === 'User') {
      return getUser(id)
    }
    return null
  },
  obj => {
    if (obj instanceof Product) {
      return GraphQLProduct
    } else if (obj instanceof User) {
      return GraphQLUser
    }
    return null
  },
)

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: globalIdField('Product'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    price: {
      type: GraphQLFloat,
      resolve: obj => obj.price,
    },
    image: {
      type: GraphQLString,
      resolve: obj => obj.image,
    },
    amount: {
      type: GraphQLFloat,
      resolve: obj => obj.amount,
    }
  },
  interfaces: [nodeInterface],
})

const {
  connectionType: ProductsConnection
} = connectionDefinitions({
  nodeType: GraphQLProduct
})

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    cart: {
      type: ProductsConnection,
      args: connectionArgs,
      resolve: (obj, args) =>
        connectionFromArray(getCart(), args)
    }
  },
  interfaces: [nodeInterface]
})

const GraphQLRemoveProductToCartMutation = mutationWithClientMutationId({
  name: 'RemoveProductToCart',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  outputFields: {
    product: {
      type: GraphQLProduct,
      resolve: ({localProductId}) => getProduct(localProductId)
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => {
        return getViewer()},
    }
  },
  mutateAndGetPayload: ({id}) => {
    const localProductId = fromGlobalId(id).id
    removeProductToCart(localProductId)
    return {localProductId}
  }
})

const GraphQLDecreaseProductToCartMutation = mutationWithClientMutationId({
  name: 'DecreaseProductToCart',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  outputFields: {
    product: {
      type: GraphQLProduct,
      resolve: ({localProductId}) => getProduct(localProductId)
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => {
        return getViewer()},
    }
  },
  mutateAndGetPayload: ({id}) => {
    const localProductId = fromGlobalId(id).id
    decreaseProductToCart(localProductId)
    return {localProductId}
  }
})

const GraphQLAddProductToCartMutation = mutationWithClientMutationId({
  name: 'AddProductToCart',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)}
  },
  outputFields: {
    product: {
      type: GraphQLProduct,
      resolve: ({localProductId}) => getProduct(localProductId)
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => {
        return getViewer()},
    }
  },
  mutateAndGetPayload: ({id}) => {
    const localProductId = fromGlobalId(id).id
    addProductToCart(localProductId)
    return {localProductId}
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    },
    products: {
      type: new GraphQLList(GraphQLProduct),
      resolve: () => getProducts()
    },
    node: nodeField
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProductToCart: GraphQLAddProductToCartMutation,
    decreaseProductToCart: GraphQLDecreaseProductToCartMutation,
    removeProductToCart: GraphQLRemoveProductToCartMutation
  })
})

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
