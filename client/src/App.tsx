import React, { useCallback, useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
// import { Route, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminPage from './AdminPage';
import LoadingComponent from './Components/LoadingComponent';
import { useAppDispatch } from './Store/hook';
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Pages/Account/LogIn';
import Home from './Pages/Home/Home';
import FileUpload from './Pages/FileUpload';
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
import OrdersCRUD from './Components/TableCRUD/OrdersCRUD';



export default function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

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

  const userIsAdmin = false; // replace with actual authentication logic

  return (
    <>

{/* {userIsAdmin ? <Sidebar /> : <Navbar />} */}
{/* {userIsAdmin ? null : } */}
<Navbar />
      <Switch>
        {/* <Route component={AppUser}> */}
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
          <Route path={"/FileUpload"}>
            <FileUpload />
          </Route>

          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={BanoriDetails} />
          <PrivateRoute path='/onlyloggedin' component={LoggedInCanSee} />
          <PrivateRoute path='/checkout' component={CheckoutWrapper} />
          <PrivateRoute path='/orders' component={Orders} />
          <Route path={"/Order"}>
            <Orders />
          </Route>
          <Route path="/create-order" component={CreateOrder} />
          {/* <Route path="/admin/orders" component={OrdersCRUD} /> */}
          <PrivateRoute roles={['Admin']} path='/admin/orders' component={OrdersCRUD} />
        {/* </Route> */}

{/* 
        {userIsAdmin && (
          <Route path="/admin">
            <AdminPage>
              <Switch>
                <Route path="/admin/settings" component={SettingsPage} />
              </Switch>
            </AdminPage>
          </Route>
        )} */}
      </Switch>
      


    </>
  );
}
