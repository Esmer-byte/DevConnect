import React, { Component,useState } from 'react';
import Axios from "axios";
import {Button} from 'react-bootstrap';
function Login() {
    const [enteredUsernameLogin, setEnteredUsernameLogin] = useState("");
    const [enteredPasswordLogin, setEnteredPasswordLogin] = useState("");
  
    function handleLogin(event) {
      event.preventDefault();
      const formData = {
        username: enteredUsernameLogin,
        password: enteredPasswordLogin,
      };
      console.log(formData);
      Axios({
        method: "POST",
        data: {
          username: enteredUsernameLogin,
          password: enteredPasswordLogin,
        },
        withCredentials: true,
        url: "http://localhost:3001/login",
      }).then((res) => console.log(res));
    }
  
    function usernameHandlerLogin(event) {
      setEnteredUsernameLogin(event.target.value);
    }
    function passwordHandlerLogin(event) {
      setEnteredPasswordLogin(event.target.value);
    }
  
    return (  
      <form id="register" onSubmit={handleLogin}>
        <h1>Login</h1>
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
        <Button variant="primary" type="submit">submit</Button>{' '}
      </form>
    );
  }
  
  
  export default Login;