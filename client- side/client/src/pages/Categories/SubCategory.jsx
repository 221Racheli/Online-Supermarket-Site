import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";


export default function BasicMenu({ category,categoryId,subCategories}) {
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [category_id, setCategory_id] = React.useState(categoryId);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    // navigate(`/items/${category_id}`);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    setCategory_id(e.currentTarget.id)
    navigate(`/items/${category_id}`);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={category}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'white' }}
      >
        {category}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ color: 'white' }}
      >
        <MenuItem onClick={(e) => { handleClose(e) }} >My account</MenuItem>
      </Menu>
    </div>
  );
}
