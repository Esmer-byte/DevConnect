import { useState } from "react";
import Axios from "axios";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Post from "./PostComponents/Post";
import Harold from "../Images/Harold.jpg";

export default function OtherProfile(props) {
  const [postData, setPostData] = useState("No Posts to show!");
  const [userData, setUserData] = useState({});
  const [ok, setOK] = useState("<div>Not authorized</div>");
  function getPosts() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/getPosts/${props.otherID}`,
    })
      .then((res) => {
        setPostData(
          <div>
            {res.data.map((posts) => {
              return (
                <Post
                  username={userData.username}
                  currentUser={props.otherID}
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
  function setData() {
    Axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:3000/getPublicUser`,
      data: {
          otherID: props.otherID,
      },
    })
      .then((res) => {
        console.log(res.data._id);
        setUserData(res.data._id);
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
  useEffect(() => {
    setData();
    getPosts();
  }, []);

  return (
    <div>
      {ok}
      
    </div>
  );
}
