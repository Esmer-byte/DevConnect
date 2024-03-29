import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import Harold from "../Images/Harold.jpg";
import MainUpdateHeader from "../header/MainUpdateHeader";
import "./test.css";
import MainHeaderHome from "../header/MainHeaderHome";
import Post from "./PostComponents/Post";
import MakeNewPost from "./PostComponents/makeNewPost";

function Profile() {
  const { id } = useParams();
  const [ok, setOK] = useState("<div>Not authorized</div>");
  const [postData, setPostData] = useState("No Posts to show!");
  function doLogout() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/logout",
    }).then((res) => {
      setOK(<Redirect to="/" />);
    });
  }

  async function doDelete() {
    await Axios({
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
      url: `http://localhost:3000/`,
    })
      .then((res) => {
        if (res.data.user.id == id) {
          setOK(
            <div>
              <Card style={{ width: "25rem" }}>
                <Card.Img fluid="true" variant="top" src={Harold} />
                <Card.Body>
                  <Card.Title>
                    Welcome back, {res.data.user.username}!
                  </Card.Title>
                  <Card.Text>
                    You are currently logged in and your user id is{""}
                    {res.data.user.id}. Your email address is{" "}
                    {res.data.user.email}
                  </Card.Text>
                  <Button
                    id="logoutButton"
                    variant="primary"
                    onClick={doLogout}
                  >
                    Logout
                  </Button>
                  <Button id="deleteButton" variant="danger" onClick={doDelete}>
                    Delete account
                  </Button>
                  <MainUpdateHeader id="updateButton"></MainUpdateHeader>
                  <MainHeaderHome id="homeButton"></MainHeaderHome>
                </Card.Body>
              </Card>
              <MakeNewPost />
            </div>
          );
        } else {
          Axios({
            method: "POST",
            withCredentials: true,
            url: `http://localhost:3000/getPublicUser`,
            data: {
              otherID: id,
            },
          })
            .then((res) => {              
              setOK(
                <div>
                  <Card style={{ width: "25rem" }}>
                    <Card.Img fluid="true" variant="top" src={Harold} />
                    <Card.Body>
                      <Card.Title>{res.data.username}!</Card.Title>
                      <Card.Text>This is another user profile</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
            .catch((err) => {
              setOK(<Redirect to="/login" />);
            });
        }
      })
      .catch((err) => {
        setOK(<Redirect to="/login" />);
      });
  }

  useEffect(() => {
    setData();
    getPosts();
  }, []);

  function getPosts() { 
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/getPosts/${id}`,
    })
      .then((res) => {
        setPostData(
          <div>
            {res.data.map((posts) => {
              return (
                <Post
                  key={res.data.indexOf(posts)}
                  username={res.username}
                  currentUser={id}
                  postOwnerID={posts.ownerID}
                  number={posts._id}
                  hearts={posts.hearts}
                  likes={posts.likes}
                  wows={posts.wows}
                  owner={posts.displayName}
                  description={posts.descriptionBody}
                />
              );
            })}
          </div>
        );
      })
      .catch((err) => {
        setPostData(<div>{err}</div>);
      });
  }

  
  return (
    <div>
      <Row>
        <Col>{ok}</Col>
        <Col>{postData}</Col>
      </Row>
    </div>
  );
}

export default Profile;
