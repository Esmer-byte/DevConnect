import Axios from "axios";
import React, { useEffect, useState } from "react";
import MainHeaderHome from "../header/MainHeaderHome";
import { Redirect } from "react-router-dom";
import NewsFeed from "./NewsFeed";
import MakeNewPost from "./PostComponents/makeNewPost";

function Home() {
  const [ok, setOK] = useState("<div>Not authorized</div>");
  const [user, setUser] = useState("");

  function setAuth() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/",
    })
      .then((res) => {
        setOK(
          <div>
            <h1>Welcome {res.data.user.username}!</h1>
          </div>
        );

        setUser(res.data.user);
      })
      .catch((err) => {
        setOK(<Redirect to="/login" />);
      });
  }

  useEffect(() => {
    setAuth();
  }, []);
  return (
    <div>
      {ok}
      <MakeNewPost />
      <NewsFeed user={user} />
    </div>
  );
}

export default Home;
