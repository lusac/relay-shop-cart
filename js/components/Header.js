import React from 'react'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {createFragmentContainer, graphql} from 'react-relay'
import MiniCart from './MiniCart'


class Header extends React.Component {
  state = {
    showMiniCart: false
  }

  _toggleMiniCart = () => {
    this.setState({ showMiniCart: !this.state.showMiniCart })
  }

  _getCartTotalPrice = () => {
    let total = 0
    this.props.viewer.cart.edges.map((product) => {
      total += product.node.price
    })
    return `R$ ${total.toFixed(2)}`
  }

  _getFormatProductsDate = () => {
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

    return products
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Minha Lojinha
          </Typography>

          <div>
            <IconButton
              color="inherit"
              onClick={this._toggleMiniCart.bind(this)}>
              <Badge badgeContent={this.props.viewer.cart.edges.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <MiniCart
              show={this.state.showMiniCart}
              items={this._getFormatProductsDate()}
              totalPrice={this._getCartTotalPrice()}
              environment={this.props.relay.environment} />
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
            amount
          }
        }
      }
      id
      ...Product_viewer
    }
  `,
})
