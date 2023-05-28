import {useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from './dashboard/layout';
import { AccountProfile } from './account/account-profile';
import { AccountProfileDetails } from './account/account-profile-details';
async function fetchPersonalInformation()
{
  
  const res=await axios.get('http://localhost:3600/users',  {
      headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json'
      }
  });

  const {first_name,last_name,user_name,phone_number1,phone_number2,address,email}=res.data;
  return {first_name,last_name,user_name,phone_number1,phone_number2,address,email};
}

const Page = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    phone2: "",
    address: "",
    userName: ""
  });
  useEffect(()=>{
    const func=async()=>{
    const {first_name,last_name,user_name,phone_number1,phone_number2,address,email}=await fetchPersonalInformation();
    setValues({
      firstName: first_name,
      lastName: last_name,
      email: email,
      phone1: phone_number1,
      phone2: phone_number2,
      address: address,
      userName: user_name
    })
  };
  func();
  },[])
  return (
  <Box dir="rtl"
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              פרטים אישיים
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile user={values}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails values={values} setValues={setValues} />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
