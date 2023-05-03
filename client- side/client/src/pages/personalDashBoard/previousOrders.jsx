import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect } from "react";
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from '../cart/cart';
import { useContext } from 'react';


let itemsToAddToCart = [];

function handleChange(e, info) {
  if (e.target.checked == true)
    itemsToAddToCart.push(info);
  else
    itemsToAddToCart = itemsToAddToCart.filter(item => item.product_id != e.target.info.product_id);
}


function IconLabelButtons() {

  const { amount, setAmount, products, setProducts, totalSum, setTotalSum } = useContext(CartContext);

  function addItemToCart(item) {
    if (!item.isActive) {
      alert("item not available");
      return;
    }
    // res=axios.get('http://')
    setTotalSum(totalSum + item.price);
    const ind = products.findIndex(prod => prod.product_id == item.product_id);
    if (ind < 0) {
      products.push({ ...item, "quantity": 1 });
      setProducts([...products]);
    }

    else {
      products[ind].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(products));
    localStorage.setItem("amount", amount + 1);
    setAmount(amount + 1);

  }

  return (
    <Button variant="contained" endIcon={<AddShoppingCartIcon />} onClick={() => itemsToAddToCart.forEach((item) => { console.log(itemsToAddToCart); addItemToCart(item) })}>
      להוספה לסל
    </Button>
  );
}



function createInfoData(product_id, name, price, quantity, company, category, isActive, picture) {
  return {
    product_id,
    name,
    price,
    quantity,
    company,
    category,
    isActive,
    picture
  };
}
function createData(id, sum, address, status, date) {
  return {
    id,
    sum,
    address,
    status,
    date,
  };


}

function Row(props) {
  const { row } = props;
  console.log(row.id)
  const orderId = row.id;
  const [open, setOpen] = React.useState(false);

  const [infoFromFetch, setInfoFromFetch] = useState("");
  useEffect(() => {
    async function fetchInfo() {
      const { data } = await axios.get(`http://localhost:3600/orders/products/${orderId}`,
        {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json'
          }
        })
      console.log(data)
      setInfoFromFetch(data);
    }
    fetchInfo()
  }, []);
  const rows = [];
  if (infoFromFetch.length > 0) {
    infoFromFetch.forEach(item => {
      rows.push(createInfoData(item.product_id, item.name, item.price, item.quantity, item.company, item.subcategory_id, item.isActive, item.picture))
    });
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} dir="rtl">
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.sum}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        {/* <TableCell align="right">{row.amount}</TableCell> */}
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                פירוט הזמנה
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">שם המוצר</TableCell>
                    <TableCell align="right">מחיר</TableCell>
                    <TableCell align="right">כמות</TableCell>
                    <TableCell align="right">חברה</TableCell>
                    <TableCell align="right">קטגוריה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((historyRow) => (
                    <TableRow key={historyRow.product_id}>
                      {/* <Checkbox {...label} /> */}
                      <TableCell align="right"><Checkbox onChange={(e) => handleChange(e, historyRow)} /></TableCell>
                      <TableCell align="right">{historyRow.name}</TableCell>
                      <TableCell align="right" component="th" scope="row"> {Math.round(historyRow.price)}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">{historyRow.company}</TableCell>
                      <TableCell align="right">{historyRow.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <IconLabelButtons />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     sum: PropTypes.number.isRequired,
//     address: PropTypes.string.isRequired,
//     // info: PropTypes.arrayOf(
//     //   PropTypes.shape({
//     //     amount: PropTypes.number.isRequired,
//     //     name: PropTypes.string.isRequired,
//     //     price: PropTypes.string.isRequired,
//     //     category: PropTypes.string.isRequired,
//     //     company: PropTypes.string.isRequired,
//     //   }),
//     // ).isRequired,
//     status: PropTypes.string.isRequired,
//     // amount: PropTypes.number.isRequired,
//     date: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default function CollapsibleTable() {

  const [dataFromFetch, setDataFromFetch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://localhost:3600/orders/', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      })
      setDataFromFetch(data);
    }
    fetchData();
  }, []);

  const rows = [];
  if (dataFromFetch.length > 0) {
    dataFromFetch.forEach(item => {
      rows.push(createData(item.order_id, item.totalPrice, JSON.stringify(item.orderAddress), item.status, item.createdAt.slice(0,10)))
    });
  }
  return (
    <TableContainer component={Paper} dir="rtl">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <TableCell/>
            <TableCell align="right">מזהה הזמנה</TableCell>
            <TableCell align="right">סכום</TableCell>
            <TableCell align="right">כתובת</TableCell>
            <TableCell align="right">סטטוס</TableCell>
            <TableCell align="right">תאריך</TableCell>
            {/* <TableCell align="right">פריטים</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
