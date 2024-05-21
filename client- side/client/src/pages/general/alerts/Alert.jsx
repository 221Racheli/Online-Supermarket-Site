import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function BasicAlerts({severity,text,setAlert}) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert severity={severity}>{text}</Alert>
      {/* <Alert severity="success">This is a success Alert.</Alert>
      <Alert severity="info">This is an info Alert.</Alert>
      <Alert severity="warning">This is a warning Alert.</Alert>
      <Alert severity="error">This is an error Alert.</Alert> */}
    <IconButton onClick={()=>setAlert(false)}>
        <CloseIcon/>
      </IconButton>
    </Stack>
  );
}