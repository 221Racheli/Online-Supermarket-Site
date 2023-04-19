import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";


export default function FormDialog({openSetting}) {
  const navigate = useNavigate();

  const handleSubmit =async (event) => {
    handleClose();
    event.preventDefault(); 
    const newContent=`name: ${name} email: ${email} content:${content}`;
    const res = await axios.post('http://localhost:3600/reviews', {content: newContent},{
      headers: {
        'authorization':`Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json'
      }
    })
    const responseData =await res.json;
    
    if(!res.Created)
     {
       console.log()
        //setRegisterInfo=responseData.message;
     }
    else
      {console.log(responseData); 
      alert("פנייתך נשלחה בהצלחה")}
      //navigate("../home/index.js")
 
  
 }
    
  const [open, setOpen] = React.useState(openSetting);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [content, setContent] = React.useState("");
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate(-1);
    setOpen(false);
  };

  const handleChange = event => {
    if (event.target.id=='name')
      setName(event.target.value);
    if (event.target.id=='email')
      setEmail(event.target.value);
    else
      setContent(event.target.value);

    
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} >
        <DialogTitle>צור קשר</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name:"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address:"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField multiline
            autoFocus
            margin="dense"
            id="content"
            label="Content:"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
    }

