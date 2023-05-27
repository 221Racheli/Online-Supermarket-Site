import { useCallback, useEffect, useState } from 'react';
import {Box,Button,Card,CardActions,CardContent,CardHeader,Divider,TextField,Unstable_Grid2 as Grid} from '@mui/material';
import axios from 'axios';


const updateUser=async(e,values,setUser)=>{

  const correctDataToSend={
    first_name:values.firstName,
    last_name:values.lastName,
    email: values.email,
    phone_number1:values.phone1,
    phone_number2:values.phone1 ,
    address: values.address,
    user_name:values.userName}
    console.log("!!!!!!!!!!!!!!"+correctDataToSend);
  const res=await axios.put('http://localhost:3600/users',correctDataToSend , {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
    }
});
if (res.status==200)
  setUser(...values);
}

export const AccountProfileDetails = ({user,setUser}) => {
  
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone1: user.phone1,
    phone2: user.phone2,
    address: user.address,
    userName: user.userName
  });
  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form 
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card dir="rtl">
        <CardHeader
          subheader="הפרטים ניתנים לעריכה"
          title="פרופיל"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="נא הכנס שם פרטי"
                  label="שם פרטי"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="שם משפחה"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="כתובת אימייל"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField 
                  fullWidth
                  label="טלפון 1"
                  name="phone1"
                  onChange={handleChange}
                 required
                  value={values.phone1}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="טלפון 2"
                  name="dme"
                  onChange={handleChange}
                  value={values.phone2}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="כתובת"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                >
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={(e)=>updateUser(e,values,setUser)} variant="contained">
            שמירת השינויים
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
