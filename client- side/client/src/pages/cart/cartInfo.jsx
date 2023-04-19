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


const TAX_RATE = 0.17;

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

function total(items) {
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
    const { amount, setAmount, products, setProducts, totalSum, setTotalSum } = useContext(CartContext);
    const rows = products.map(prod => createRow(prod.name, prod.quantity, prod.price, prod.product_id));

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
            localStorage.setItem("cart", JSON.stringify(tempProducts));
            let newAmount = 0;
            tempProducts.forEach(prod => newAmount += prod.quantity);
            setAmount(newAmount);
            console.log(newAmount);
            localStorage.setItem("amount", newAmount);
            itemsToDelete = [];
        }
    }

    const amountSetting = (e) => {
        const ind = products.findIndex(prod => prod.product_id == e.id);
        if (e.name == 'increase') {
            if (products[ind].quantity + 1 < products[ind].amount) {
                products[ind].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(products));
                localStorage.setItem("amount", amount + 1);
                setAmount(amount + 1);
                setProducts([...products]);
            }
        }
        if (e.name == 'decrease') {
            if (products[ind].quantity - 1 > 0) {
                products[ind].quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(products));
                localStorage.setItem("amount", amount - 1);
                setAmount(amount - 1);
                setProducts([...products]);
            }
        }
    }


    return (
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
                        <TableCell >{ccyFormat(total(rows))}</TableCell>
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
    );
}
