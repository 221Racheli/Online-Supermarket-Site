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


export default function Item({ info }) {

  const [open, setOpen] = React.useState(false);
  const [amount,setAmount]=React.useState(0);

  const amountSetting=(e)=>{
    if(e=='increase'){
      if(amount<info.amount)
      {
        setAmount(amount+1);
      }
    }
    if(e=='decrease'){
      if(amount>0)
      {
        setAmount(amount-1);
      }
    }
  }

 const addToCart=()=>{

 }


  return (
    <>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>setOpen(true)}>
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
          {"שח" +" "+ info.price}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions>
      <Button variant="outlined" size='small' id="increase" onClick={(e)=>{amountSetting(e.currentTarget.id)}}>+</Button>
      <spam>{amount}</spam>
      <Button variant="outlined" size='small'id="decrease" onClick={(e)=>{amountSetting(e.currentTarget.id)}}>-</Button>
        <IconButton onClick={addToCart()} color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      </CardActions>
    </Card>
    {open && <LargeItem openStatus={open} setopenStatus={setOpen} info={info}></LargeItem>}
    </>
  );
}