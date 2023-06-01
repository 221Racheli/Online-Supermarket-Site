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
import SellIcon from '@mui/icons-material/Sell';
import IconButton from '@mui/material/IconButton';
import { CartContext } from '../cart/cart';
import { useContext } from "react"


export default function Item({ info,setAlert }) {

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
    setTotalSum(totalSum + (amountItem * info.price*(1-info.sale/100)));
    const ind = products.findIndex(prod => prod.product_id == info.product_id);
    if (ind < 0) {
      products.push({ ...info, "quantity": amountItem });
      setProducts([...products]);
    }

    else {
      products[ind].quantity += amountItem;
    }
    localStorage.setItem("cart", JSON.stringify(products));
    localStorage.setItem("amount", amount + amountItem);
    setAmount(amount + amountItem);
    setAlert(true);
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, alignItems: 'center'}}>
        <CardActionArea onClick={() => setOpen(true)}>
          {info.sale > 0 && <SellIcon sx={{position: 'absolute', top:0, left:0,}}></SellIcon>}
          <CardMedia
            className='product-image'
            sx={{ height: 180, alignItems: 'center' }}
            image={`/images/${info.subcategory_id}/${info.picture}`}
            title={info.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {info.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {info.company}
            </Typography>
            {info.sale == 0 ?
              <Typography variant="body2" color="text.secondary" textAlign="center">
                &#8362; {info.price}
              </Typography>
              :
              <Typography textAlign="center">
                <Typography variant="body2" display={'inline'} color="text.secondary" textAlign="center" sx={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                  {`${info.price} `}
                </Typography>
                <Typography variant="body2" display={'inline'} color="text.secondary" textAlign="center">
                  &#8362; {(info.price *(1-info.sale/100)).toFixed(2)}
                </Typography>
              </Typography>
            }

          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" size='small' id="increase" disabled={info.amount==0} onClick={(e) => { amountSetting(e.currentTarget.id) }}>+</Button>
          <Typography textAlign={'center'}>{amountItem}</Typography>
          <Button variant="outlined" size='small' id="decrease" disabled={info.amount==0} onClick={(e) => { amountSetting(e.currentTarget.id) }}>-</Button>
          <IconButton onClick={addToCart} color="primary" aria-label="add to shopping cart" disabled={info.amount==0}>
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
      {open && <LargeItem openStatus={open} setopenStatus={setOpen} info={info}></LargeItem>}
    </>
  );
}