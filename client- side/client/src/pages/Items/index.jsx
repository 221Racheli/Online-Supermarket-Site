import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Item from './Item';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';



function FormRow() {
    const [items, setItems] = useState([]);

    const { categoryId } = useParams();

    useEffect(() => {
        async function fetchData() {
            // const { data } = await axios.get(`http://localhost:3600/products/${categoryId}`);
            const { data } = await axios.get(`http://localhost:3600/products/10012`);
            setItems(data);
        }
        fetchData();
    }, []);

    return (
        <React.Fragment>
            {items.map((item) => (
                <Grid item xs={2}>
                    <Item info={item}></Item>
                </Grid>
            ))}
        </React.Fragment>
    );
}

export default function NestedGrid() {
    return (
        <Box sx={{ flexGrow: 1, margin: '3%' }}>
            <Grid container spacing={1}>
                <Grid container item spacing={4}>
                    <FormRow />
                </Grid>
            </Grid>
        </Box>
    );
}
