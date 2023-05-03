import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";

export default function AlertDialogLogOut({ setting }) {
    const { setLogedIn } = useContext(AuthContext);
    const [open, setOpen] = React.useState(setting);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (name) => {
        if (name == "yes") {
            setLogedIn(false);
            localStorage.removeItem('token')
        }
        navigate(-2);
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"? להתנתק"}
                </DialogTitle>
                {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
                <DialogActions>
                    <Button name="yes" onClick={(e) => { handleClose(e.currentTarget.name) }}>כן</Button>
                    <Button name="no" onClick={(e) => { handleClose(e.currentTarget.name) }} autoFocus>
                        לא
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
