import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'40%',
  height:'80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LargeItem({openStatus,setopenStatus,info}) {
  const [open, setOpen] = React.useState(openStatus);
  const handleOpen = () => setOpen(true);
  const handleClose = () => 
  {
    setOpen(false);
    setopenStatus(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} image="/Banana.JPG">
          <Typography id="modal-modal-description" align="center" sx={{ mt: 2 }}>{info.name}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>{info.company}</Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>{" שח" +" "+info.price}</Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default LargeItem