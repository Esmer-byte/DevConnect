import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./test.css";

function Update() {
  const [enteredOldPassword, setEnteredOldPassword] = useState("");
  const [enteredNewPassword, setEnteredNewPassword] = useState("");
  const [ok, setOk] = useState(true);

  function doLogout() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/logout",
    });
  }

  function handleSubmit(event) {
    
    console.log(enteredOldPassword, enteredNewPassword);
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
        false
      );
      doLogout();
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
      if (res.data === "Ne-Logat") {
        setOk(
          false
        );
      } else {
        setOk(true);
      }
    });
  }
  useEffect(() => {
    checkData();
  }, []);

  return (
    <div>
    {ok?
      <div>
        <Card style={{ width: "40rem" }} className="test">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                onChange={setEnteredOldPasswordHandler}
                value={enteredOldPassword}
                type="password"
                placeholder="Enter your old password"
                id="oldpassword"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                onChange={setEnteredNewPasswordHandler}
                value={enteredNewPassword}
                type="password"
                placeholder="Password"
                id="newpassword"
              />
            </Form.Group>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    : <div>
            <Redirect to="/login"/>
          </div>}
          </div>
  );
}

export default Update;
