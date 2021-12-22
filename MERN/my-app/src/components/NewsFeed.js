import Axios from "axios";
import React, { useState, useEffect } from "react";
import Post from "./PostComponents/Post";

function NewsFeed(props) {
  const [newsFeed, setNewsfeed] = useState([]);
  function test() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/getPosts",
    }).then((res) => {
      setNewsfeed(res.data);
    });
  }

  useEffect(() => {
    test();
  }, []);
  return (
    <div>
      {newsFeed.map((posts) => (
        
        <Post
          currentUser = {props.user}
          key={newsFeed.indexOf(posts)}
          number={posts._id}
          hearts={posts.reactions[0].hearts}
          likes={posts.reactions[0].likes}
          wows={posts.reactions[0].wows}
          owner={posts.ownerID}
          description={posts.descriptionBody}
        />
      ))}
    </div>
  );
}
export default NewsFeed;
