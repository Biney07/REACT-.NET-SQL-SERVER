import React, { useCallback, useEffect, useState } from 'react';


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { Route, Switch } from 'react-router-dom'
import LoadingComponent from './Components/LoadingComponent';
import { useAppDispatch } from './Store/hook';
import Navbar from './Components/Navbar';
import LogIn from './Pages/Account/LogIn';
import Home from './Pages/Home';
import FileUpload from './Pages/FileUpload';
import Register from './Pages/Account/Register';
import { fetchCurrentUser } from './Pages/Account/accountSlice';
import Orders from './TEST/Orders';
import CreateOrder from './TEST/CreateOrder';


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());

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
      <Navbar></Navbar>
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

        <Route path={"/Register"}>
          <Register />
        </Route>
        <Route path={"/FileUpload"}>
          <FileUpload />
        </Route>
        <Route path={"/Order"}>
          <Orders />
        </Route>
        <Route path="/create-order" component={CreateOrder} />
      </Switch>


    </>
  );
}

export default App;
