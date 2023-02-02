import { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import { Route, Switch } from 'react-router-dom'
import LoadingComponent from './Components/LoadingComponent';
import { useAppDispatch } from './Store/hook';

// import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';

import Navbar from './Components/Navbar';
import LogIn from './Pages/Account/LogIn';
import Home from './Pages/Home';
import FileUpload from './Pages/FileUpload';
import Register from './Pages/Account/Register';
import Orders from './TEST/Orders';
import CreateOrder from './TEST/CreateOrder';
import { useStoreContext } from './context/AppDbContext';
import agent from './API/agent';
import { getCookie } from './util/util';
import BasketPage from './Pages/basket/BasketPage';
import Catalog from './Pages/Catalog/Catalog';
import LoggedInCanSee from './Components/OnlyLoggedInCanSee';
import CheckoutPage from './Pages/CheckoutPage';
import ProductDetails from './Components/ProductComponets/ProductDetails';

function App() {

  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

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
        {/* <PrivateRoute path='/onlyloggedin' component={LoggedInCanSee} /> */}
        <Route path={"/Order"}>
          <Orders />
        </Route>
        <Route path="/create-order" component={CreateOrder} />
        <Route path='/basket' component={BasketPage} />

      </Switch>


    </>
  );
}

export default App;
