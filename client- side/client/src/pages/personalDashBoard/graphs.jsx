// import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Typography } from "@mui/material";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Button from '@mui/material/Button';



export default function BarGraph({ orderData }) {
    const [mapData, setMapData] = useState(orderData);
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().slice(0, 10));

    function showGraph() {
        async function fetcData() {
            console.log("fetchData");
            try {
                const { data, res } = await axios.get(`http://localhost:3600/orders/account?startDate=${startDate}&endDate=${endDate}`, {
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
                setMapData([...arrangeData]);
            }
            catch {
                setMessage('לא נמצאו נתונים להצגה');
                setMapData([]);
            }

        }
        fetcData();
    }

    return (
        <Container>
            <Typography>גרף סכום הזמנות לטווח שבין {startDate} ל {endDate}</Typography>
            <Button variant="outlined" endIcon={<SignalCellularAltIcon />} onClick={showGraph}>הצג גרף</Button>
            <Box display='flex' alignItems='right'>
                <TextField
                    id="input-with-icon-textfield"
                    label="עד תאריך"
                    type="date"
                    align="right"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                        ),
                    }}
                    variant="standard"
                    sx={{ margin: 10 }}
                    onBlur={(e) => setEndDate(e.currentTarget.value)}
                />
                <TextField
                    id="input-with-icon-textfield"
                    label="מתאריך"
                    type="date"
                    align="right"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start"></InputAdornment>
                        ),
                    }}
                    variant="standard"
                    sx={{ margin: 10 }}
                    onBlur={(e) => setStartDate(e.currentTarget.value)}
                />
            </Box>
            {message != '' && <Typography textAlign={'right'}>{message}</Typography>}
            <BarChart
                width={500}
                height={300}
                data={mapData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
                barSize={20}
            >
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
            </BarChart>
        </Container>
    );
}