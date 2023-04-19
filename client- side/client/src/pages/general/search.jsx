import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  return (


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

  );
}


// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import SearchIcon from '@mui/icons-material/Search';
// // import DirectionsIcon from '@mui/icons-material/Directions';
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import BasicPopover from './searchedData';
// export default function CustomizedInputBase() {
//   const [dataFromSearch, setDataFromSearch] = useState("");
//   const [changed, setChanged] = useState("");
//   const [anchorEl, setAnchorEl] = React.useState("Paper");
//   const onChange = async (event) => {
//     try {
//       const { data } = await axios.get(`http://localhost:3600/products/search?keyWord=${event.target.value}`);
//       setDataFromSearch(data);
//       setChanged(true)
//       setAnchorEl(event.currentTarget)
//     }
//     catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <Paper
//       component="form"
//       sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
//     >
//       {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
//         <MenuIcon />
//       </IconButton> */}
//       <InputBase
//         sx={{ ml: 1, flex: 1 }}
//         placeholder="search"
//         //inputProps={{ 'aria-label': 'search google maps' }}

//         onChange={onChange}
//       />
//       {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//         <SearchIcon />
//       </IconButton> */}
//       <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//       {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
//         <DirectionsIcon />
//       </IconButton> */}
//       {changed && <BasicPopover changed={changed} setChanged={setChanged} dataFromSearch={dataFromSearch} AnchorEl={anchorEl}/>}
//     </Paper>
//   );
// }
