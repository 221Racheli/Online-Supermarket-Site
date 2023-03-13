import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/home';
import Login from "./pages/login/Login";
import Register from './pages/register/register';
import ResponsiveAppBar from "./pages/Categories/CategoryList"
import NestedGrid from "./pages/Items/index"
// import Item from './pages/Items/Item';
// import LargeItem from './pages/Items/LargeItem';
import LabelBottomNavigation from "./pages/general/bottomNav"
import CustomizedInputBase from "./pages/general/search"
function App() {
  return (
    <>
    {/* <AppBar><Categories></Categories> </AppBar> */}
    {/* {true?<div>jhjh</div>:<div>false</div>} */}
    <ResponsiveAppBar></ResponsiveAppBar>
   {/* <Item info={{"name":"jj","company":"fgfoo","price":"9"}}></Item> */}
   {/* <LargeItem info={{"name":"jj","company":"fgfoo","price":"90"}}></LargeItem> */}
   <NestedGrid id="10012"/>
      <Router>
        {/* <nav className='nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>login</NavLink>
          <NavLink to='/register'> sign Up</NavLink>
        </nav> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path ='/register' element={<Register/>}/>
          <Route path='*' element={<h1> 404 Page not found</h1>} />
        </Routes>
      </Router>
      <CustomizedInputBase></CustomizedInputBase>
      <LabelBottomNavigation></LabelBottomNavigation>
    </>
  );
}

export default App;
