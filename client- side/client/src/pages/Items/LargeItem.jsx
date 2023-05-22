import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SellIcon from '@mui/icons-material/Sell';


const style = {
  display: 'flex-warp',
  alignItems: 'center',
  flexDirection: 'column',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  minWidth: '300px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function LargeItem({ openStatus, setopenStatus, info }) {
  const [open, setOpen] = React.useState(openStatus);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
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
        <Box sx={style}>
        {info.sale > 0 && <SellIcon sx={{position: 'absolute', top:0, left:0,}}></SellIcon>}
          <img
            src={`/images/${info.subcategory_id}/${info.picture}`}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            title={info.name}
             width="100%"
            loading="lazy"
            display='block'
          />
          <Typography id="modal-modal-description" align='center'>{info.name}</Typography>
          <Typography id="modal-modal-description" align='center'>{info.company}</Typography>
          {info.sale == 0 ?
              <Typography variant="body2" color="text.secondary" textAlign="center">
                &#8362; {info.price}
              </Typography>
              :
              <Typography textAlign="center">
                <Typography variant="body2" display={'inline'} color="text.secondary" textAlign="center" sx={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                  {`${info.price} `}
                </Typography>
                <Typography variant="body2" display={'inline'} color="text.secondary" textAlign="center">
                  &#8362; {(info.price *(1-info.sale/100)).toFixed(2)}
                </Typography>
              </Typography>
            }

        </Box>
      </Modal>
    </div>
  );
}

export default LargeItem