import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { UseCart } from '../contexts/cart_context';

export default function MuiCard(props) {
  const { addtocart } = UseCart();
  const { imageurls, name, price } = props.obj;

  const handler1 = (obj) => {
    addtocart(obj);
    alert("Product just added to the cart, you can check for updates on the cart page!!");
  };

  return (
    <Card
      sx={{
        width: '12.5%',
        height: 300,
        padding: '4px', // Equivalent to Tailwind's p-1
        boxSizing: 'border-box', // Ensures padding doesn't affect width
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="120"
          image={imageurls[0]}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 1 }}>
        <Button onClick={() => handler1(props.obj)} size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}



