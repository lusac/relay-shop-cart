import React from 'react'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {createFragmentContainer, graphql} from 'react-relay'

class Header extends React.Component {
  getCartTotalPrice = () => {
    let total = 0
    this.props.viewer.cart.edges.map((product) => {
      total += product.node.price
    })
    return `R$ ${total.toFixed(2)}`
  }
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap>
            Minha Lojinha
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={this.props.viewer.cart.edges.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <small>{this.getCartTotalPrice()}</small>
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
            ...Product_product
          }
        }
      }
      id
      ...Product_viewer
    }
  `,
})
