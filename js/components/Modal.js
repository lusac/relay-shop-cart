import React from 'react'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AddProductToCartMutation from '../mutations/AddProductToCartMutation'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

export class SimpleModal extends React.Component {
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

  render() {
    return (
      <div>
        {this.props.product && this.props.open &&
          <Modal
            open={this.props.open}
            onClose={this.props.handleClose}>
            <div style={getModalStyle()} className={this.props.classes.paper}>
              <img className="modal__img" src={'/imgs/' + this.props.product.image}></img>
              <Typography variant="title" className="modal__title">
                {this.props.product.name}
              </Typography>
              <Typography variant="subheading" className="modal__subtitle">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <p className="modal__subtitle">
                Em estoque: {this.props.product.amount}
              </p>
              <strong className="modal__price">
                R$ {this.props.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
              </strong>
              <Button
                className="modal__button"
                disabled={this.props.product.amount > 0 ? false : true}
                onClick={this._handleBuyProduct}
                variant="contained"
                color="primary">
                Comprar
              </Button>
              <SimpleModalWrapped />
            </div>
          </Modal>
        }
      </div>
    )
  }
}

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal)

export default SimpleModalWrapped