import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CollapsibleTable from './previousOrders'
export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);
  const [openOrders, setOpenOrders] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered> 
      <Tab label="גרפים של קניות" onClick={()=>{}} />
      <Tab label="הזמנות קודמות" onClick={()=>{setOpenOrders(true)}}/>
      <Tab label="פרטים אישיים" onClick={()=>{alert("hi")}} />
      </Tabs>
    </Box>
    { openOrders&& <CollapsibleTable/> }
    </>
  );
}
