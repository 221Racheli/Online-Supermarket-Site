import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
export default function BasicAlerts({setAlert}) {
  return (
    <Stack sx={{ width: '20%' ,position: 'fixed'}} spacing={2}>
      <Alert severity="error">This is an error alert — check it out!
      <IconButton onClick={()=>setAlert(false)}>
        <CloseIcon/>
      </IconButton>
      </Alert>
    </Stack>
  );
}
