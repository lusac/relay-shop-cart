import {
  addProduct,
  productsById,
  nextProductId,
  getProduct,
  getProducts,
  getCart,
  getUser,
  getViewer,
  addProductToCart,
  removeProductToCart,
  decreaseProductToCart} from '../data/database'

describe('Database', () => {
  it('Create a product inside productsById list', () => {
    addProduct('My Product', 11.22, 'image.png', 7)
    expect(productsById[nextProductId-1].name).toBe('My Product')
    expect(productsById[nextProductId-1].price).toBe(11.22)
    expect(productsById[nextProductId-1].image).toBe('image.png')
    expect(productsById[nextProductId-1].amount).toBe(7)
  })

  it('method getProduct return product by id', () => {
    expect(getProduct(nextProductId-1).name).toBe('My Product')
    expect(getProduct(nextProductId-1).price).toBe(11.22)
    expect(getProduct(nextProductId-1).image).toBe('image.png')
    expect(getProduct(nextProductId-1).amount).toBe(7)
  })

  it('method getProducts return all products', () => {
    let products = getProducts()
    expect(products.length).toBe(11)
  })

  it('method getCart return viewer cart list', () => {
    expect(getCart()).toEqual([])
  })

  it('method getUser return user by id', () => {
    expect(getUser('me').id).toBe('me')
  })

  it('method getViewer return current user', () => {
    expect(getViewer().id).toBe('me')
  })

  it('method addProductToCart add product to user cart', () => {
    let product = getProduct(nextProductId-1)
    let oldAmount = product.amount
    addProductToCart(product.id)
    expect(product.amount).toBe(oldAmount-1)
    expect(getCart().length).toBe(1)
    expect(getCart()[0].id).toBe(product.id)
  })

  it('method removeProductToCart remove product from user cart', () => {
    let product = getProduct(nextProductId-1)
    let oldAmount = product.amount
    removeProductToCart(product.id)
    expect(product.amount).toBe(oldAmount+1)
    expect(getCart().length).toBe(0)
  })

  it('method decreaseProductToCart remove product unit from user cart', () => {
    let product = getProduct(nextProductId-1)
    let oldAmount = product.amount
    addProductToCart(product.id)
    addProductToCart(product.id)
    expect(getCart().length).toBe(2)
    expect(product.amount).toBe(oldAmount-2)
    decreaseProductToCart(product.id)
    expect(product.amount).toBe(oldAmount-1)
    expect(getCart().length).toBe(1)
  })
})