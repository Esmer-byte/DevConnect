import React, { useState } from "react";
import Axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./test.css";

function Update() {
  const [enteredOldPassword, setEnteredOldPassword] = useState("");
  const [enteredNewPassword, setEnteredNewPassword] = useState("");
  const [ok, setOk] = useState("");
  function handleSubmit(event) {
    event.preventDefault();

    Axios({
      method: "PUT",
      data: {
        oldpassword: enteredOldPassword,
        newpassword: enteredNewPassword,
      },
      withCredentials: true,
      url: "http://localhost:3000/updateUser",
    }).then((res) => {setOk(<div><Redirect to="/login" /></div>)});
  }
  function setEnteredOldPasswordHandler(event) {
    setEnteredOldPassword(event.target.value);
  }
  function setEnteredNewPasswordHandler(event) {
    setEnteredNewPassword(event.target.value);
  }

  return (
    <div>
      <Card style={{ width: "40rem" }} className="test">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              onChange={setEnteredOldPasswordHandler}
              type="password"
              placeholder="Enter your old password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              onChange={setEnteredNewPasswordHandler}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
      {ok}
    </div>
  );
}

export default Update;