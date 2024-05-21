import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/home';
import SignIn from "./pages/login/signIn";
import SignUp from './pages/register/signUp';
import ResponsiveAppBar from "./pages/Categories/CategoryList"
import NestedGrid from "./pages/Items/index"
import AlertDialog from './pages/cart/cart';
import SpanningTable from "./pages/cart/cartInfo"
import FormDialog from "./pages/reviews/sendReview"
import CenteredTabs from "./pages/personalDashBoard/tabs"
import BottomAppBar from './pages/general/bottomNav';
import AlertDialogLogedIn from './pages/general/logedInMessage'
import BarGraph from './pages/personalDashBoard/graphs'
import AlertDialogLogOut from './pages/general/logout'
import { AuthContextProvider } from './context/AuthContext';
import SearchPage from "./pages/Search/searchPage";
import NotFound from "./pages/general/notFound";


function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
        <AlertDialog>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/items/:subCategoryId' element={<NestedGrid />} />
            <Route path='/cart' element={<SpanningTable />} />
            <Route path='/review' element={<FormDialog/>} />
            <Route path ='/signInUp' element={<AlertDialogLogedIn/>}/>
            <Route path='/account' element={<CenteredTabs />} />
            <Route path='/graph' element={<BarGraph/>}/>
            <Route path='/logOut'element={<AlertDialogLogOut setting={true}/>} />
            <Route path="/search"element={<SearchPage></SearchPage>} />
            <Route path='*' element={<NotFound></NotFound>} />
          </Routes>
        </AlertDialog>
        <BottomAppBar></BottomAppBar>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
