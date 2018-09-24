import React from 'react'
import AddProductToCartMutation from '../mutations/AddProductToCartMutation'
import DecreaseProductToCartMutation from '../mutations/DecreaseProductToCartMutation'
import RemoveProductToCartMutation from '../mutations/RemoveProductToCartMutation'

export default class MiniCart extends React.Component {
  _handleIncreaseProduct(product) {
    if (product.amount > 0) {
      AddProductToCartMutation.commit(
        this.props.environment,
        product
      )
      return;
    }
    alert('Produto Esgotado!')
  }

  _handleDecreaseProduct(product) {
    if (product.qty > 0) {
      DecreaseProductToCartMutation.commit(
        this.props.environment,
        product
      )
      return;
    }
  }

  _handleRemoveProduct(product) {
    RemoveProductToCartMutation.commit(
      this.props.environment,
      product
    )
  }

  _handleToggle() {
    if (!this.props.show)
      return 'mini-cart--hidden'
  }

  render() {
    let itemsKeys = Object.keys(this.props.items)
    return (
      <div className={this._handleToggle()}>
        <div
          onClick={this.props.handleClose}
          className="mini-cart__overlay"></div>
        <div className="mini-cart">
          <div className="mini-cart__header">carrinho</div>
          <div className="mini-cart__section">
            {itemsKeys.length > 0 &&
              <ul className="mini-cart__items">
                {itemsKeys.map((id) => {
                  let finalPrice = this.props.items[id].qty * this.props.items[id].price
                  return (
                    <li key={id} className="mini-cart__item">
                      <span className="mini-cart__item__remove" onClick={this._handleRemoveProduct.bind(this, this.props.items[id])}>X</span>
                      <img
                        className="mini-cart__item__img"
                        src={'/imgs/' + this.props.items[id].image}></img>
                      <span className="mini-cart__item__middle">
                        <h5 className="mini-cart__item__name">
                          {this.props.items[id].name}
                        </h5>
                        <small className="mini-cart__item__qty">
                          Quantidade: {this.props.items[id].qty}
                        </small>
                        <span className="mini-cart__change-qty">
                          <span onClick={this._handleIncreaseProduct.bind(this, this.props.items[id])}>aumentar</span>
                          <span onClick={this._handleDecreaseProduct.bind(this, this.props.items[id])}>diminuir</span>
                        </span>
                      </span>
                      <strong className="mini-cart__item__total">
                        R$ {finalPrice.toFixed(2)}
                      </strong>
                    </li>
                  )
                })}
              </ul>
            }

            {itemsKeys.length === 0 &&
              <ul className="mini-cart__items mini-cart__items--empty">
                <li>
                  <strong className="mini-cart__empty-cart">Carrinho vazio.</strong>
                  <p>Vá as comprar!</p>
                </li>
              </ul>
            }
          </div>
          <div className="mini-cart__footer">
            total R$ {this.props.totalPrice}
          </div>
        </div>
      </div>
    )
  }
}