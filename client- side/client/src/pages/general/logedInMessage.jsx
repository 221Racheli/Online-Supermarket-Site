import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

export default function AlertDialogLogedIn() {

  const [open, setOpen] = React.useState(true);

  const navigate=useNavigate();

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (name) => {
    if(name=="הרשמה"){
      navigate('/signup');
    }
    else if(name=="כניסה"){
      navigate('/signin');
    }
    else{
      // navigate(-1)
      navigate(-2)
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={(e)=>{handleClose(e.currentTarget.name)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        align="right"
      >
        <DialogTitle id="alert-dialog-title">
          {"אינך מחובר למערכת"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" >
            כדי לפתוח פניה לשירות לקוחות יש להתחבר
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button name="הרשמה" onClick={(e)=>{handleClose(e.currentTarget.name)}}>הרשמה</Button>
          <Button name="כניסה" onClick={(e)=>{handleClose(e.currentTarget.name)}} autoFocus>
          כניסה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}