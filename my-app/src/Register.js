import React, { Component, useState } from "react";
import axios from "axios";

import {Button} from 'react-bootstrap';

function Register() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  function usernameHandler(event) {
    setEnteredUsername(event.target.value);
  }
  function passwordHandler(event) {
    setEnteredPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      username: enteredUsername,
      password: enteredPassword,
    };
    console.log(formData);
    axios
      .post(
        "/createUser",
        { username: formData.username, password: formData.password },
        { withCredentials: true }
      ).then((response)=>console.log(response))
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          type="text"
          onChange={usernameHandler}
          value={enteredUsername}
          placeholder="username"
        ></input>
        <input
          type="password"
          onChange={passwordHandler}
          value={enteredPassword}
          placeholder="password"
        ></input>
        <Button variant="primary" type="submit">submit</Button>
        
      </form>
    </div>
  );
}

export default Register;