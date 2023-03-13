import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/home';
import Login from "./pages/login/Login";
import Register from './pages/register/register';
import ResponsiveAppBar from "./pages/Categories/CategoryList"
import Items from "./pages/Items/index"


function App() {
  return (
    <>
    {/* <AppBar><Categories></Categories> </AppBar> */}
    {/* {true?<div>jhjh</div>:<div>false</div>} */}
    {/* <div>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</div>  */}
    <ResponsiveAppBar></ResponsiveAppBar>
    {/* <Items id={10012}/> */}
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
          {/* <Route path ='/items' element={<Items/>}/> */}
          <Route path='*' element={<h1> 404 Page not found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
