import Axios from "axios";
import React, { useEffect, useState } from "react";
import MainHeaderHome from "../header/MainHeaderHome";
import { Redirect } from "react-router-dom";
import NewsFeed from "./NewsFeed";
import MakeNewPost from "./PostComponents/makeNewPost";

function Home() {
  const [ok, setOK] = useState("<div>Not authorized</div>");
  const [user, setUser] = useState("");//test

  function setAuth() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/",
    })
      .then((res) => {
        setOK(
          <div className="container py-5">
          <div className="card border-0 shadow">
            <div className="card-body text-center">
              <h1 className="display-3 text-cyan mb-3">
                Welcome <a href={"/profile/"+ res.data.user.id} className="text-decoration-none">{res.data.user.username}!</a>
              </h1>
              <p className="lead mb-4">Dev Connect - Version: Alpha 0.0.452023</p>
            
            </div>
          </div>
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
      <MakeNewPost  />
      <NewsFeed user={user} />
    </div>
  );
}

export default Home;
