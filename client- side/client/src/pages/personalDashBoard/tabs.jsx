import * as React from 'react';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CollapsibleTable from './previousOrders'
import NestedList from './personalInformation'
import BarGraph from './graphs'
import axios from 'axios';


export default function CenteredTabs() {

  const [value, setValue] = React.useState(0);
  const [openOrders, setOpenOrders] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openGraph, setOpenGraph] = React.useState(false);
  const [dataToBar, setDataToBar] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  async function fetcData() {
    setOpenOrders(false);
    setOpenInfo(false);
    const defualEnd = new Date().toISOString().slice(0, 10);
    const defualtStart = new Date(new Date().setMonth(new Date().getMonth() - 36)).toISOString().slice(0, 10);
    const { data } = await axios.get(`http://localhost:3600/orders/account?startDate=${defualtStart}&endDate=${defualEnd}`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    const newData = data.map(d => { return { name: d.createdAt.slice(0,7), pv: d.totalPrice } });
    const dates = newData.map(element=>element.name);
    const unique = dates.filter((value, index, array) => array.indexOf(value) === index);
    let arrangeData= unique.map(d=>{return {name: d, pv: 0}})
    newData.forEach(d=>{
        arrangeData[unique.indexOf(d.name)].pv+=d.pv
    })
    setDataToBar([...arrangeData]);
    setOpenGraph(true);
  }



  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' ,position:"sticky",top:'6%' }}>
        <Tabs value={value} onChange={handleChange} centered dir="rtl" sx={{backgroundColor:'white'}}>
          <Tab label={"פרטים אישיים"} value={0}/> 
          <Tab label="הזמנות קודמות" value={1} />
          <Tab label="גרפים של קניות" />
          {/*  onClick={fetcData} */}
        </Tabs>
      </Box>
      {value===0 && <NestedList />}
      {value===1 && <CollapsibleTable />}
      {value===2 && <BarGraph orderData={dataToBar} />}
    </>
  );
}
