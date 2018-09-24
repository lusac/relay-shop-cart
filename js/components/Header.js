import React from 'react'
import Badge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {createFragmentContainer, graphql} from 'react-relay'

class Header extends React.Component {
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
            ...Product_product
          }
        }
      }
      id
      ...Product_viewer
    }
  `,
})
