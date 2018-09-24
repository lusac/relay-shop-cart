import React from 'react'

export default class MiniCart extends React.Component {
  handleToggle() {
    if (!this.props.show)
      return 'hidden'
  }

  render() {
    return (
      <div className={'mini-cart ' + this.handleToggle()}>
        <div className="mini-cart__header">carrinho</div>
        <div className="mini-cart__section">
          <ul className="mini-cart__items">
            {Object.keys(this.props.items).map((id) => {
              return (
                <li key={id} className="mini-cart__item">
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
                  </span>
                  <strong className="mini-cart__item__total">
                    R$ {this.props.items[id].qty * this.props.items[id].price}
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