import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import Harold from "../Images/Harold.jpg";
import MainUpdateHeader from "../header/MainUpdateHeader";
import "./test.css";
import MainHeaderHome from "../header/MainHeaderHome";
function Profile() {
  const [ok, setOK] = useState("<div>Not authorized</div>");
  function doLogout() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/logout",
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
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/",
    })
      .then((res) => {
        console.log(res.data.user);
        setOK(
          <div>
            <Card style={{ width: "25rem" }}>
              <Card.Img fluid="true" variant="top" src={Harold} />
              <Card.Body>
                <Card.Title>Welcome back, {res.data.user.username}!</Card.Title>
                <Card.Text>
                  You are currently logged in and your user id is{""}
                  {res.data.user.id}. Your email address is{" "}
                  {res.data.user.email}
                </Card.Text>
                <Button id ="logoutButton" variant="primary" onClick={doLogout}>
                  Logout
                </Button>
                <Button id= "deleteButton" variant="danger" onClick={doDelete}>
                  Delete account
                </Button>
                <MainUpdateHeader id = "updateButton"></MainUpdateHeader>
                <MainHeaderHome id = "homeButton"></MainHeaderHome>
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

  return <div>{ok}</div>;
}

export default Profile;
