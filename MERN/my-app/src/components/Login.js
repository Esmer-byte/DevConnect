import Axios from "axios";
import React, { useState } from "react";
import MainHeader from "../header/MainHeader";
import { Button } from "react-bootstrap";
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
      url: "http://localhost:3000/login",
    }).then((res) => {
      setOk(
        <div>
          <Redirect to="/profile" />
        </div>
      );
    });
  } //Sending data to backend server for verification and validation

  function usernameHandlerLogin(event) {
    setEnteredUsernameLogin(event.target.value);
  }
  function passwordHandlerLogin(event) {
    setEnteredPasswordLogin(event.target.value);
  }

  return (
    <div>
      <form id="login" onSubmit={handleLogin}>
        <input
          id = "loginUsername"
          type="text"
          onChange={usernameHandlerLogin}
          value={enteredUsernameLogin}
          placeholder="username"
        ></input>
        <input
          id = "loginPassword"
          type="password"
          onChange={passwordHandlerLogin}
          value={enteredPasswordLogin}
          placeholder="password"
        ></input>
        <Button id = "submitButtonLogin" type="submit">Login</Button>
      </form>
      <MainHeader id = "goRegister" />
      {ok}
    </div>
  );
}

export default Login;
