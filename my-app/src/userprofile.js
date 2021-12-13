import Axios from "axios";
import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";


function Profile() {
  const [ok, setOK] = useState("<div>Not authorized</div>");
  function doLogout() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/logout",
    }).then((res) => {
      setOK(<Redirect to="/" />);
    });
  }
  function doDelete() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/deleteUser",
    }).then((res) => {
      setOK(<Redirect to="/login" />);
    });
  }
  function setData() {
    console.log("HUOOOO IOHANIIS");
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/",
    })
      .then((res) => {
        console.log(res.data.user);
        setOK(
          <div>
            <Card style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title>Welcome back, {res.data.user.username}!</Card.Title>
                <Card.Text>
                  You are currently logged in and your user id is{""}
                  {res.data.user.id}.
                </Card.Text>
                <Button variant="primary" onClick={doLogout}>
                  Logout
                </Button>
                <Button variant="danger" onClick={doDelete}>
                  Delete account
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })
      .catch((err) => {
        setOK(<Redirect to="/login" />);
      });
  }
  useEffect(() => {
    setData();
  }, []);
  return (<div>{ok}</div>);
}

export default Profile;