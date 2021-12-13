import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import {Route} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Header from './header';
import Home from "./Home";
import Profile from "./userprofile";
function App() {



  return (
    <div>
      <Header/>
      <Route exact path="/">
      <Home/>
      </Route>
      <Route path="/Login">
      <Login/>
      </Route>
      <Route path="/Register">
      <Register/>
      </Route>
      <Route path="/profile">
      <Profile/>
      </Route>
      
    </div>
  );
}

export default App;