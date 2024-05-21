import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';


export default function BasicMenu({ category, categoryId }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [subCategories, setSubCategories] = React.useState([]);

 useEffect (() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:3600/category/${categoryId}`);
      console.log("*******************************************************");
console.log(data);
      console.log("*******************************************************");
      setSubCategories(data);
    }
    fetchData();
  },[]);


  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    navigate(`/items/${e.currentTarget.id}`);
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
        {subCategories.map(x => <MenuItem id={x.subcategory_id} onClick={(e) => { handleClose(e) }} >{x.name}</MenuItem>)}
      </Menu>
    </div>
  );
}
