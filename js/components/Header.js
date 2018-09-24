import React from 'react'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {createFragmentContainer, graphql} from 'react-relay'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const ITEM_HEIGHT = 52

class Header extends React.Component {
  state = {
    anchorEl: null,
  }

  _handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  _handleClose = () => {
    this.setState({ anchorEl: null })
  }

  _getCartTotalPrice = () => {
    let total = 0
    this.props.viewer.cart.edges.map((product) => {
      total += product.node.price
    })
    return `R$ ${total.toFixed(2)}`
  }

  _renderCartFooter = () => {
    return (
      <div className="xunda">OIE</div>
    )
  }

  _renderCartItems = () => {
    // Melhorar estrutura do carrinho.
    // Já deveria vir como um dicionário.
    let products = {}
    this.props.viewer.cart.edges.map(item => {
      if (products[item.node.id]) {
        products[item.node.id].qty++
      } else {
        products[item.node.id] = {...item.node}
        products[item.node.id].qty = 1
      }
    })

    return (
      Object.keys(products).map(id => (
        <MenuItem key={id} onClick={this._handleClose} className="cart-item">
          <img
            className="cart-item__img"
            src={'/imgs/' + products[id].image}></img>
          <span className="cart-item__middle">
            <h5 className="cart-item__name">
              {products[id].name}
            </h5>
            <small className="cart-item__qty">
              Quantidade: {products[id].qty}
            </small>
          </span>
          <strong className="cart-item__total">
            R$ {products[id].qty * products[id].price}
          </strong>
        </MenuItem>
      ))
    )
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Minha Lojinha
          </Typography>

          <div>
            <IconButton
              color="inherit"
              onClick={this._handleClick}>
              <Badge badgeContent={this.props.viewer.cart.edges.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={this._handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 300,
                  marginTop: 30
                },
              }}
            >
              {this._renderCartItems()}
              {this._renderCartFooter()}
            </Menu>
          </div>

          <small>{this._getCartTotalPrice()}</small>
        </Toolbar>
      </AppBar>
    )
  }
}

export default createFragmentContainer(Header, {
  viewer: graphql`
    fragment Header_viewer on User {
      cart(
        first: 2147483647 # max GraphQLInt
      ) @connection(key: "Header_cart") {
        edges {
          node {
            id
            price
            name
            image
          }
        }
      }
      id
      ...Product_viewer
    }
  `,
})
