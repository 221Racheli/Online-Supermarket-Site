import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover({changed,setChanged,dataFromSearch}) {
  const [anchorEl, setAnchorEl] = React.useState(true);
  const [sChanged, setSChanged] = React.useState(changed);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

  const handleClose = () => {
    setAnchorEl(null);
    setChanged(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onMouseDown={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>{dataFromSearch[0][0]}</Typography>
      </Popover>
    </div>
  );
}
