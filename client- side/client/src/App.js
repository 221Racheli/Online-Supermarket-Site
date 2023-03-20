import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/home';
import SignIn from "./pages/login/signIn";
import SignUp from './pages/register/signUp';
import ResponsiveAppBar from "./pages/Categories/CategoryList"
import NestedGrid from "./pages/Items/index"
import Footer from "./pages/general/bottomNav"


function App() {
  return (
    <>

      {/* <NestedGrid id={10012}/> */}
      <Router>
        <>
          <ResponsiveAppBar></ResponsiveAppBar>
        </>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path ='/SignUp' element={<SignUp/>}/> 
          <Route key="items" path="/items/:categoryId" element={<NestedGrid />} />
          <Route path='*' element={<h1> 404 Page not found</h1>} />
        </Routes>
      </Router>
      <Footer></Footer>

    </>
  );
}

export default App;
