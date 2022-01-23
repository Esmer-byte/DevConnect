import Axios from "axios";
import { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
function Comment(props) {
  function deleteComment() {
    Axios({
      method: "POST",
      data: {
        postOwner: props.postOwner,
        currentUser: props.currentUser,
        owner: props.comment.ownerID,
        commentID: props.comment._id,
      },
      withCredentials: true,
      url: "http://localhost:3000/deleteComment",
    });
  }
  return (
    <div>
      <Row>
        {props.comment.ownerUsername} has added a comment:{" "}
        {props.comment.commentContent}
        <Col fluid="md-0"></Col>
        <Col>
          <Button onClick={deleteComment} variant="danger" size="sm">
            <i className="las la-trash"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Comment;
