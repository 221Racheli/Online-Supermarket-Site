
import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from '../cart/cart';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer],
});

// Create RTL theme
const theme = createTheme({
  direction: 'rtl',
});

let itemsToAddToCart = [];

function handleChange(e, info) {
  if (e.target.checked === true)
    itemsToAddToCart.push(info);
  else
    itemsToAddToCart = itemsToAddToCart.filter(item => item.product_id !== info.product_id);
}

function IconLabelButtons() {
  const { amount, setAmount, products, setProducts, totalSum, setTotalSum } = useContext(CartContext);

  function addItemToCart(item) {
    if (!item.isActive) {
      alert("item not available");
      return;
    }
    setTotalSum(totalSum + item.price);
    const ind = products.findIndex(prod => prod.product_id === item.product_id);
    if (ind < 0) {
      item.price = parseFloat(item.price);
      products.push({ ...item, "quantity": 1 });
      setProducts([...products]);
    } else {
      products[ind].quantity += 1;
    }
    localStorage.setItem("cart", JSON.stringify(products));
    localStorage.setItem("amount", amount + 1);
    setAmount(amount + 1);
  }

  return (
    <Button variant="contained" endIcon={<AddShoppingCartIcon />} onClick={() => itemsToAddToCart.forEach(addItemToCart)}>
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

function createData(id, sum, status, date) {
  return {
    id,
    sum,
    status,
    date,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [infoFromFetch, setInfoFromFetch] = useState([]);

  useEffect(() => {
    async function fetchInfo() {
      if (open) {
        const { data } = await axios.get(`http://localhost:3600/orders/products/${row.id}`, {
          headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json'
          }
        });
        setInfoFromFetch(data);
      }
    }
    fetchInfo();
  }, [open, row.id]);

  const rows = infoFromFetch.map(item =>
    createInfoData(item.product_id, item.name, item.price, item.quantity, item.company, item.subcategory_id, item.isActive, item.picture)
  );

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.sum}</TableCell>
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
                    <TableCell></TableCell>
                    <TableCell align="right">קטגוריה</TableCell>
                    <TableCell align="right">חברה</TableCell>
                    <TableCell align="right">כמות</TableCell>
                    <TableCell align="right">מחיר</TableCell>
                    <TableCell align="right">שם המוצר</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((historyRow) => (
                    <TableRow key={historyRow.product_id}>
                      <TableCell><Checkbox onChange={(e) => handleChange(e, historyRow)} /></TableCell>
                      <TableCell align="right">{historyRow.category}</TableCell>
                      <TableCell align="right">{historyRow.company}</TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">{Math.round(historyRow.price)}</TableCell>
                      <TableCell align="right">{historyRow.name}</TableCell>
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

export default function CollapsibleTable() {
  const [dataFromFetch, setDataFromFetch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://localhost:3600/orders/', {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
        }
      });
      setDataFromFetch(data);
    }
    fetchData();
  }, []);

  const rows = dataFromFetch.map(item => 
    createData(item.order_id, item.totalPrice, item.status, item.createdAt.slice(0,10))
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper} dir="rtl">
          <Table aria-label="collapsible table" sx={{ minWidth: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">מזהה הזמנה</TableCell>
                <TableCell align="right">תאריך</TableCell>
                <TableCell align="right">סטטוס</TableCell>
                <TableCell align="right">סכום</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </CacheProvider>
  );
}