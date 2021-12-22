import { Card, Button } from "react-bootstrap";
import Axios from "axios";
import { useState } from "react";

import "./Post.css";

function Post(props) {
  const [likes, setLike] = useState(props.likes.length)
  const [hearts, setHearts] = useState(props.hearts.length)
  const [wows, setWows] = useState(props.wows.length)
  function postReactionLike() {
    setLike(props.likes.length + 1)
    postReaction(1);
  }
  function postReactionHeart() {
    setHearts(props.hearts.length + 1)
    postReaction(2);
  }
  function postReactionWows() {
    setWows(props.wows.length + 1)
    postReaction(3);
  }
  function postReaction(reaction) {
    
    Axios({
      method: "PUT",
      data: {
        postOwner: props.owner,
        owner: props.currentUser,
        reaction: reaction,
      },
      withCredentials: true,
      url: "http://localhost:3000/updatePost",
    });
  }
  return (
    <div id={props.number}>
      <Card id="customCard" style={{ width: "40rem" }}>
        <Card.Title>This post was created by {props.owner}</Card.Title>
        <Card.Body>Description: {props.description}</Card.Body>
        <Card.Footer>
          <Button onClick={postReactionLike} variant="primary">
            <i class="lar la-thumbs-up">{likes}</i>
          </Button>
          <Button onClick={postReactionHeart} variant="danger">
            <i className="las la-heart"> {hearts}</i>
          </Button>
          <Button onClick={postReactionWows} variant="warning">
            <i className="lar la-surprise">{wows}</i>
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Post;
