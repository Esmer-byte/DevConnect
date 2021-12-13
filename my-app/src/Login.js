import Axios from "axios";
import React, { useState } from "react";
import Header from "./header";
import { Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

function Login() {
  const [enteredUsernameLogin, setEnteredUsernameLogin] = useState("");
  const [enteredPasswordLogin, setEnteredPasswordLogin] = useState("");
  const [ok, setOk] = useState("");
  function handleLogin(event) {
    event.preventDefault();

    Axios({
      method: "POST",
      data: {
        username: enteredUsernameLogin,
        password: enteredPasswordLogin,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => {setOk(<div><Redirect to="/profile" /></div>)});

  }//Sending data to backend server for verification and validation

  function usernameHandlerLogin(event) {
    setEnteredUsernameLogin(event.target.value);
  }
  function passwordHandlerLogin(event) {
    setEnteredPasswordLogin(event.target.value);
  }

  return (
      <div>
    <form id="register" onSubmit={handleLogin}>
      <input
        type="text"
        onChange={usernameHandlerLogin}
        value={enteredUsernameLogin}
        placeholder="username"
      ></input>
      <input
        type="password"
        onChange={passwordHandlerLogin}
        value={enteredPasswordLogin}
        placeholder="password"
      ></input>
      <Button type="submit">Login</Button>

    </form>
    <Header/>
    {ok}
    </div>
  );
}

export default Login