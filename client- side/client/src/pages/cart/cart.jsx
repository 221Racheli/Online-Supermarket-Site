import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function AlertDialog({ children }) {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(parseInt(localStorage.getItem('amount')) || 0);
    const [products, setProducts] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);
    const[totalSum,setTotalSum]=React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const openCartInfo=()=>{
        navigate('/cart');
        handleClose();
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="cart-dialog-title" >
                    {": סל הקניות שלי"}
                </DialogTitle>
                <DialogContent>
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                        }}
                    >
                        {/* {console.log(products)} */}
                        {products.map((prod) => (
                            <>
                                <ListItem key={prod.product_id}>
                                    <ListItemText primary={`מוצר :${prod.name} כמות :${prod.quantity}`} secondary={prod.price} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        ))}
                    </List>
                </DialogContent>
                <DialogContentText id="cart-dialog-description">
                    {totalSum}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={openCartInfo} autoFocus>
                        לצפייה מורחבת בעגלה
                    </Button>
                </DialogActions>
            </Dialog>
            <CartContext.Provider value={{ handleClickOpen, handleClose, amount, setAmount, products, setProducts,totalSum,setTotalSum }}>
                {children}
            </CartContext.Provider>
        </div>
    );
}
