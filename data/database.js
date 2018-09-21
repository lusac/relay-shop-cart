export class Product {}
export class User {}

// Mock authenticated ID
const USER_ID = 'me';

// Mock user data
const viewer = new User();
viewer.id = USER_ID;
const usersById = {
  [USER_ID]: viewer,
};

// Mock Products data
const productsById = {};
const productsIdsByUser = {
  [USER_ID]: [],
};
let nextProductId = 0;
addProduct('Taste JavaScript', true);
addProduct('Buy a unicorn', false);

export function addProduct(name, amount) {
  const product = new Product();
  product.id = `${nextProductId++}`;
  product.name = name;
  product.amount = amount;
  productsById[product.id] = product;
  productsIdsByUser[USER_ID].push(product.id);
  return product.id;
}

export function getProduct(id) {
  return productsById[id];
}

export function getProducts(status = 'any') {
  const products = productsIdsByUser[USER_ID].map(id => productsById[id]);
  if (status === 'any') {
    return products;
  }
  return products.filter(product => product.complete === (status === 'completed'));
}

export function getUser(id) {
  return usersById[id];
}

export function getViewer() {
  return getUser(USER_ID);
}