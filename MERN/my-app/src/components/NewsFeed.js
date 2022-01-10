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
          username = {props.userName}
          currentUser = {props.user}
          key={newsFeed.indexOf(posts)}
          number={posts._id}
          hearts={posts.hearts}
          likes={posts.likes}
          wows={posts.wows}
          owner={posts.displayName}
          description={posts.descriptionBody}
        />
      ))}
    </div>
  );
}
export default NewsFeed;
