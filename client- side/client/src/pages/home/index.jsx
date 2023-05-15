import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../Items/Item';
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from '@mui/material';


export default function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:3600/products/sale/`);
                const sortedData =data.sort((product_a, product_b) => product_a.price-product_b.price);
                setItems(sortedData);
            }
            catch {
                setItems([]);
            }
        }
        fetchData();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, margin: '3%' }}>
            <Typography textAlign={'center'}  sx={{color: 'text.secondary',fontFamily:'Fb Moskito'}} variant='h3'>המבצעים שלנו</Typography>
            <Grid container spacing={1} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Grid container item spacing={4} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {items.map((item) => (
                        <Grid item>
                            <Item info={item}></Item>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}