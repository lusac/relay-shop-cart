import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import {createFragmentContainer, graphql} from 'react-relay';

class Product extends React.Component {
  render() {
    return (
      <Card className="card">
        <CardMedia
          className="card__media"
          image={'/imgs/' + this.props.product.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subheading"
            className="card__title">
            {this.props.product.name}
          </Typography>
          <Typography component="p">
            R$ {this.props.product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Comprar
          </Button>
        </CardActions>
      </Card>
    );
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
});
