import React from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import {createFragmentContainer, graphql} from 'react-relay'
import AddProductToCartMutation from '../mutations/AddProductToCartMutation'
import SimpleModalWrapped from '../components/Modal'

export class Product extends React.Component {
  state = {
    isModalOpen: false
  }

  _handleBuyProduct = () => {
    if (this.props.product.amount > 0) {
      AddProductToCartMutation.commit(
        this.props.relay.environment,
        this.props.product
      )
      return
    }

    alert('Produto Esgotado!')
  }

  _toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  render() {
    return (
      <Card className="card cursor-pointer">
        <CardMedia
          onClick={this._toggleModal}
          className="card__media"
          title="Contemplative Reptile"
          image={'/imgs/' + this.props.product.image} />
        <CardContent
          onClick={this._toggleModal}>
          <Typography
            gutterBottom
            variant="subheading"
            className="card__title">
            {this.props.product.name}
          </Typography>
          <Typography component="p">
            Em estoque: {this.props.product.amount}
          </Typography>
          <Typography
            component="p"
            className="card__price">
            R$ {this.props.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            className="card__button"
            disabled={this.props.product.amount > 0 ? false : true}
            onClick={this._handleBuyProduct}
            variant="contained"
            color="primary">
            Comprar
          </Button>
        </CardActions>

        {this.state.isModalOpen &&
          <SimpleModalWrapped
            relay={this.props.relay}
            open={this.state.isModalOpen}
            handleClose={this._toggleModal}
            product={this.props.product} />}
      </Card>
    )
  }
}

export default createFragmentContainer(Product, {
  product: graphql`
    fragment Product_product on Product {
      id
      name
      image
      price
      amount
    }
  `,
  viewer: graphql`
    fragment Product_viewer on User {
      id
    }
  `,
})
