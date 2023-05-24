import React ,{useState} from 'react';
// import ListSubheader from '@mui/material/ListSubheader';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import EditIcon from '@mui/icons-material/Edit';
// import {  IconButton, ListItem } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from './dashboard/layout';
import { AccountProfile } from './account/account-profile';
import { AccountProfileDetails } from './account/account-profile-details';

import axios from 'axios';
import { useEffect } from 'react';

const updateUser=async(e,info,kind)=>{
console.log(info);
const params = kind=='first_name'?{first_name : info}:kind=='last_name'?{}:{};
  const res=await axios.put('http://localhost:3600/users',params , {
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
    }
});
}

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

const Page = () => (
  <>
    {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
    <Box
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
              Account
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
                <AccountProfile />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
// const NestedList=()=> {
//   const [open, setOpen] = useState(true);
//   const [editFirstName, setEditFirstName] = useState(true);
//   const [editLastName, setEditLastName] = useState(true);
//   const [editEmail, setEditEmail] = useState(true);
//   const [editPhone1, setEditPhone1] = useState(true);
//   const [editphone2, setEditPhone2] = useState(true);

//   const [first_name,setFirst_name]=useState("");
//   const [last_name,setLast_name]=useState("");
//   const [user_name,setUser_name]=useState("");
//   const [phone_number1,setPhone_number1]=useState("");
//   const [phone_number2,setPhone_number2]=useState("");
//   const [address,setAddress]=useState("");
//   const [email,setEmail]=useState("");
 
// useEffect(()=>{
//   const fun=async()=>{
// const {first_name,last_name,user_name,phone_number1,phone_number2,address,email}=await fetchPersonalInformation();

//     setFirst_name(first_name);
//     setLast_name(last_name);
//     setUser_name(user_name);
//     setPhone_number1(phone_number1);
//     setPhone_number2(phone_number2);
//     setAddress(address);
//     setEmail(email);
//   };
//   fun();
//   },[])

//   useEffect(()=>{console.log(first_name)},[first_name])


//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <Container>
//     <List 
//       sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
//          פרטים אישיים
//         </ListSubheader>
//       }
//     >
//       <ListItem >
//         <TextField
//         disabled={editFirstName}
//         id="filled-disabled"
//         label="First Name"
//         defaultValue={first_name}
//         value={first_name}
//         variant="standard"
//         onChange={(e)=>{setFirst_name(e.target.value)}}
//         />
//         {editFirstName &&<IconButton onClick={(e)=>setEditFirstName(false)}>
//         < EditIcon/>
//         </IconButton>}
//         {!editFirstName &&<IconButton onClick={(e)=>{console.log("ertyui"+first_name);handleSaveInfo(e,first_name,"first_name");setEditFirstName(true)}}>
//         < CheckIcon/>
//         </IconButton>}
//         {!editFirstName &&<IconButton onClick={(e)=>setEditFirstName(true)}>
//         < CloseIcon/>
//         </IconButton>}
//    </ListItem>
//    <ListItem >
   
//         <TextField
//          disabled={editLastName}
//           id="filled-disabled"
//           label="Last Name"
//           defaultValue={last_name}
//           value={last_name}
//           variant="standard"
//           onChange={(e, val)=>{setLast_name(val)}}
//         />
//          {editLastName &&<IconButton onClick={(e)=>setEditLastName(false)}>
//         < EditIcon/>
//         </IconButton>}
//         {!editLastName &&<IconButton onClick={(e)=>{console.log("ertyui"+last_name);handleSaveInfo(e,last_name,"last_name");setEditLastName(true)}}>
//         < CheckIcon/>
//         </IconButton>}
//         {!editLastName &&<IconButton onClick={(e)=>setEditLastName(true)}>
//         < CloseIcon/>
//         </IconButton>}
//    </ListItem>
//    <ListItem >
       
//         <TextField
//          disabled={editEmail}
//           id="filled-disabled"
//           label="Email Address"
//           defaultValue={email}
//           value={email}
//           variant="standard"
//           onChange={(e, val)=>{setEmail(val)}}
//         />
//          {editEmail &&<IconButton onClick={(e)=>setEditEmail(false)}>
//         < EditIcon/>
//         </IconButton>}
//         {!editEmail &&<IconButton onClick={(e)=>{console.log("ertyui"+email);handleSaveInfo(e,email,"email");setEditEmail(true)}}>
//         < CheckIcon/>
//         </IconButton>}
//         {!editEmail &&<IconButton onClick={(e)=>setEditEmail(true)}>
//         < CloseIcon/>
//         </IconButton>}
//    </ListItem>
//    <ListItem >
       
//         <TextField
//          disabled={editPhone1}
//           id="filled-disabled"
//           label="phone_number_1"
//           defaultValue={phone_number1}
//           value={phone_number1}
//           variant="standard"
//         />
//         {editPhone1 &&<IconButton onClick={(e)=>setEditPhone1(false)}>
//         < EditIcon/>
//         </IconButton>}
//         {!editPhone1 &&<IconButton onClick={(e)=>{console.log("fhGFj"+phone_number1);;handleSaveInfo(e,phone_number1,"phone_number1");setEditPhone1(true)}}>
//         < CheckIcon/>
//         </IconButton>}
//         {!editPhone1 &&<IconButton onClick={(e)=>setEditPhone1(true)}>
//         < CloseIcon/>
//         </IconButton>}
//    </ListItem>
//    <ListItem >
       
//         <TextField
//          disabled={editphone2}
//           id="filled-disabled"
//           label="name"
//           defaultValue="קילא"
//           variant="standard"
//         />
//          {editFirstName &&<IconButton onClick={(e)=>setEditFirstName(false)}>
//         < EditIcon/>
//         </IconButton>}
//         {!editFirstName &&<IconButton onClick={(e)=>{console.log("ertyui"+first_name);handleSaveInfo(e,first_name,"first_name");setEditFirstName(true)}}>
//         < CheckIcon/>
//         </IconButton>}
//         {!editFirstName &&<IconButton onClick={(e)=>setEditFirstName(true)}>
//         < CloseIcon/>
//         </IconButton>}
//    </ListItem>
//       <ListItemButton>
       
//         <ListItemText primary="Drafts" />
//       </ListItemButton>
//       <ListItemButton onClick={handleClick}>
       
//         <ListItemText primary="Inbox" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
            
//             <ListItemText primary="Starred" />
//           </ListItemButton>
//         </List>
//       </Collapse>
//     </List>
//     </Container>
//   )
// }

// export default NestedList
