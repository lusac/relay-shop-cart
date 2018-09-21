import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions
} from 'graphql-relay';

import {
  Product,
  User,
  getProduct,
  getProducts,
  getUser,
  getViewer
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  globalId => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Product') {
      return getProduct(id);
    } else if (type === 'User') {
      return getUser(id);
    }
    return null;
  },
  obj => {
    if (obj instanceof Product) {
      return GraphQLProduct;
    } else if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  },
);

const GraphQLProduct = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: globalIdField('Product'),
    name: {
      type: GraphQLString,
      resolve: obj => obj.name,
    },
    amount: {
      type: GraphQLString,
      resolve: obj => obj.amount,
    },
    complete: {
      type: GraphQLBoolean,
      resolve: obj => obj.complete,
    },
  },
  interfaces: [nodeInterface],
});

const {
  connectionType: ProductsConnection,
  edgeType: GraphQLProductEdge,
} = connectionDefinitions({
  name: 'Product',
  nodeType: GraphQLProduct,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    products: {
      type: ProductsConnection,
      args: {
        status: {
          type: GraphQLString,
          defaultValue: 'any',
        },
        ...connectionArgs,
      },
      resolve: (obj, {status, ...args}) =>
        connectionFromArray(getProducts(status), args),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getProducts().length,
    },
    completedCount: {
      type: GraphQLInt,
      resolve: () => getProducts('completed').length,
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
    node: nodeField,
  },
});

export const schema = new GraphQLSchema({
  query: Query
});
