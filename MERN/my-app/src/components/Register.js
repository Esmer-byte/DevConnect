import Axios from "axios";
import React, { useState } from "react";
import MainHeaderLogin from "../header/MainHeaderLogin";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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
    <div className="container-fluid bg-light h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center">Register</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="usernameRegister">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={usernameHandler}
                    value={enteredUsername}
                    placeholder="Enter your username"
                  />
                </Form.Group>

                <Form.Group controlId="passwordRegister">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={passwordHandler}
                    value={enteredPassword}
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <Form.Group controlId="emailRegister">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={emailHandler}
                    value={enteredEmail}
                    placeholder="Enter your email"
                  />
                </Form.Group>

                <Form.Group controlId="dateRegister">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={dateHandler}
                    value={enteredDate}
                    placeholder="Enter your date of birth"
                  />
                </Form.Group>

                <Button
                  id="submitButtonRegister"
                  variant="primary"
                  type="submit"
                  className="text-light bg-primary rounded-pill border-0 w-100 py-2 my-3"
                >
                  Register
                </Button>
              </Form>
              <div className="text-center mt-3">
                <MainHeaderLogin />
              </div>
              {ok && <div className="alert alert-success mt-3">{ok}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} //Registration form

export default Register;
