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
    <div>
    <Card style={{ width: "40rem"}}>
      <Form onSubmit={setDescriptionHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control id = "textareaPost" onChange = {changeDescription} value={description} as="textarea" rows={3} />
        </Form.Group>
        <Button variant = "primary" type="submit">Submit</Button>
      </Form>
      </Card>
    </div>
  );
}

export default MakeNewPost;
