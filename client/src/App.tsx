import React, { useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Redirect, Route, Switch } from 'react-router-dom'

import { MDBBtn, MDBCheckbox, MDBCol, MDBIcon, MDBInput, MDBListGroupItem, MDBRow } from 'mdb-react-ui-kit';
import { User } from './User';
import Navbar from './Components/Navbar';
import LogIn from './Pages/LogIn';
import Home from './Pages/Home';
import FileUpload from './Pages/FileUpload';


function App() {
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
        <Route path={"/FileUpload"}>
          <FileUpload />
        </Route>
      </Switch>


    </>
  );
}

export default App;
