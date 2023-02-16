import React, { useCallback, useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import LoadingComponent from './Components/LoadingComponent';
import { useAppDispatch } from './Store/hook';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Pages/Account/LogIn';
import Home from './Pages/Home/Home';

import Register from './Pages/Account/Register';
import { fetchCurrentUser } from './Pages/Account/accountSlice';
// import Orders from './TEST/Orders';
import CreateOrder from './TEST/CreateOrder';
import LoggedInCanSee from './Components/OnlyLoggedInCanSee';
import PrivateRoute from './Components/PrivateRoute';
import Catalog from './Pages/Catalog/Catalog';
import BanoriDetails from './Components/BanoriComponets/BanoriDetails';
import BasketPage from "./Components/BasketComponets/BasketPage";
import { fetchBasketAsync, setBasket } from "./Components/BasketComponets/basketSlice";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import agent from './API/agent';
import CheckoutWrapper from './Pages/Checkout/CheckoutWrapper';
import Orders from './Pages/Order/Order';
// import AppAdmin from './AdminPage';
// import AppUser from './AppUser';
import Sidebar from './Components/Sidebar/Sidebar';
import OrdersCRUD from './Admin/TableCRUD/OrdersCRUD';
import AdminRoute from './Admin/AdminRoute';
import AdminLayout from './Admin/AdminGeneral';
// import BanoriList from './Components/BanoriComponets/BanoriList';
import BanoriListt from './Admin/Banoret/TaskList/BanoriListt';
import Posts from './Pages/Posts/Posts';
import CreatePost from './Pages/Posts/CreatePost';
import Momentet from './Pages/Momentet/Momentet';
import CreateMoment from './Pages/Momentet/CreateMoment';
import PostListt from './Admin/Posts/PostList/PostListt';
import { toast } from 'react-toastify';
import OnlyLoggedInCanSeeAdmin from './Components/OnlyLoggedInCanSeeAdmin';
import AdminGeneral from './Admin/AdminGeneral';
import MomentList from './Admin/Moments/MomentList/MomentList';
import SponzorList from './Admin/Sponzoret/SponzoretList/SponzorList';



export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   toast.error('Not Authorized to go here', {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //     });
  // }, [AdminRoute]);


  // Use the `useLocation` hook
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/admin');


  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));

  }, [initApp])

  if (loading) { return <LoadingComponent message='Initialising app...' /> }



  return (
    <>
      {!hideNavbar && <Navbar />}
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route path={"/Home"}>
          <Home />
        </Route>

        <Route path={"/Login"}>
          <LogIn />
        </Route>
        <Route path='/basket' component={BasketPage} />
        <Route path={"/Register"}>
          <Register />
        </Route>
        <Route  path='/Momentet' component={Momentet} />
        <Route  path='/CreateMoment' component={CreateMoment} />
        <Route exact path='/CreatePost' component={CreatePost} />
        <Route exact path='/Posts' component={Posts} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={BanoriDetails} />
        <PrivateRoute path='/onlyloggedin' component={LoggedInCanSee} />
        <PrivateRoute path='/checkout' component={CheckoutWrapper} />
        <PrivateRoute path='/orders' component={Orders} />
        <Route path={"/Order"}>
          <Orders />
        </Route>
        {/* <Route path={"/banoret"}>
          <BanoriListt />
        </Route> */}
        {/* <Route path={"/postet"}>
          <PostListt />
        </Route> */}
        <Route path="/create-order" component={CreateOrder} />

        <AdminRoute exact path="/admin" component={AdminGeneral} />
        <AdminRoute path="/admin/onlyLoggedin" component={OnlyLoggedInCanSeeAdmin} />
        <AdminRoute path="/admin/posts" component={PostListt} />
        <AdminRoute path="/admin/banoret" component={BanoriListt} />
        <AdminRoute path="/admin/moments" component={MomentList} />
        <AdminRoute path="/admin/sponzors" component={SponzorList} />
        <AdminRoute path="/admin/settings" component={AdminGeneral} />
        {/* /admin/posts
            /admin/banoret
            /admin/settings
        */}
      </Switch>



    </>
  );
}
