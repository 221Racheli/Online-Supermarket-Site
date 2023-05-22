import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';




function FormRow() {
    const [items, setItems] = useState([]);
    
    const { subCategoryId } = useParams();

    useEffect(() => {
        async function fetchData() {
            try{
                const {data} = await axios.get(`http://localhost:3600/products/${subCategoryId}`);
                setItems(data.filter(d=>d.isActive==1));
            }
            catch{
                setItems([]); 
            }    
        }
        fetchData();
    },[subCategoryId]);


    return (
        <React.Fragment>
            {items.map((item) => (
                 <Grid item>
                    <Item info={item}></Item>
                </Grid>
            ))}
        </React.Fragment>
    );
}

export default function NestedGrid() {
    return (
        <Box sx={{ flexGrow: 1, margin: '3%'}}>
            <Grid container spacing={1} sx={{ display: 'flex',flexWrap: 'wrap', justifyContent:'center'}}>
                <Grid container item spacing={4} sx={{ display: 'flex',flexWrap: 'wrap', justifyContent:'center'}}>
                    <FormRow />
                </Grid>
            </Grid>
        </Box>
    );
}
