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
      return 'hidden'
  }

  render() {
    return (
      <div className={'mini-cart ' + this._handleToggle()}>
        <div className="mini-cart__header">carrinho</div>
        <div className="mini-cart__section">
          <ul className="mini-cart__items">
            {Object.keys(this.props.items).map((id) => {
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
        </div>
        <div className="mini-cart__footer">
          total R$ {this.props.totalPrice}
        </div>
      </div>
    )
  }
}