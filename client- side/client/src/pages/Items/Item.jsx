import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LargeItem from './LargeItem';
import CardActionArea from '@mui/material/CardActionArea';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { CartContext } from '../cart/cart';
import { useContext } from "react"


export default function Item({ info }) {

  const [open, setOpen] = React.useState(false);
  const [amountItem, setAmountItem] = React.useState(0);
  const { amount, setAmount, products, setProducts, totalSum, setTotalSum } = useContext(CartContext);

  const amountSetting = (e) => {
    if (e == 'increase') {
      if (amountItem < info.amount) {
        setAmountItem(amountItem + 1);
      }
    }
    if (e == 'decrease') {
      if (amountItem > 0) {
        setAmountItem(amountItem - 1);
      }
    }
  }

  const addToCart = () => {
    setAmountItem(0);
    setTotalSum(totalSum + (amountItem * info.price));
    const ind = products.findIndex(prod => prod.product_id == info.product_id);
    if (ind < 0) {
      products.push({ ...info, "quantity": amountItem });
      setProducts([...products]);
    }

    else {
      products[ind].quantity+=amountItem;
    } 
    localStorage.setItem("cart", JSON.stringify(products));
    localStorage.setItem("amount", amount + amountItem);
    setAmount(amount + amountItem);
  }


  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia
            sx={{ height: 140 }}
            image="/Banana.JPG"
            title="Banana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {info.name}
              <br />
              {info.company}
              <br />
              {"שח" + " " + info.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" size='small' id="increase" onClick={(e) => { amountSetting(e.currentTarget.id) }}>+</Button>
          <spam>{amountItem}</spam>
          <Button variant="outlined" size='small' id="decrease" onClick={(e) => { amountSetting(e.currentTarget.id) }}>-</Button>
          <IconButton onClick={addToCart} color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
      {open && <LargeItem openStatus={open} setopenStatus={setOpen} info={info}></LargeItem>}
    </>
  );
}