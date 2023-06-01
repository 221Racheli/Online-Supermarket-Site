import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BasicAlerts from '../general/alerts/failAlert'
import SuccessAlerts from '../general/alerts/successAlert'


function FormRow({setAlert}) {
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
        <>
       <React.Fragment>
           
            {items.map((item) => (
                 <Grid item>
                    <Item info={item} setAlert={setAlert}></Item>
                </Grid>
            ))}
        </React.Fragment>
        </>
    );
}

export default function NestedGrid() {
    
    const [alert,setAlert]=useState(false)
    
    return (
        <>
        {alert && <BasicAlerts setAlert={setAlert}></BasicAlerts>}
        <Box sx={{ flexGrow: 1, margin: '3%'}}>
            <Grid container spacing={1} sx={{ display: 'flex',flexWrap: 'wrap', justifyContent:'center'}}>
                <Grid container item spacing={4} sx={{ display: 'flex',flexWrap: 'wrap', justifyContent:'center'}}>
                    <FormRow setAlert={setAlert}/>
                </Grid>
            </Grid>
        </Box>
        
        </>
    );
}
