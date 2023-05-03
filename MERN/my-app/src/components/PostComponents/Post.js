import { Card, Button, Col, Row, Form, FloatingLabel } from "react-bootstrap";
import Axios from "axios";
import { useState, useEffect } from "react";
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
  let reacted = false;
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:3000/`,
    }).then((response) => {setCurrent(response.data.user.username)}).catch()
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
    <div id={props.number} className="py-3" style={{ height: `300px`, width: `600px` }}>
  <Card  className="bg-dark text-light">
    <Card.Header className="bg-dark text-light">
      <Row>
        <Col md={10}>
          <a href={`/profile/${props.postOwnerID}`} className="text-light">
            {props.owner}
          </a>
        </Col>
        <Col md={0}>
          <Button onClick={postDelete} variant="danger">
            <i className="las la-trash"></i>
          </Button>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <p className="my-2">{props.description}</p>
    </Card.Body>
    <Card.Footer>
      <Button id="like" onClick={postReactionLike} variant="primary" className="mr-2">
        <i className="lar la-thumbs-up"></i> {likes}
      </Button>
      <Button id="heart" onClick={postReactionHeart} variant="danger" className="mr-2">
        <i className="las la-heart"></i> {hearts}
      </Button>
      <Button id="wow" onClick={postReactionWows} variant="warning" className="mr-2">
        <i className="lar la-surprise"></i> {wows}
      </Button>
      <div className="my-1 mx-auto">
        <Button id="toggle" onClick={toggleComment} variant="info" size="sm">
          <i className="las la-comment"></i> Comment
        </Button>
      </div>
      {isCommenting && (
        <div className="p-2">
          <Form onSubmit={postComment}>
            <Form.Control
              id="textareaComment"
              onChange={changeComment}
              value={commentValue}
              as="textarea"
              placeholder="Write a comment..."
              className="mb-3"
            />
            <Button id="submitComment" type="submit" variant="success" className="rounded-pill px-3 py-1">
              Post
            </Button>
          </Form>
        </div>
      )}
      <div className="my-2 mx-auto">
        <Button onClick={getComment} variant="link" size="sm" id="show">
          See all comments
        </Button>
      </div>
      {isShowing && comments.map((index) => (
        <Comment currentUser={props.currentUser} postOwner={props.postOwnerID} comment={index} />
      ))}
    </Card.Footer>
  </Card>
</div>
  );
}

export default Post;
