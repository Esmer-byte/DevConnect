import { Form, Button, Card } from "react-bootstrap";
import React, {useState } from "react";
import Axios from "axios";

function MakeNewPost() {
  const [description, setDescription] = useState("");
  function changeDescription(event) {
    setDescription(event.target.value);
  }
  function setDescriptionHandler() {
    Axios({
      method: "POST",
      data: {description: description},
      withCredentials: true,
      url: "http://localhost:3000/createPost",
    });
  }

  return (
    <div style={{ width: '2400px'}}>
    <div className=" justify-content-center align-items-left h-100">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <Card bg="dark" text="light">
          <Card.Body>
            <h5 className="card-title text-center">Create a New Post</h5>
            <Form onSubmit={setDescriptionHandler}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control id="textareaPost" onChange={changeDescription} value={description} as="textarea" rows={3} placeholder="Write something..." />
              </Form.Group>
              <Button id="createPost" variant="primary" type="submit" block>Create Post</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
  );
}

export default MakeNewPost;
