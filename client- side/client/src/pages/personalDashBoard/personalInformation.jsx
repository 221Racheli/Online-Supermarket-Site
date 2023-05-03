import React ,{useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import { Container, IconButton, ListItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

// async function fetchPersonalInformation()
// {
//     return {first_name,last_name,user_name,phone_number1,phone_number2,address,email}=await axios.get('http://localhost:3600/users',  {
//       headers: {
//           'authorization': `Bearer ${localStorage.getItem('token')}`,
//           'content-type': 'application/json'
//       }
//   });
//   // setFirst_name(first_name);
//   // setLast_name(last_name);
//   // setUser_name(user_name);
//   // setPhone_number1(phone_number1);
//   // setPhone_number2(phone_number2);
//   // setAddress(address);
//   // setEmail(email);

// }

// const data=fetchPersonalInformation();
const NestedList=()=> {
  const [open, setOpen] = useState(true);
  const [editFirstName, setEditFirstName] = useState(true);
  const [editLastName, setEditLastName] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editPhone1, setEditPhone1] = useState(true);
  const [editphone2, setEditPhone2] = useState(true);

  const [first_name,setFirst_name]=useState("");
  const [last_name,setLast_name]=useState("");
  const [user_name,setUser_name]=useState("");
  const [phone_number1,setPhone_number1]=useState("");
  const [phone_number2,setPhone_number2]=useState("");
  const [address,setAddress]=useState("");
  const [email,setEmail]=useState("");

  const handleClick = () => {
    setOpen(!open);
  };
console.log("Im here");
  return (
    <Container>
    <List 
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         פרטים אישיים
        </ListSubheader>
      }
    >
      <ListItem >
        <TextField
         disabled={editFirstName}
          id="filled-disabled"
          label="First Name"
          defaultValue="kaila"
          variant="filled"
        />
        {editFirstName &&<IconButton onClick={(e)=>setEditFirstName(false)}>
        < EditIcon/>
        </IconButton>}
        {!editFirstName &&<IconButton onClick={(e)=>setEditFirstName(true)}>
        < CheckIcon/>
        </IconButton>}
        {!editFirstName &&<IconButton onClick={(e)=>setEditFirstName(true)}>
        < CloseIcon/>
        </IconButton>}
   </ListItem>
   <ListItem >
   
        <TextField
         disabled={editLastName}
          id="filled-disabled"
          label="Last Name"
          defaultValue="Hartman"
          variant="filled"
        />
        <IconButton onClick={(e)=>setEditLastName(!editLastName)}>
        < EditIcon/>
        </IconButton>
   </ListItem>
   <ListItem >
       
        <TextField
         disabled={editEmail}
          id="filled-disabled"
          label="Email Address"
          defaultValue="kaila@gmail.com"
          variant="filled"
        />
        <IconButton onClick={(e)=>setEditEmail(!editEmail)}>
        < EditIcon/>
        </IconButton>
   </ListItem>
   <ListItem >
       
        <TextField
         disabled={editPhone1}
          id="filled-disabled"
          label="name"
          defaultValue="קילא"
          variant="filled"
        />
        <IconButton onClick={(e)=>setEditPhone1(!editPhone1)}>
        < EditIcon/>
        </IconButton>
   </ListItem>
   <ListItem id="item1">
       
        <TextField
         disabled={editphone2}
          id="filled-disabled"
          label="name"
          defaultValue="קילא"
          variant="filled"
        />
        <IconButton onClick={(e)=>setEditPhone2(!editphone2)}>
        < EditIcon/>
        </IconButton>
   </ListItem>
      <ListItemButton>
       
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
       
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </Container>
  )
}

export default NestedList