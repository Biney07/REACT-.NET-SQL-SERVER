import { useEffect, useState } from 'react';
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
import Orders from './TEST/Orders';
import CreateOrder from './TEST/CreateOrder';
import { useStoreContext } from './context/StoreContext';
import agent from './API/agent';
import { getCookie } from './util/util';

function App() {

  const [loading, setLoading] = useState(true);
  // const dispatch = useAppDispatch();
  // const initApp = useCallback(async () => {
  //   try {
  //     await dispatch(fetchCurrentUser());

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [dispatch])
  // useEffect(() => {
  //   initApp().then(() => setLoading(false));
  // }, [initApp])
  const dispatch = useAppDispatch();

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [dispatch])

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
        <Route path='/basket' component={BasketPage} />
        <Route path='/checkout' component={CheckoutPage} />
        <Route path={"/Register"}>
          <Register />
        </Route>
        <Route path={"/FileUpload"}>
          <FileUpload />
        </Route>
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <PrivateRoute path='/onlyloggedin' component={LoggedInCanSee} />
        <Route path={"/Order"}>
          <Orders />
        </Route>
        <Route path="/create-order" component={CreateOrder} />
      </Switch>


    </>
  );
}

export default App;
