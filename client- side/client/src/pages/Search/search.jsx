import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    align: 'right',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width:'15ch',
      },
    },
  },
}));

export default function SearchAppBar() {

  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const onClickHadle = () => {
    console.log("onClickHadle");
    console.log(keyWord);
    navigate({
      pathname: "/search",
      search: createSearchParams({
        searchParamter: keyWord
      }).toString()
    });
  }

  return (
    <>
      <Search >
        <IconButton onClick={onClickHadle}>
          <SearchIcon />
        </IconButton>
        <StyledInputBase onChange={(e) => { setKeyWord(e.target.value) }}
          placeholder="...חיפוש"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </>
  );
}

