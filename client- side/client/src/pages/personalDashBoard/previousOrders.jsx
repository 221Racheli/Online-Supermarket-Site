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
function createInfoData(name, amount, price, category, company) {
  return {
    name,
    amount,
    price,
    category,
    company
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
  //let information = [];
  // info.map((item) => {
  //   information.push(createInfoData(item.name, item.amount, item.price, item.category, item.company));
  // });
  



    // info: information
    // info: [
    //   {
    //     name: name,
    //     category: category,
    //     amount: amount,
    //     pPrice:pPrice,
    //     company: company,

    //   },
    //   {
    //     date: '2020-01-02',
    //     customerId: 'Anonymous',
    //     amount: 1,
    //   },
    // ],
  

}

function Row(props) {
  const { row } = props;
  console.log(row.id)
   const orderId=row.id;
 const [open, setOpen] = React.useState(false);

  const [infoFromFetch,setInfoFromFetch]=useState("");
  useEffect(()=>{
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
  },[]);
  const rows = [];
  if (infoFromFetch.length > 0) {
    infoFromFetch.forEach(item => {
      rows.push(createInfoData(item.name, item.price, item.amount, item.company, item.subcategory_id))
    });
  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} dir="rtl">
        <TableCell  align="right">
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
                פירוט
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">שם המוצר</TableCell>
                    <TableCell align="right">מחיר</TableCell>
                    <TableCell align="right">כמות</TableCell>
                    <TableCell align="right">חברה</TableCell>
                    <TableCell align="right">קטגוריה</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                       <TableCell align="right">{historyRow.name}</TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {Math.round(historyRow.price)}
                      </TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                     
                      <TableCell align="right">
                        {historyRow.company}
                      </TableCell>
                      <TableCell align="right">{historyRow.subcategory_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell> 
       </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sum: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    // info: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     name: PropTypes.string.isRequired,
    //     price: PropTypes.string.isRequired,
    //     category: PropTypes.string.isRequired,
    //     company: PropTypes.string.isRequired,
    //   }),
    // ).isRequired,
    status: PropTypes.string.isRequired,
    // amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

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
      rows.push(createData(item.order_id, item.totalPrice, JSON.stringify(item.orderAddress), item.status, item.createdAt))
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
