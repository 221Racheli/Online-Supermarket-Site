import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import BasicMenu from "./SubCategory"
import SearchAppBar from "../Search/search"
import CustomizedBadges from "../general/cart"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import SvgIcon from '@mui/material/SvgIcon';
import { ReactComponent as HomeIcon } from '../../assets/Elegant Online Shopping Logo Template (1).svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';



const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));


const settings = ['החשבון שלי', 'יציאה'];

function ResponsiveAppBar() {

  const navigate = useNavigate();
  const { setLogedIn, logedIn } = useContext(AuthContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [categories, setCategories] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (categoryId) => {
    setAnchorElNav(null);
  };

  const handleNavigate = (id) => {
    switch (id) {
      case 'דף הבית':
        navigate('/');
        break;
      case 'החשבון שלי':
        navigate('/account');
        break;
      case 'יציאה':
        navigate('/logout');
        break;
      case 'כניסה':
        navigate('/signin');
        break;
      case 'הרשמה':
        navigate('/signup');
        break;
    }
    setAnchorElUser(null);
  };

  // const logOut = () => {
  //   setLogedIn(false);
  //   localStorage.setItem('token', null);
  // }

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://localhost:3600/category');
      setCategories(data);
    }
    fetchData();
  }, []);

  return (
    <AppBar position="sticky"  >
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          {logedIn == true ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="החשבון שלי">
                <IconButton id="החשבון שלי" onClick={(e) => handleNavigate(e.currentTarget.id)} sx={{ p: 0 }}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="יציאה">
                <IconButton id="יציאה" onClick={(e) => handleNavigate(e.currentTarget.id)} sx={{ p: 0 }}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box> :
            <Box sx={{ flexGrow: 0 }}>
              <BootstrapTooltip title={
                <>
                  <Button id="כניסה" onClick={(e) => handleNavigate(e.currentTarget.id)} sx={{ p: 0 }}>כניסה</Button>
                  <Button id="הרשמה" onClick={(e) => handleNavigate(e.currentTarget.id)} sx={{ p: 0 }}>הרשמה</Button>
                </>
              }>
                <LoginIcon />
              </BootstrapTooltip>
            </Box>}
            <IconButton id="דף הבית" onClick={(e) => handleNavigate(e.currentTarget.id)} sx={{ p: 0 }}>
                  {/* <SvgIcon>
                  {/* <svg
        xmlns='../../assets/Elegant Online Shopping Logo Template (1).svg'
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          // d="/Elegant Online Shopping Logo Template (1).svg"
        />
      </svg> */}
      {/* <HomeIcon/>
                  </SvgIcon> */} 
                        {/* <img
        srcSet={""}
        // alt={item.title}
        loading="lazy"
      /> */}
      <HomeOutlinedIcon/>
            </IconButton>
          <SearchAppBar></SearchAppBar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.category_id}>
                  <Typography textAlign="center">{category.name}</Typography>
                  <BasicMenu category={category.name} categoryId={category.category_id} > {category.name}</BasicMenu>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO_
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categories.map((category) => (
              <BasicMenu category={category.name} categoryId={category.category_id}>{category.name}</BasicMenu>
            ))}
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO Supermarket
          </Typography> */}
          <CustomizedBadges></CustomizedBadges>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default ResponsiveAppBar;
