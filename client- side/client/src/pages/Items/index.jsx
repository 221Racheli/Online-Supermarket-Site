import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Item from './Item';
import axios from "axios";
import { useEffect, useState } from "react";



function FormRow({ id }) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:3600/products/${id}`);
            setItems(data);
        }
        fetchData();
    }, []);

    return (
        <React.Fragment>
            {items.map((item) => (
                <Grid item xs={4}>
                    <Item info={item}></Item>
                </Grid>

            ))}
        </React.Fragment>
    );
}

export default function NestedGrid({id}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid container item spacing={3}>
                    <FormRow id={id} />
                </Grid>
                {/* <Grid container item spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={3}>
                    <FormRow />
                </Grid> */}
            </Grid>
        </Box>
    );
}
