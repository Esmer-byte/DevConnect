import React, { useState, useEffect } from "react";
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
    }).then((res) => {
      setOk(
        <div>
          <Redirect to="/login" />
        </div>
      );
    });
  }
  function setEnteredOldPasswordHandler(event) {
    setEnteredOldPassword(event.target.value);
  }
  function setEnteredNewPasswordHandler(event) {
    setEnteredNewPassword(event.target.value);
  }

  function checkData() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/",
    }).then((res) => {
      if(res.data === "Ne-Logat") {
        setOk(<div>
          <Redirect to="/login"></Redirect>
        </div>)
      } else {
        setOk(<div>
           <Card style={{ width: "40rem" }} className="test">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              onChange={setEnteredOldPasswordHandler}
              type="password"
              placeholder="Enter your old password"
              id = "oldpassword"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              onChange={setEnteredNewPasswordHandler}
              type="password"
              placeholder="Password"
              id = "newpassword"
            />
          </Form.Group>
          <Button id = "submitUpdate" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
      {ok}
        </div>)
      }
    })
  }
  useEffect(() => {
    checkData();
  }, []);

  return (
    <div>
     {ok}
    </div>
  );
}

export default Update;
