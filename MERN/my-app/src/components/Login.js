import Axios from "axios";
import React, { useState } from "react";
import MainHeader from "../header/MainHeader";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";


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
      const redirectPath = "/profile/" + res.data.sessUser.id;
      setOk(
        <div>
          <Redirect to={redirectPath} />
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
    
    <div className="container-fluid bg-light h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="card bg-dark text-light">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="loginUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={usernameHandlerLogin}
                    value={enteredUsernameLogin}
                    placeholder="Enter your username"
                  />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={passwordHandlerLogin}
                    value={enteredPasswordLogin}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button
                  id="submitButtonLogin"
                  variant="primary"
                  type="submit"
                  className="text-light bg-primary rounded-pill border-0 w-100 py-2 my-3"
                >
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <a href="/register" className="text-light">
                  Don't have an account? Register here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ok}
    </div>
    
  );
}

export default Login;
