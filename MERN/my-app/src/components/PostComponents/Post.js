import { Card, Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import Axios from "axios";
import { useState, useEffect } from "react";
import getUserService from "../../sevices/getUserService";
import "./Post.css";
import Comment from "./Comment";

function Post(props) {
  const [likes, setLike] = useState(props.likes.length);
  const [hearts, setHearts] = useState(props.hearts.length);
  const [wows, setWows] = useState(props.wows.length);
  const [isCommenting, setCommenting] = useState(false);
  const [commentValue, setCommentValue] = useState();
  const [comments, setComments] = useState([]);
  const [isShowing, setShowing] = useState(false);
  const [current, setCurrent] = useState();
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/`,
    }).then((response) => {setCurrent(response.data.user.username)})
  }, []);
  

  //Frontend functions

  function postReactionLike() {
    setLike(props.likes.length + 1);
    postReaction(1);
  }
  function postReactionHeart() {
    setHearts(props.hearts.length + 1);
    postReaction(2);
  }
  function postReactionWows() {
    setWows(props.wows.length + 1);
    postReaction(3);
  }
  function toggleComment() {
    setCommenting(!isCommenting);
  }
  function changeComment(event) {
    setCommentValue(event.target.value);
  }

  //End of Frontend Functions
  // Backend Functions
  function postDelete() {
    Axios({
      method: "POST",
      data: {
        postID: props.number,
      },
      withCredentials: true,
      url: "http://localhost:3000/deletePost",
    });
  }

  function postReaction(reaction) {
    Axios({
      method: "PUT",
      data: {
        postOwner: props.owner,
        owner: props.currentUser,
        reaction: reaction,
        postID: props.number,
      },
      withCredentials: true,
      url: "http://localhost:3000/updatePost",
    });
  }
  function postComment(event) {
    Axios({
      method: "POST",
      data: {
        text: commentValue,
        postID: props.number,
        username: current,
      },
      withCredentials: true,
      url: "http://localhost:3000/commentPost",
    });
  }

  async function getComment() {
   await Axios({
      method: "POST",
      withCredentials: true,
      data: {
        postID: props.number,
      },
      url: "http://localhost:3000/getComment",
    }).then((res) => {
      setComments(res.data);
    });
    setShowing(!isShowing);
  }
  

  //End of Backend Functions
  return (
    <div id={props.number}>
      <Card id="customCard" style={{ width: "40rem" }}>
        <Card.Title>
          <Row className="">
            <Col fluid="md-10">This post was created by <a href={ `/profile/`+ props.postOwnerID}>{props.owner}</a> </Col>
            <Col md="auto">
              <Button
                className="justify-content-end"
                onClick={postDelete}
                variant="danger"
              >
                <i className="las la-trash"></i>
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Card.Body>Description: {props.description}</Card.Body>
        <Card.Footer>
          <Button id = "like" onClick={postReactionLike} variant="primary">
            <i className="lar la-thumbs-up">{likes}</i>
          </Button>
          <Button id = "heart" onClick={postReactionHeart} variant="danger">
            <i className="las la-heart"> {hearts}</i>
          </Button>
          <Button id = "wow" onClick={postReactionWows} variant="warning">
            <i className="lar la-surprise">{wows}</i>
          </Button>
          <Row className="">
            <Col fluid="md-10"></Col>
            <Col md="auto">
              <Button
                id = "toggle"
                onClick={toggleComment}
                className="justify-content-end"
                variant="info"
                size="sm"
              >
                <i className="las la-plus-square"></i>
              </Button>
            </Col>
            <Col md="auto">
              <Button
                onClick={getComment}
                className="justify-content-end"
                variant="info"
                size="sm"
                id = "show"
              >
                See all comments
              </Button>
            </Col>
          </Row>
        </Card.Footer>
        {isCommenting && (
          <div>
            <Form onSubmit={postComment}>
              <Form.Control
                id = "textareaComment"
                onChange={changeComment}
                value={commentValue}
                as="textarea"
                placeholder="Leave a comment here"
              />
              <Button id = "submitComment" type="submit" variant="success">
                Submit
              </Button>
            </Form>
          </div>
        )}
        <Card.Footer>
          {isShowing &&
            comments.map((index) => (
              <Comment currentUser = {props.currentUser} postOwner = {props.postOwnerID} comment = {index}></Comment>
            ))}
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
