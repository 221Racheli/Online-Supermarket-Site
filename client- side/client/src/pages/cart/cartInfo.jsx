import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartContext } from '../cart/cart';
import { useContext } from "react";
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

function TransitionAlerts() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Close me!
                </Alert>
            </Collapse>
            <Button
                disabled={open}
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Re-open
            </Button>
        </Box>
    );
}

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit, id) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price, id };
}

function totalRows(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
let itemsToDelete = [];

function handleChange(e) {
    if (e.target.checked == true)
        itemsToDelete.push(e.target.id);
    else
        itemsToDelete = itemsToDelete.filter(item => item != e.target.id);
}



export default function SpanningTable() {
    const [open, setOpen] = useState(false);
    const { amount, setAmount, products, setProducts, totalSum, setTotalSum, total } = useContext(CartContext);
    const navigate = useNavigate();

    const rows = products.map(prod => createRow(prod.name, prod.quantity, prod.price*(1-prod.sale/100), prod.product_id));

    async function handleOrder() {
        console.log("handleOrder"); 
        products.forEach(async (product) => {
            const res = await axios.put('http://localhost:3600/products', { productToDelete: product },
                {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('token')}`,
                        'content-type': 'application/json'
                    }
                });

        });
        const response = await axios.post('http://localhost:3600/orders', { totalPrice: totalSum, orderedProducts: products },
            {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'application/json'
                }
            })
        console.log(response);
        if (response.statusText == 'Created') {
            localStorage.removeItem('cart');
            localStorage.removeItem('amount');
            setProducts([]);
            setAmount(0);
            setTotalSum(0);
        }
        setOpen(true);
        navigate("/");

    }
    function handleClick() {
        if (itemsToDelete.length > 0) {
            let tempProducts = [];
            for (let ind_1 = 0; ind_1 < products.length; ind_1++) {
                let deleteFlage = false;
                for (let ind_2 = 0; ind_2 < itemsToDelete.length; ind_2++) {
                    if (products[ind_1].product_id == itemsToDelete[ind_2]) {
                        deleteFlage = true;
                        break;
                    }
                }
                if (deleteFlage == false) {
                    tempProducts.push(products[ind_1])
                }
            }
            setProducts(tempProducts);
            tempProducts.forEach((x) => { delete x.amount; delete x.sale });
            localStorage.setItem("cart", JSON.stringify(tempProducts));
            let newAmount = 0;
            tempProducts.forEach(prod => newAmount += prod.quantity);
            setAmount(newAmount);
            console.log(newAmount);
            localStorage.setItem("amount", newAmount);
            setTotalSum(0);
            itemsToDelete = [];
        }
    }

    const amountSetting = (e) => {
        const ind = products.findIndex(prod => prod.product_id == e.id);
        if (e.name == 'increase') {
            if (products[ind].quantity + 1 <= products[ind].amount) {
                products[ind].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(products));
                localStorage.setItem("amount", amount + 1);
                setAmount(amount + 1);
                setProducts([...products]);
                setTotalSum(total(products));
            }
        }
        if (e.name == 'decrease') {
            if (products[ind].quantity - 1 > 0) {
                products[ind].quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(products));
                localStorage.setItem("amount", amount - 1);
                setAmount(amount - 1);
                setProducts([...products]);
                setTotalSum(total(products));
            }
        }
    }


    return (
        <Container sx={{ marginTop: "7%" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" >סכום</TableCell>
                            <TableCell align="right" colSpan={3}>
                                פרטים
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">סה"כ</TableCell>
                            <TableCell align="right">מחיר</TableCell>
                            <TableCell align="right">תיאור</TableCell>
                            <TableCell align="right">כמות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                <TableCell align="right">{row.unit}</TableCell>
                                <TableCell align="right">{row.desc}</TableCell>
                                <TableCell width="10"><IconButton aria-label="expand row" size="small" name="decrease" id={row.id} onClick={(e) => { amountSetting(e.currentTarget) }} sx={{ color: 'black' }}><RemoveSharpIcon /></IconButton></TableCell>
                                <TableCell width="10"><IconButton aria-label="expand row" size="small" name="increase" id={row.id} onClick={(e) => { amountSetting(e.currentTarget) }} sx={{ color: 'black' }}><AddSharpIcon /></IconButton></TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell padding="checkbox"><Box><Checkbox id={row.id} onChange={(e) => { handleChange(e) }} /></Box></TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell >{ccyFormat(totalRows(rows))}</TableCell>
                            <TableCell align="right" colSpan={2}>בסך הכל</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" onClick={(e) => { handleClick(e) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>

            <Button variant="contained" onClick={handleOrder}>לביצוע הזמנה</Button>
            {open && <TransitionAlerts />}
        </Container>
    );
}
