import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../Items/Item';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";




export default function SearchPage() {

    const [items, setItems] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const searchParamter = searchParams.get("searchParamter");

    useEffect(() => {
        console.log(searchParamter);
        async function fetchData() {
            try {
                const { data } = await axios.get(`http://localhost:3600/products/search?keyWord=${searchParamter}`);
                setItems(data);
            }
            catch {
                setItems([]);
            }
        }
        fetchData();
    }, [searchParamter]);

    return (
        <Box sx={{ flexGrow: 1, margin: '3%' }}>
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