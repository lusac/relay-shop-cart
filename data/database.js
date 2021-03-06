export class Product {}
export class User {}

// Mock authenticated ID
const USER_ID = 'me'

// Mock user data
const viewer = new User()
viewer.id = USER_ID
viewer.cart = []
const usersById = {
  [USER_ID]: viewer,
}

// Mock Products data
export const productsById = {}
export let nextProductId = 0

export function addProduct(name, price, image, amount) {
  const product = new Product()
  product.id = `${nextProductId++}`
  product.name = name
  product.price = price
  product.image = image
  product.amount = amount
  productsById[product.id] = product
}

export function getProduct(id) {
  return productsById[id]
}

export function getProducts() {
  return Object.keys(productsById).map((key) => productsById[key])
}

export function getCart() {
  return viewer.cart
}

export function getUser(id) {
  return usersById[id]
}

export function getViewer() {
  return getUser(USER_ID)
}

export function addProductToCart(id) {
  const product = getProduct(id)
  product.amount--
  viewer.cart.push(product)
}

export function decreaseProductToCart(id) {
  const product = getProduct(id)
  product.amount++
  let idRemoved = false

  // Preciso remover apenas 1 da lista
  // Obs: se fosse um dicionario seria beeem mais facil
  viewer.cart = viewer.cart.filter(p => {
    if (p.id!==product.id || idRemoved) {
     return p
    } else if (!idRemoved) {
     idRemoved = true
     return
    }
  })
}

export function removeProductToCart(id) {
  const product = getProduct(id)
  let newCart = viewer.cart.filter(product => product.id !== id)
  product.amount += viewer.cart.length - newCart.length
  viewer.cart = newCart
}

addProduct('Game God Of War - PS4', 129.99, 'product_img1.jpg', 7)
addProduct('iPhone 8 Plus Prata 64GB Tela 5.5" IOS 11 4G Wi-Fi Câmera 12MP - Apple', 3799, 'product_img2.jpg', 7)
addProduct('Livro - O Encontro dos Clássicos: Tolkien & George R. R. Martin + Pin Exclusivo', 34.99, 'product_img3.jpg', 3)
addProduct('Game Nioh - PS4', 64, 'product_img4.jpg', 2)
addProduct('Game Horizon Zero Dawn - PS4', 69.99, 'product_img5.jpg', 5)
addProduct('Smart TV LED 55" Samsung Ultra HD 4k UN55NU7100GXZD com Conversor Digital 3 HDMI 2 USB Wi-Fi Solução Inteligente de Cabos HDR Premium Smart Tizen', 4599.99, 'product_img6.jpg', 1)
addProduct('Android Sansung Ultima Geração Preto', 1975.99, 'product_img7.png', 3)
addProduct('Notebook Dell Inspiron I15-5570-B30B Intel Core i7 8GB (AMD Radeon 530 com 4GB) 1TB Tela 15,6" Windows 10 ', 3599.99, 'product_img8.jpg', 1)
addProduct('Smart TV LED 43" Samsung 43MU6100 UHD 4K HDR Premium com Conversor Digital 3 HDMI 2 USB 120Hz', 1899.99, 'product_img9.png', 4)
addProduct('Box Guia Cinematográfico Coleção Harry Potter', 34.57, 'product_img10.jpg', 2)