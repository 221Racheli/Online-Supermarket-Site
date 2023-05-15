import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import { useState } from 'react';
import SearchResults from './searchResultsPop';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const [openResults, setOpenResults] = useState(false);
  const [dataFromFetch, setDataFromFetch] = useState([]);
  const [keyWord, setKeyWord] = useState("");


  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`http://localhost:3600/products/search?keyWord=${keyWord}`);
  //       if (data.length > 1) {
  //         setOpenResults(true);
  //         setDataFromFetch(data);
  //       }
  //     }
  //     catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // },[])

  // const fetchDataOnClick = async (word) => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:3600/products/search?keyWord=${word}`);
  //     if (data.length > 1) {
  //       setOpenResults(true);
  //       setDataFromFetch(data);
  //       setKeyWord(word);
  //     }
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }


  const navigate=useNavigate();

  return (
    <>
      <Search>
        <IconButton onClick={(e) => { navigate(`/search/${e.target.value}`) }}>
          <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        </IconButton>
        
        <StyledInputBase
          placeholder="...חיפוש"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      {openResults && <SearchResults openSetting={true} data={dataFromFetch}></SearchResults>}
    </>
  );
}

