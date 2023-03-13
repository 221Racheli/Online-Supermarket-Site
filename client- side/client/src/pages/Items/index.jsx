
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Item from "./Item"
import axios from "axios";

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette. === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,mode
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const handleData=async (id)=>{
    try {
        const res = await axios.get(`http://localhost:3600/products/${id}`).json();
        return await res
    }
    catch (err) {
        
            }
        
}
export default function ResponsiveGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(handleData(props.id)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}








