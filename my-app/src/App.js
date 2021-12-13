import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import {Route} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Header from './header';
function App() {



  return (
    <div>
      <Header/>
      <Route path="/login">
      <Login/>
      </Route>
      <Route path="/register">
      <Register/>
      </Route>
    </div>
  );
}

export default App;