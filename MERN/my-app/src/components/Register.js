import Axios from "axios";
import React, { useState } from "react";
import MainHeaderLogin from "../header/MainHeaderLogin";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function Register() {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const [ok, setOk] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: enteredUsername,
        password: enteredPassword,
        email: enteredEmail,
        date: enteredDate,
      },
      withCredentials: true,
      url: "http://localhost:3000/createUser",
    }).then((res) => {
      setOk(
        <div>
          <Redirect to="/login" />
        </div>
      );
    });
  } //Sending the data to the backend for verification and encryption.

  function usernameHandler(event) {
    setEnteredUsername(event.target.value);
  }
  function passwordHandler(event) {
    setEnteredPassword(event.target.value);
  }
  function emailHandler(event) {
    setEnteredEmail(event.target.value);
  }
  function dateHandler(event) {
    setEnteredDate(event.target.value);
  } //Handlers for data input

  return (
    <form id="register" onSubmit={handleSubmit}>
      <input
        id="usernameRegister"
        type="text"
        onChange={usernameHandler}
        value={enteredUsername}
        placeholder="username"
      ></input>
      <input
        id="passwordRegister"
        type="password"
        onChange={passwordHandler}
        value={enteredPassword}
        placeholder="password"
      ></input>
      <input
        id="emailRegister"
        type="email"
        onChange={emailHandler}
        value={enteredEmail}
        placeholder="Email"
      ></input>
      <input
        id="dateRegister"
        type="date"
        onChange={dateHandler}
        value={enteredDate}
        placeholder="Email"
      ></input>
      <Button id = "submitButtonRegister" variant="primary" type="submit">
        Submit
      </Button>
      <MainHeaderLogin></MainHeaderLogin>
      {ok}
    </form>
  );
} //Registration form

export default Register;
